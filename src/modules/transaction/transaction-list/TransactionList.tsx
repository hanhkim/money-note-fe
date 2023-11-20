import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Chip,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import TransactionItem from "./TransactionItem";

const TransactionList = () => {
  return (
    <div className="flex flex-col gap-4">
      <TransactionBlock />
      <TransactionBlock />
    </div>
  );
};

export default TransactionList;

export const TransactionBlock = () => {
  return (
    <Card className="p-4">
      <CardHeader className="flex justify-between">
        <div className="flex gap-3 items-center">
          <div className="text-xl text-slate-500">09</div>
          <div>
            <div className="text-base">November, 2023</div>
            <div>
              <Chip variant="bordered" size="sm">
                Thursday
              </Chip>
            </div>
          </div>
        </div>
        <div className="text-[red]">-500.000</div>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-4">
        <Listbox color="default" variant="faded">
          <ListboxItem key="new">
            <TransactionItem />
          </ListboxItem>
          <ListboxItem key="new">
            <TransactionItem />
          </ListboxItem>
        </Listbox>
      </CardBody>
    </Card>
  );
};
