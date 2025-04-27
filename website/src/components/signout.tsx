"use client";

import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";

const SignOut = () => {
  const { signOut } = useClerk();

  return (
    <Button onClick={() => signOut()} data-oid="u54bpj0">
      Sign Out
    </Button>
  );
};

export default SignOut;
