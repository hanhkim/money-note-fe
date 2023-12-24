import type { Metadata } from "next";
import "./globals.css";
import "./iconglobals.css";

import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Lexend } from "next/font/google";

import RQProvider from "@/providers/RQProvider";
import "react-calendar/dist/Calendar.css";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Money note",
  description: "Building good habit for your life",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        {/* <QueryClientProvider client={queryClient}> */}
        {/* <HydrationBoundary state={pageProps.dehydratedState}> */}
        <RQProvider>{children}</RQProvider>
        {/* </HydrationBoundary> */}
        {/* <ReactQueryDevtools /> */}
        {/* </QueryClientProvider> */}
      </body>
    </html>
  );
}
