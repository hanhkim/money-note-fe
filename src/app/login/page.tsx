import React from "react";
import { Login } from "@/modules/login";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="bg-white">
      <div className="h-200px w-full text-center mt-20">
        <Image
          src="/images/background_login.png"
          width={200}
          height={200}
          alt="bg-login"
          className="mx-auto"
        />
      </div>
      <Login />
    </div>
  );
};
export default LoginPage;
