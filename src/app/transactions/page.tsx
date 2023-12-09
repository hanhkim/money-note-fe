import React from "react";
import { Layout } from "@/components/layout";
import { TransactionContainer } from "@/modules/transaction";
import categoryService from "@/services/category.service";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getQueryClient from "../getQueryClient";

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["getCategoryList"],
    queryFn: () => categoryService.getCategories(),
  });
  const dehydratedState = dehydrate(queryClient);
  console.log("dehydratee :>> ", dehydratedState);

  // HydrationBoundary is used for prefetch data from server side rendering,
  // reference to this post to understand more: https://tanstack.com/query/v4/docs/react/guides/ssr
  return (
    <HydrationBoundary state={dehydratedState}>
      <Layout>
        <TransactionContainer />
      </Layout>
    </HydrationBoundary>
  );
};
export default Page;
