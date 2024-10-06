import { CalendarTracker } from "@/components/calendar/CalendarTracker";
import { UserSettings } from "@/components/settings/UserSettings";
import { Feather } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();
export default function Index() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Calendar"
        component={CalendarTracker}
        options={({ navigation }) => ({
          title: "Welcome",
          headerLeft: () => (
            <Feather
              name="settings"
              size={24}
              color="black"
              onPress={() => navigation.navigate("Settings")}
            />
          ),
        })}
      />
      <Stack.Screen name="Settings" component={UserSettings} />
    </Stack.Navigator>
  );
}
