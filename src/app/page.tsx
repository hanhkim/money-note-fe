"use client";
import { NextUIProvider } from "@nextui-org/react";
import { Layout } from "@/components/layout";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <NextUIProvider>
      <Layout />
    </NextUIProvider>
  );
}
