import { clear, getAllItems, mergeItem, setItem } from "@/utils/AsyncStorage";
import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { Calendar } from "react-native-calendars";

type DateInfo = {
  year: number;
  month: number;
  day: number;
  timestamp: number;
  dateString: string;
};

type TouchedObjType = {
  [key: string]: { selectedDotColor: string; marked: boolean };
};

export default function Index() {
  const [touchedDate, setTouchedDate] = useState<TouchedObjType | {}>({});

  const toggleDate = (date: string) => {
    const emptyObject: TouchedObjType = {};
    // Controllo se è una data con il dot oppure no
    if (Object.keys(touchedDate).find((k) => k === date)) {
      Object.assign(emptyObject, touchedDate);
      console.log(touchedDate);

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
          setTouchedDate(res.dates as TouchedObjType);
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
        onDayPress={(day: DateInfo) => {
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
