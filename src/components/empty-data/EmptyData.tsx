import React from "react";
import Image from "next/image";

interface IEmptyDataProps {
  text?: string;
}
const EmptyData: React.FC<IEmptyDataProps> = ({ text }) => {
  return (
    <div className="w-full rounded-lg flex items-center justify-center h-[200px] text-[#000] flex-col gap-2 m-auto">
      <Image src={"icons/no-data.svg"} alt="empty" width={100} height={40} />
      <p className="text-sm p-4 text-center whitespace-break-spaces">
        {text || "No data"}
      </p>
    </div>
  );
};

export default EmptyData;
