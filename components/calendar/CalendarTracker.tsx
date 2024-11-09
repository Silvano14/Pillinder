import { getAllItems, getItem, mergeItem, setItem } from "@/utils/AsyncStorage";
import { isBetween21And28Days } from "@/utils/dateUtils";
import React, { useEffect, useState } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Calendar } from "react-native-calendars";
import { Text } from "react-native-paper";

type TouchedObjType = {
  [key: string]: { selectedDotColor: string; marked: boolean };
};

export const CalendarTracker = () => {
  const [touchedDate, setTouchedDate] = useState<TouchedObjType | {}>({});
  const [startDate, setStartDate] = useState<string>();
  const fetchData = () => {
    getItem("dates").then((dates) => {
      setTouchedDate(dates as TouchedObjType);
    });
    getItem("startDate").then((startDate) => {
      setStartDate(startDate);
    });
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const toggleDate = (date: string | undefined) => {
    const emptyObject: TouchedObjType = {};

    if (!date) {
      return;
    }

    // Controllo se è una data con il dot oppure no
    if (touchedDate && Object.keys(touchedDate).find((k) => k === date)) {
      Object.assign(emptyObject, touchedDate);

      delete emptyObject[date];
      setTouchedDate(emptyObject);
      setItem("dates", emptyObject);
    } else {
      const obj = {
        [date]: {
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

  return (
    <View>
      <Calendar
        markingType="custom"
        onDayPress={(day) => {
          toggleDate(day.dateString);
        }}
        markedDates={{
          ...touchedDate,
        }}
        dayComponent={({ date, state }) => {
          let isShowCheckboxx = true;
          if (startDate && date?.timestamp) {
            const timeA = new Date(startDate).getTime();
            const timeB = new Date(date.timestamp).getTime();
            isShowCheckboxx = !isBetween21And28Days(timeA, timeB);
          }
          let keys = [];

          if (touchedDate) {
            keys = Object.keys(touchedDate);
          }

          const isSelected = keys.includes(date?.dateString ?? "");
          const isDisabled = state === "disabled";
          const today = new Date().toISOString().split("T")[0];
          const isToday = today === date?.dateString;
          return (
            <TouchableWithoutFeedback
              disabled={state === "disabled"}
              onPress={() => toggleDate(date?.dateString)}
            >
              <View
                style={{
                  opacity: isDisabled ? 0.5 : 1,
                  borderRadius: 10,
                  borderColor: "black",
                  borderWidth: today === date?.dateString ? 2 : 0.5,
                  alignItems: "center",
                  justifyContent: "center",
                  width: 50,
                  height: 95,
                }}
              >
                {isToday ? <Text variant="titleSmall">Today</Text> : <></>}
                <Text
                  style={{
                    padding: 5,
                    textAlign: "center",
                    color: state === "disabled" ? "gray" : "black",
                  }}
                >
                  {date?.day}
                </Text>
                {isShowCheckboxx && (
                  <BouncyCheckbox
                    disabled={isDisabled}
                    isChecked={isSelected}
                    disableText
                    onPress={() => toggleDate(date?.dateString)}
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
    </View>
  );
};
