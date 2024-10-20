import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";

export const PillType = () => {
  return (
    <View style={styles.container}>
      <IconButton
        icon="camera"
        iconColor={MD3Colors.error50}
        size={20}
        onPress={() => console.log("Pressed")}
      />
      <IconButton
        icon="camera"
        iconColor={MD3Colors.error50}
        size={20}
        onPress={() => console.log("Pressed")}
      />
      <IconButton
        icon="camera"
        iconColor={MD3Colors.error50}
        size={20}
        onPress={() => console.log("Pressed")}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flexDirection: "row" },
});
