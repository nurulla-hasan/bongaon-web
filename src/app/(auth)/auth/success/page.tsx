"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { queryKeys } from "@/services/query-keys";

export default function GoogleAuthSuccessPage() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const queryClient = useQueryClient();
  const handledRef = React.useRef(false);

  React.useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    const completeSignIn = async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      toast.success(t("googleSignInSuccess"));
      router.replace("/");
      router.refresh();
    };

    void completeSignIn();
  }, [queryClient, router, t]);

  return (
    <Card className="w-full max-w-md">
      <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        <Loader2 className="size-7 animate-spin text-primary" aria-hidden />
        <p className="text-sm font-medium text-foreground">
          {t("completingGoogleSignIn")}
        </p>
      </CardContent>
    </Card>
  );
}
