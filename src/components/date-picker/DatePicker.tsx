import { Button, Input, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import dayjs from 'dayjs';
import React, { useState, FC, useEffect } from 'react';
import Calendar from 'react-calendar';
import FontIcon from '../icon/FontIcon';
import 'react-calendar/dist/Calendar.css';

export interface IDatePicker {
  value: null | string;
  onChange?: (value: string | null) => void;
}

const DatePicker: FC<IDatePicker> = ({ value, onChange }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [temp, setTemp] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const handleChange = (val: any) => {
    setTemp(val);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleOk = () => {
    setSelectedDate(temp);
    onChange?.(temp);
    setOpenModal(false);
  };

  const content = (
    <PopoverContent>
      <div className="p-4">
        <Calendar value={temp || selectedDate} onChange={handleChange} className="!border-0" />
        <div className="flex mt-2 justify-end gap-1">
          <Button size="sm" onClick={handleCancel}>
            Cancel
          </Button>
          <Button color="primary" size="sm" onClick={handleOk}>
            OK
          </Button>
        </div>
      </div>
    </PopoverContent>
  );

  return (
    <>
      <Popover
        placement="bottom"
        offset={0}
        showArrow={false}
        isOpen={openModal}
        onOpenChange={(open) => setOpenModal(open)}
        triggerScaleOnOpen={false}
      >
        <PopoverTrigger>
          <div>
            <Input
              value={selectedDate ? dayjs(selectedDate).format('DD/MM/YYYY') : ''}
              size="sm"
              classNames={{
                inputWrapper: 'h-12',
              }}
              placeholder="DD/MM/YYYY"
              labelPlacement="outside"
              endContent={
                <div className="cursor-pointer flex">
                  <FontIcon type="calendar_month" />
                </div>
              }
            />
          </div>
        </PopoverTrigger>
        {content}
      </Popover>
    </>
  );
};

export default DatePicker;
