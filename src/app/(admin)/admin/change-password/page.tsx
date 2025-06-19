import { Suspense } from "react";

import AdminPageTitle from "@/components/admin/admin-page-title";
import AdminSection from "@/components/admin/admin-section";
import { ChangePasswordForm } from "@/components/admin/change-password-form";
import MainHeader from "@/components/admin/main-header";
import { checkAuth } from "@/lib/check-auth";
import { getUsersAdmin } from "@/lib/server-utils-admin";

import Loading from "./loading";

async function ChangePassword() {
  const breadcrumbLinks = [
    {
      name: "Change password",
    },
  ];

  const session = await checkAuth();

  const users = await getUsersAdmin();

  return (
    <>
      <MainHeader breadcrumbLinks={breadcrumbLinks} />
      <Suspense fallback={<Loading />}>
        <AdminSection>
          <AdminPageTitle title="Change password" />
          <ChangePasswordForm />
        </AdminSection>
      </Suspense>
    </>
  );
}

export default ChangePassword;
