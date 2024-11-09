import { Link } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Checkbox, TextInput } from "react-native-paper";

export const BreakDays = () => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <>
      <View style={style.containerCheckbox}>
        <Checkbox.Item
          mode="android"
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
          label="break days"
        />
        {checked && (
          <View style={{ padding: 10, borderTopWidth: 1 }}>
            <TextInput label={"days"}></TextInput>
          </View>
        )}
      </View>

      <Link href="/startDate">
        <Button mode="contained">Set start date</Button>
      </Link>
    </>
  );
};

const style = StyleSheet.create({
  containerCheckbox: {
    borderWidth: 1,
    borderRadius: 10,
  },
});
