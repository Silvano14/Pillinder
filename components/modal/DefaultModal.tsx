import * as React from "react";
import { Modal, Portal, Text, TextInput } from "react-native-paper";

type DefaultModalProps = {
  isOpen: boolean;
};

export const DefaultModal: React.FC<DefaultModalProps> = ({ isOpen }) => {
  const [visible, setVisible] = React.useState(isOpen);

  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <Text>Type a note. (optional)</Text>
        <TextInput></TextInput>
      </Modal>
    </Portal>
  );
};
