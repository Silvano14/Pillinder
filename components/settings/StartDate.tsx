import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";
import { setItem } from "@/utils/AsyncStorage";

export const StartDate = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const setStartDate = () => {
    setItem("startDate", date);
  };

  return (
    <>
      <DateTimePicker
        display="inline"
        value={date}
        mode={"date"}
        onChange={onChange}
      />
      <Button mode="contained" onPress={setStartDate}>
        Save
      </Button>
    </>
  );
};
