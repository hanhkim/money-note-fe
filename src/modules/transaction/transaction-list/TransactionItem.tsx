import Image from "next/image";
import React from "react";

const TransactionItem = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <Image
          src="/images/eating.png"
          alt="category-img"
          width={50}
          height={50}
        />
        <span>Eating</span>
      </div>
      <div className="text-[red]">-500000</div>
    </div>
  );
};

export default TransactionItem;
