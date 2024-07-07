import { Layout } from "@/components/layout";
import WalletList from "@/modules/wallets/wallet-list/WalletList";
import React from "react";
import { getSelectorsByUserAgent } from "react-device-detect";
import getQueryClient from "../getQueryClient";
import { headers } from "next/headers";

const Wallets = () => {
  const queryClient = getQueryClient();
  const headersList = headers();
  const userAgent = headersList.get("user-agent");
  const { isMobile } = getSelectorsByUserAgent(userAgent ?? "");

  return (
    <Layout isMobile={isMobile}>
      <WalletList />
    </Layout>
  );
};
export default Wallets;
