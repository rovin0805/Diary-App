import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./Navigator";
import AppLoading from "expo-app-loading";
import Realm from "realm";
import { FeelingSchema } from "./schema";

export default function App() {
  const [ready, setReady] = useState(false);

  const startLoading = async () => {
    const realm = await Realm.open({
      path: "nomadDiaryDB",
      schema: [FeelingSchema],
    });
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
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}
