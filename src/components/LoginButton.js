"use client";

import { signIn, signOut, useSession } from "next-auth/react";

function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center space-x-2">
        <button onClick={() => signOut()} className="btn-signout">
          Sign out
        </button>
        <span>Logged in as {session.user.name}</span>
      </div>
    );
  }

  return (
    <button onClick={() => signIn("google")} className="btn-signin">
      Sign in with Google
    </button>
  );
}

export default LoginButton;
