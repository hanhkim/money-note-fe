"use client";
import React from "react";
import SignUpForm from "./SignUpForm";
import Image from "next/image";

const SignUp = () => {
  return (
    <div className="">
      <div className="h-100px w-full text-center mt-10">
        <Image
          src="/images/background_login.png"
          width={100}
          height={100}
          alt="bg-login"
          className="mx-auto"
        />
      </div>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
