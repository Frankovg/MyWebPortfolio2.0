import { Check } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { user as User } from "@/generated/prisma/client";

export const SampleAccountStatus = ({ account }: { account: User }) => {
  return (
    <Card className="border-darkPrimary border-2 rounded-md w-full h-fit">
      <CardHeader>
        <div className="w-full flex justify-between items-center">
          <div>
            <CardTitle>Sample account status</CardTitle>
            <CardDescription
              className={`${account.isActive ? "text-primary" : "text-secondary"
                }`}
            >
              {`${account.isActive ? "Active" : "Inactive"} account`}
            </CardDescription>
          </div>
          <div className="rounded-full p-2 bg-primary size-fit">
            <Check size={24} className="stroke-background stroke-3" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
