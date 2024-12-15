import { setItem } from "@/utils/AsyncStorage";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

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
    <View
      style={{
        borderRadius: "10%",
        padding: 10,
      }}
    >
      <DateTimePicker
        themeVariant="light"
        display="inline"
        value={date}
        mode={"date"}
        onChange={onChange}
      />
      <Button mode="contained" onPress={setStartDate}>
        Save
      </Button>
    </View>
  );
};
