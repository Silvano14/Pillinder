import { clear, getAllItems, setItem } from "@/utils/AsyncStorage";
import React, { useState } from "react";
import { Button, View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function Index() {
  const [touchedDate, setTouchedDate] = useState<object>({});

  const toggleDate = (date: string) => {
    const emptyObject = {};
    if (Object.keys(touchedDate).find((k) => k === date)) {
      Object.assign(emptyObject, touchedDate);
      delete emptyObject[date];
      setTouchedDate(emptyObject);
    } else {
      setItem("dates", touchedDate);

      setTouchedDate({
        ...touchedDate,
        [date]: {
          selectedDotColor: "orange",
          marked: true,
        },
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Calendar
        onDayPress={(day) => {
          toggleDate(day.dateString);
        }}
        markedDates={{
          ...touchedDate,
        }}
      />
      <Button
        title="Clear"
        onPress={() => {
          clear();
        }}
      ></Button>
      <Button
        title="getAllkeys"
        onPress={() => {
          getAllItems().then((res) => {
            console.log(res);
            setTouchedDate(res);
          });
        }}
      ></Button>
    </View>
  );
}
