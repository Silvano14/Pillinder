import { clear, getAllItems, mergeItem, setItem } from "@/utils/AsyncStorage";
import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function Index() {
  const [touchedDate, setTouchedDate] = useState<object>({});

  const toggleDate = (date: string) => {
    const emptyObject = {};
    console.log(touchedDate);
    // Controllo se è una data con il dot oppure no
    if (Object.keys(touchedDate).find((k) => k === date)) {
      Object.assign(emptyObject, touchedDate);
      delete emptyObject[date];
      setTouchedDate(emptyObject);
      setItem("dates", emptyObject);
    } else {
      const obj = {
        [date]: {
          selectedDotColor: "orange",
          marked: true,
        },
      };

      mergeItem("dates", obj);

      setTouchedDate({
        ...touchedDate,
        ...obj,
      });
    }
  };

  useEffect(() => {
    if (
      Object.keys(touchedDate).length === 0 &&
      touchedDate.constructor === Object
    ) {
      getAllItems().then((res) => {
        if (res && "dates" in res) {
          setTouchedDate(res.dates as object);
        }
      });
    }
  }, []);

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
          setTouchedDate({});
        }}
      ></Button>
      <Button
        title="getAllkeys"
        onPress={() => {
          getAllItems().then((res) => {
            console.log(res);
          });
        }}
      ></Button>
    </View>
  );
}
