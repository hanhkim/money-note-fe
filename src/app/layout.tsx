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
      <title>Money note - quản lý tốt chi tiêu của bạn</title>
      <meta name="theme-color" content="rgb(0, 112, 240)"></meta>
      <meta name="full-screen" content="yes"></meta>
      <meta name="apple-mobile-web-app-capable" content="yes"></meta>
      <meta name="mobile-web-app-capable" content="yes" />
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimal-ui"
      />
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
