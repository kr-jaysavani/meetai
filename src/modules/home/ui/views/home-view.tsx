"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const HomeView = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  if (!session) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Welcome, {session.user.name}!</h1>
      <p className="text-lg mb-8">
        You are logged in with email: {session.user.email}
      </p>
      <Button
        onClick={async () => {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => router.push("/sign-in"),
            },
          });
        }}
      >
        Sign Out
      </Button>
    </div>
  );
};
