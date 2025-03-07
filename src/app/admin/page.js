"use client";

import { useSession } from "next-auth/react";
import AdminConsole from "@/components/AdminConsole";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session || !session.user.isAdmin) {
    router.push("/"); // Redirect if not an admin
    return <p>Access denied. Redirecting...</p>;
  }

  return (
    <div>
      <h1>Admin Console</h1>
      <AdminConsole />
    </div>
  );
}
