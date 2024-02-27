"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import React, { useEffect } from "react";
import { Loader2 } from "lucide-react";

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const { data, isLoading, error } = trpc.authCallback.useQuery(undefined);

  useEffect(() => {
    // error code unathorized :
    if (error?.data?.code === "UNAUTHORIZED") {
      router.push("/sign-in");
    }

    // success
    else if (!isLoading) {
      router.push(
        data !== undefined && data.succsess && origin
          ? `/${origin}`
          : "/dashboard"
      );
    }
  }, [data, isLoading, error, origin, router]);

  return (
    <div className="w-full mt-24- flex- justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
        <h3 className="font-semibold text-xl">Setter opp din konto</h3>
        <p>Du sendes videre automatisk</p>
      </div>
    </div>
  );
}

export default Page;
