"use client";
import { NextUIProvider } from "@nextui-org/react";
import { Layout } from "@/components/layout";

export default function Home() {
  console.log("Home  :>> ");
  return (
    <NextUIProvider>
      <Layout />
    </NextUIProvider>
  );
}
