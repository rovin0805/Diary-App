import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./Navigator";
import AppLoading from "expo-app-loading";
import Realm from "realm";
import { FeelingSchema } from "./schema";
import { DBContextProvider } from "./context";
import { setTestDeviceIDAsync } from "expo-ads-admob";

export default function App() {
  const [ready, setReady] = useState(false);
  const [realm, setRealm] = useState(null);

  const startLoading = async () => {
    await setTestDeviceIDAsync("EMULATOR");
    const connection = await Realm.open({
      path: "nomadDiaryDB",
      schema: [FeelingSchema],
    });
    setRealm(connection);
  };

  const onFinish = () => setReady(true);

  if (!ready) {
    return (
      <AppLoading
        onError={console.error}
        startAsync={startLoading}
        onFinish={onFinish}
      />
    );
  }

  return (
    <DBContextProvider value={realm}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </DBContextProvider>
  );
}
