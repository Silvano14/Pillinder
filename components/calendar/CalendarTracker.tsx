import {
  KeysAsyncStorageType,
  getItem,
  mergeItem,
  setItem,
} from "@/utils/AsyncStorage";
import React, { useEffect, useState } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Calendar } from "react-native-calendars";
import { Text } from "react-native-paper";
import { DefaultModal } from "../modal/DefaultModal";

export const CalendarTracker = () => {
  const [touchedDate, setTouchedDate] = useState<
    KeysAsyncStorageType["dates"] | {}
  >({});
  const [visible, setVisible] = useState(false);

  const fetchData = () => {
    getItem("dates").then((dates: KeysAsyncStorageType["dates"]) => {
      setTouchedDate(dates);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showNoteModal = (dateString: string | undefined) => {
    console.log(dateString);
    setVisible(true);
  };

  const toggleDate = (date: string | undefined) => {
    const emptyObject: KeysAsyncStorageType["dates"] = {};

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
      <DefaultModal isOpen={visible} />
      <Calendar
        markingType="custom"
        markedDates={touchedDate}
        dayComponent={({ date, state }) => {
          let keys: string[] = [];

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
              onPress={() => {
                showNoteModal(date?.dateString);
              }}
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
                {state !== "disabled" && (
                  <BouncyCheckbox
                    isChecked={isSelected}
                    disableText
                    onPress={() => {
                      showNoteModal(date?.dateString);
                    }}
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
