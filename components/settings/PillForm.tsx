import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import PillPausePicker from "../picker/PillPauserPicker";

const PillForm = () => {
  const [pillType, setPillType] = useState("");
  const [pauseDays, setPauseDays] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Function to handle date selection
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowDatePicker(false);
    setStartDate(currentDate);
  };

  const handleSubmit = () => {
    // Submit form data (You can add form validation here)
    console.log({
      pillType,
      pauseDays,
      startDate: startDate.toLocaleDateString(),
    });
    // Reset form after submit
    setPillType("");
    setPauseDays("");
    setStartDate(new Date());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Pill Type</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter pill type"
        value={pillType}
        onChangeText={(text) => setPillType(text)}
      />

      <Text style={styles.label}>Pause Days</Text>
      <PillPausePicker />

      <Text style={styles.label}>Start Date</Text>
      <Button
        title="Select Start Date"
        onPress={() => setShowDatePicker(true)}
      />
      {showDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      <Text style={styles.dateText}>
        Selected: {startDate.toLocaleDateString()}
      </Text>

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  picker: {
    height: 50,
    marginBottom: 16,
  },
  dateText: {
    marginVertical: 16,
  },
});

export default PillForm;
