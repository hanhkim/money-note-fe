"use client";
import { useMyProfile } from "@/hooks/useMyProfile";
import authService from "@/services/auth.service";
import { Button, Divider, User } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

const Account = () => {
  const router = useRouter();

  const { mutateAsync: logout, error } = useMutation({
    mutationKey: ["authService.logout"],
    mutationFn: () => authService.logout(),
    onSuccess: async (result) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("myProfile");
      router.push("/login");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const myProfile = useMyProfile() || ({} as any);

  const items = [
    {
      text: "Phone",
      value: myProfile.phone,
    },
    {
      text: "Gender",
      value: myProfile.gender,
    },
    {
      text: "Status",
      value: myProfile.status,
    },
  ];

  return (
    <div className="p-10">
      <User
        as="button"
        name={`${myProfile?.firstName} ${myProfile?.lastName}`}
        className="transition-transform"
        avatarProps={{
          src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        }}
        classNames={{
          name: "text-neutral-700 font-bold capitalize",
        }}
        description={myProfile?.email}
      />
      <Divider />
      <div className="mt-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between py-2">
            <div className="text-neutral-500">{item.text}</div>
            <div className="text-neutral-700 italic">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="py-4">
        <Button
          className="w-full"
          onClick={async () => {
            await logout();
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Account;
