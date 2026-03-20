"use server";

import { MAX_FILE_SIZE } from "@/app/(admin)/admin/media-library/constants/constants";
import { SAMPLE_ACTION } from "@/lib/action-constants";
import { checkAuth } from "@/lib/check-auth";
import cloudinary from "@/lib/cloudinary";
import { handleError } from "@/utils/handle-error";

import type {
  MediaFolder,
  MediaLibraryData,
} from "@/app/(admin)/admin/media-library/types/types";
import type { MediaResource } from "@/lib/types";


export async function getMediaLibraryData(
  folder: string
): Promise<MediaLibraryData | { message: string }> {
  try {
    if (!folder) {
      const [foldersResult, searchResult] = await Promise.all([
        cloudinary.api.root_folders(),
        cloudinary.search
          .expression('asset_folder=""')
          .max_results(100)
          .execute(),
      ]);

      const resources: MediaResource[] = searchResult.resources.map(
        (r: Record<string, unknown>) => ({
          public_id: r.public_id,
          secure_url: r.secure_url,
          format: r.format,
          width: r.width,
          height: r.height,
          bytes: r.bytes,
          created_at: r.created_at,
          resource_type: r.resource_type,
        })
      );

      return {
        resources,
        folders: foldersResult.folders.map(
          (f: { name: string; path: string }) => ({
            name: f.name,
            path: f.path,
          })
        ),
        currentFolder: "",
      };
    }

    const [searchResult, foldersResult] = await Promise.all([
      cloudinary.search
        .expression(`asset_folder="${folder}"`)
        .max_results(100)
        .execute(),
      cloudinary.api.sub_folders(folder).catch(() => ({ folders: [] })),
    ]);

    const resources: MediaResource[] = searchResult.resources.map(
      (r: Record<string, unknown>) => ({
        public_id: r.public_id,
        secure_url: r.secure_url,
        format: r.format,
        width: r.width,
        height: r.height,
        bytes: r.bytes,
        created_at: r.created_at,
        resource_type: r.resource_type,
      })
    );

    const folders: MediaFolder[] = foldersResult.folders.map(
      (f: { name: string; path: string }) => ({
        name: f.name,
        path: f.path,
      })
    );

    return { resources, folders, currentFolder: folder };
  } catch (error) {
    handleError(error, "Error fetching media library data:");
    return { message: "Could not fetch media library data." };
  }
}

export async function uploadMedia(
  formData: FormData
): Promise<{ message: string } | { success: true; resource: MediaResource }> {
  const session = await checkAuth();
  if (!session?.user.isAdmin) {
    return { message: SAMPLE_ACTION };
  }

  const file = formData.get("file") as File | null;
  const folder = formData.get("folder") as string;

  if (!file || !(file instanceof File)) {
    return { message: "No file provided." };
  }

  if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
    return { message: "Only image and PDF files are allowed." };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { message: "File size must be less than 4.5MB." };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      asset_folder: folder || undefined,
    });

    return {
      success: true,
      resource: {
        public_id: result.public_id,
        secure_url: result.secure_url,
        format: result.format,
        width: result.width,
        height: result.height,
        bytes: result.bytes,
        created_at: result.created_at,
        resource_type: result.resource_type,
      },
    };
  } catch (error) {
    handleError(error, "Error uploading media:");
    return { message: "Could not upload the file." };
  }
}

export async function deleteMedia(
  publicId: string
): Promise<{ message: string } | void> {
  const session = await checkAuth();
  if (!session?.user.isAdmin) {
    return { message: SAMPLE_ACTION };
  }

  if (!publicId) {
    return { message: "Invalid resource ID." };
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== "ok") {
      return { message: "Could not delete the resource." };
    }
  } catch (error) {
    handleError(error, "Error deleting media:");
    return { message: "Could not delete the resource." };
  }
}

export async function createFolder(
  folderPath: string
): Promise<{ message: string } | { success: true }> {
  const session = await checkAuth();
  if (!session?.user.isAdmin) {
    return { message: SAMPLE_ACTION };
  }

  const name = folderPath.trim();
  if (!name) {
    return { message: "Folder name is required." };
  }

  try {
    await cloudinary.api.create_folder(name);
    return { success: true };
  } catch (error) {
    handleError(error, "Error creating folder:");
    return { message: "Could not create the folder." };
  }
}

export async function renameFolder(
  fromPath: string,
  toPath: string
): Promise<{ message: string } | { success: true }> {
  const session = await checkAuth();
  if (!session?.user.isAdmin) {
    return { message: SAMPLE_ACTION };
  }

  if (!fromPath.trim() || !toPath.trim()) {
    return { message: "Folder name is required." };
  }

  try {
    await cloudinary.api.rename_folder(fromPath, toPath);
    return { success: true };
  } catch (error) {
    handleError(error, "Error renaming folder:");
    return { message: "Could not rename the folder." };
  }
}

export async function deleteFolder(
  folderPath: string
): Promise<{ message: string } | void> {
  const session = await checkAuth();
  if (!session?.user.isAdmin) {
    return { message: SAMPLE_ACTION };
  }

  if (!folderPath.trim()) {
    return { message: "Folder path is required." };
  }

  try {
    // Delete all resources inside the folder (and subfolders)
    let hasMore = true;
    while (hasMore) {
      const searchResult = await cloudinary.search
        .expression(`asset_folder:${folderPath}/*`)
        .max_results(100)
        .execute();

      // Also include resources directly in this folder
      const directResult = await cloudinary.search
        .expression(`asset_folder="${folderPath}"`)
        .max_results(100)
        .execute();

      const allResources = [...searchResult.resources, ...directResult.resources];

      if (allResources.length === 0) {
        hasMore = false;
        break;
      }

      const publicIds = allResources.map(
        (r: { public_id: string }) => r.public_id
      );
      await cloudinary.api.delete_resources(publicIds);
    }

    // Delete subfolders bottom-up
    const deleteFoldersRecursive = async (path: string) => {
      const subs = await cloudinary.api
        .sub_folders(path)
        .catch(() => ({ folders: [] }));
      for (const sub of subs.folders) {
        await deleteFoldersRecursive(sub.path);
      }
      await cloudinary.api.delete_folder(path);
    };

    await deleteFoldersRecursive(folderPath);
  } catch (error) {
    handleError(error, "Error deleting folder:");
    return { message: "Could not delete the folder." };
  }
}

export async function searchMedia(
  query: string,
  folder: string
): Promise<{ resources: MediaResource[] } | { message: string }> {

  if (!query.trim()) {
    return { message: "Search query is required." };
  }

  try {
    const expression = folder
      ? `asset_folder:${folder}/* AND display_name=${query}*`
      : `display_name=${query}*`;

    const result = await cloudinary.search
      .expression(expression)
      .max_results(50)
      .execute();

    const resources: MediaResource[] = result.resources.map(
      (r: Record<string, unknown>) => ({
        public_id: r.public_id,
        secure_url: r.secure_url,
        format: r.format,
        width: r.width,
        height: r.height,
        bytes: r.bytes,
        created_at: r.created_at,
        resource_type: r.resource_type,
      })
    );

    return { resources };
  } catch (error) {
    handleError(error, "Error searching media:");
    return { message: "Could not search media." };
  }
}
