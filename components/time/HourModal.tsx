import React, { FC, useState } from "react";
import { Button } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type Props = {
  onConfirm: (val: Date) => void;
};

export const HourModal: FC<Props> = ({ onConfirm }) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
    onConfirm(date);
  };

  return (
    <>
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};
