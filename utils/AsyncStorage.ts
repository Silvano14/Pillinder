import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key: string, value: object) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting item:", error);
  }
};

export const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error getting item:", error);
    return null;
  }
};

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing item:", error);
  }
};

export const mergeItem = async (key: string, value: object) => {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error merging item:", error);
  }
};

export const clear = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
  }
};

export const getAllKeys = async () => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    console.error("Error getting all keys:", error);
    return [];
  }
};

export const getAllItems = async (): Promise<
  KeysAsyncStorageType | undefined
> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    return items.reduce((accumulator, [key, value]) => {
      accumulator[key] = JSON.parse(value);
      return accumulator;
    }, {} as KeysAsyncStorageType);
  } catch (error) {
    console.error("Error getting all items:", error);
  }
};

interface MarkedDate {
  marked: boolean;
  notes?: string;
}

interface Dates {
  [key: string]: MarkedDate;
}

export interface KeysAsyncStorageType {
  dates?: Dates;
  startDate?: string;
}
