import { clear, getAllItems } from "@/utils/AsyncStorage";
import React, { useEffect, useMemo, useState } from "react";

export const AppSettingsContext = React.createContext({});

export const AppSettingsContextProvider = ({ children }) => {
  const [appSettingsInitialized, setAppSettingsInitialized] = useState(false);
  const [appSettings, setAppSettings] = useState<object | undefined>(undefined); // could use some default values instead of empty object

  useEffect(() => {
    getAllItems()
      .then((res) => {
        if (res && "dates" in res) {
          setAppSettings(JSON.parse(res.dates));
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setAppSettingsInitialized(true));
  }, []);

  const clearAll = () => {
    setAppSettings({});
    clear();
  };

  const value = useMemo(
    () => ({
      clearAll,
      appSettings,
      appSettingsInitialized,
    }),
    []
  );

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  );
};
