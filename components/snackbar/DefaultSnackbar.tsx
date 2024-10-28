import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Snackbar } from "react-native-paper";

type Props = {
  visible: boolean;
};

export const DefaultSnackbar: React.FC<Props> = ({ visible }) => {
  const [isVisible, setIsVisible] = React.useState(visible);
  return (
    <View style={styles.container}>
      <Snackbar
        visible={isVisible}
        onDismiss={() => {
          setIsVisible(false);
        }}
        duration={5000}
        theme={{ colors: { primary: "green" } }}
        action={{
          label: "Undo",
          onPress: () => {
            setIsVisible(false);
          },
        }}
      >
        Hey there! I'm a Snackbar.
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
