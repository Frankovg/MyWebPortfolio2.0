import { redirect } from "next/navigation";

export default async function Project() {
  redirect(`/app/home#projects`);
}
