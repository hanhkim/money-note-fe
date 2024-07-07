import React from "react";
import Account from "@/modules/account";
import { Layout } from "@/components/layout";
import { getSelectorsByUserAgent } from "react-device-detect";
import { headers } from "next/headers";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "../getQueryClient";

const LoginPage = async () => {
  const queryClient = getQueryClient();
  const headersList = headers();
  const userAgent = headersList.get("user-agent");
  const { isMobile } = getSelectorsByUserAgent(userAgent ?? "");
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Layout isMobile={isMobile}>
        <Account />
      </Layout>
    </HydrationBoundary>
  );
};
export default LoginPage;
