import * as React from "react";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

type Props = {
  error: (val: string) => boolean;
  errorMessage?: string;
  label?: string;
  value?: string;
  onChange?: (val: string) => void;
};

export const DefaultHelperText: React.FC<Props> = ({
  error,
  errorMessage,
  value,
  onChange,
  label,
}) => {
  const [text, setText] = React.useState(value ?? "");

  const onChangeText = (text: string) => {
    if (onChange) {
      onChange(text);
    }
    setText(text);
  };

  const hasErrors = () => {
    if (error) {
      return !error(text);
    }
  };

  return (
    <View>
      <TextInput label={label} value={text} onChangeText={onChangeText} />
      <HelperText type="error" visible={hasErrors()}>
        {errorMessage}
      </HelperText>
    </View>
  );
};
