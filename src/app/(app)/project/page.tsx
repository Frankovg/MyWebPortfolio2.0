import { redirect } from "next/navigation";

export default async function Project() {
  redirect(`/home#projects`);
}
