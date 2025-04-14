import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { MainNav } from "@/components/dashboard/main-nav";
import { UserAccountNav } from "@/components/dashboard/user-account-nav";
import {DashboardNav} from "@/components/dashboard/dashboard-nav"

export const metadata: Metadata = {
  title: "Dashboard | Tavio",
  description: "Dashboard for Tavio",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="h-screen">
      <div className="flex flex-1">
        <DashboardNav isLoggedIn={true} />
        <main className="flex w-full flex-1 flex-col overflow-hidden p-4 bg-amber-300">
          {children}
        </main>
      </div>
    </div>
  );
}