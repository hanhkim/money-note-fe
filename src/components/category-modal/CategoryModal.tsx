import React from 'react';

import { useGetCategoryList } from '@/modules/transaction/transaction-detail/utils';
import {
  Avatar,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react';
import RadioGroupField from '../field/RadioGroupField';
import { Control, useFormContext, useWatch } from 'react-hook-form';
import FontIcon from '../icon/FontIcon';
import { FontIconType } from '../icon/fontIconType';
import { ITransactionForm } from '@/models/Transaction.model';
import * as _ from 'lodash';
import { head } from 'lodash';
import Title from '../typography/Title';

interface ICategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: any) => void;
  control: Control<any>;
}

const CategoryModal: React.FC<ICategoryModalProps> = (props) => {
  const { isOpen, control, onClose, onSelectCategory } = props;
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<any>(null);

  const type = useWatch({ control, name: 'type' });

  const { categories } = useGetCategoryList(type);

  const groupedCategories = _.groupBy(
    categories,
    (category: any) => category.parentId
  );

  const parentCategories = groupedCategories?.null || [];

  const renderItem = (category: any) => {
    return (
      <div
        key={category.id}
        className="flex items-center cursor-pointer gap-2"
        onClick={() => {
          setSelectedCategory(category);
          onSelectCategory(category);
          setIsOpenModal(false);
        }}
      >
        <div className="bg-slate-500 rounded-full w-9 h-9 p-1 text-center">
          <FontIcon
            type={category.icon as FontIconType}
            className="text-white pt-[2px]"
          />
        </div>
        <span>{category.name}</span>
      </div>
    );
  };

  return (
    <>
      <Title>Category</Title>
      {/* <Button onClick={() => setIsOpenModal(!isOpenModal)}>
        click me: {selectedCategory?.label}
      </button> */}
      <div
        className="w-full bg-[rgb(244_244_245)] h-12 rounded-xl flex items-center justify-between px-4 cursor-pointer"
        onClick={() => setIsOpenModal(!isOpenModal)}
      >
        {selectedCategory ? (
          <div className="flex gap-3 items-center">
            <div className="bg-slate-500 rounded-full w-9 h-9 p-1 text-center">
              <FontIcon
                type={selectedCategory?.icon as FontIconType}
                className="text-white pt-[2px]"
              />
            </div>
            <p> {selectedCategory?.label}</p>
          </div>
        ) : (
          <Title className="italic">Select a category</Title>
        )}

        <FontIcon type="chevron_right" />
      </div>
      <Modal
        isOpen={isOpenModal}
        placement={'top-center'}
        onClose={() => setIsOpenModal(!isOpenModal)}
        className="h-full"
      >
        <ModalContent className="pb-6">
          <ModalHeader>Choose category</ModalHeader>

          <ModalBody className="p-3 pb-4 overflow-auto">
            <RadioGroupField name="type" control={control} />
            <div className="flex flex-col gap-3 mt-4">
              {parentCategories?.map((category: any) => {
                const header = (
                  <div
                    key={category.id}
                    className="flex items-center cursor-pointer gap-2"
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsOpenModal(false);
                      onSelectCategory(category);
                    }}
                  >
                    <div className="bg-slate-500 rounded-full w-9 h-9 p-1 text-center">
                      <FontIcon
                        type={category.icon as FontIconType}
                        className="text-white pt-[2px]"
                      />
                    </div>
                    <span>{category.name}</span>
                  </div>
                );

                const items = (groupedCategories[category.id] || []).map(
                  (category: any) => (
                    <li key={category.id} className="category-tree__item">
                      <div
                        className="flex items-center cursor-pointer gap-2"
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsOpenModal(false);
                        }}
                      >
                        <div className="bg-slate-500 rounded-full w-9 h-9 p-1 text-center">
                          <FontIcon
                            type={category.icon as FontIconType}
                            className="text-white pt-[2px]"
                          />
                        </div>
                        <span>{category.name}</span>
                      </div>
                    </li>
                  )
                );

                return (
                  <>
                    {renderItem(category)}
                    <ul className="flex-col flex gap-3 category-tree">
                      {(groupedCategories[category.id] || []).map(
                        (item: any) => (
                          <li key={category.id} className="category-tree__item">
                            {renderItem(item)}
                          </li>
                        )
                      )}
                    </ul>
                    <Divider />
                  </>
                );
              })}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CategoryModal;
