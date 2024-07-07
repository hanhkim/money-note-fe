import React, { useEffect } from "react";
import { Layout } from "@/components/layout";
import { TransactionContainer } from "@/modules/transaction";
import categoryService from "@/services/category.service";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getQueryClient from "../getQueryClient";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
import { useGlobalStore } from "@/zustants/global.store";

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["getCategoryList"],
    queryFn: () => categoryService.getCategories(),
  });
  const dehydratedState = dehydrate(queryClient);
  console.log("dehydratee :>> ", dehydratedState);

  const headersList = headers();
  const userAgent = headersList.get("user-agent");

  const { isMobile } = getSelectorsByUserAgent(userAgent ?? "");

  // HydrationBoundary is used for prefetch data from server side rendering,
  // reference to this post to understand more: https://tanstack.com/query/v4/docs/react/guides/ssr
  return (
    <HydrationBoundary state={dehydratedState}>
      <Layout isMobile={isMobile}>
        <TransactionContainer isMobile={isMobile} />
      </Layout>
    </HydrationBoundary>
  );
};

export default Page;
