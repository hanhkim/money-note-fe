"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  RadioGroup,
  Radio,
  ModalProps,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";

interface ITransactionModal {
  isOpen: boolean;
  placement: ModalProps["placement"];
  onClose?: () => void;
}

const TransactionModal: React.FC<ITransactionModal> = ({
  isOpen,
  placement,
  onClose,
}) => {
  const categories = [
    {
      value: "123",
      label: "Eating",
    },
    {
      value: "1234",
      label: "Cafe",
    },
  ];
  return (
    <Modal isOpen={isOpen} placement={placement} onClose={onClose} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Transaction
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <div>
                  <p>Price</p>
                  <Input
                    type="number"
                    placeholder="0.00"
                    labelPlacement="outside"
                    size="lg"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">VND</span>
                      </div>
                    }
                  />
                </div>
                <div>
                  <p>Category</p>
                  <Select placeholder="Select an animal" className="w-full">
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div>
                  <p>Notes</p>
                  <Textarea placeholder="Enter your description" fullWidth />
                </div>
                <div>
                  <p>From wallet</p>
                  <Select placeholder="Select an animal" className="w-full">
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div>
                  <p>Date</p>
                  <input type="date" />
                </div>
                <div>
                  <p>For person</p>
                  <Input size="sm" />
                </div>
                <div>
                  <p>Attaches</p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={onClose}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TransactionModal;
