"use client";
import { NextUIProvider } from "@nextui-org/react";
import { Layout } from "@/components/layout";
import { isMobile } from "react-device-detect";

export default function Home() {
  console.log("Home  :>> ", isMobile);
  return (
    <NextUIProvider>
      <Layout isMobile={isMobile} />
    </NextUIProvider>
  );
}
