import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import colors from "../colors";
import { useDB } from "../context";
import { FlatList, LayoutAnimation, UIManager, Platform } from "react-native";
import { AdMobBanner } from "expo-ads-admob";

const Container = styled.View`
  flex: 1;
  padding: 0px 30px;
  padding-top: 100px;
  background-color: ${colors.bgColor};
  align-items: center;
  width: 100%;
`;

const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 38px;
  margin-bottom: 20px;
`;

const Btn = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  right: 30px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.btnColor};
  box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
`;

const Record = styled.TouchableOpacity`
  background-color: ${colors.cardColor};
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
`;

const Emotion = styled.Text`
  font-size: 24px;
  margin-right: 10px;
`;

const Message = styled.Text`
  font-size: 18px;
`;

const Separator = styled.View`
  height: 10px;
`;

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const BANNER_TEST_ID = Platform.select({
  ios: "ca-app-pub-3940256099942544/2934735716",
  android: "ca-app-pub-3940256099942544/6300978111",
});

const Home = ({ navigation: { navigate } }) => {
  const realm = useDB();
  const [feelings, setFeelings] = useState([]);

  useEffect(() => {
    const feelingsFromDB = realm.objects("Feeling");
    feelingsFromDB.addListener((feelings, changes) => {
      LayoutAnimation.spring();
      setFeelings(feelings.sorted("_id", true));
    });
    return () => {
      feelingsFromDB.removeAllListeners();
    };
  }, []);

  const deleteFeeling = (id) => {
    realm.write(() => {
      const targetFeeling = realm.objectForPrimaryKey("Feeling", id);
      realm.delete(targetFeeling);
    });
  };

  return (
    <Container>
      <Title>My Journal 🔭</Title>
      <AdMobBanner bannerSize="fullBanner" adUnitID={BANNER_TEST_ID} />
      <FlatList
        data={feelings}
        style={{ marginVertical: 20, width: "100%" }}
        contentContainerStyle={{ paddingVertical: 10 }}
        ItemSeparatorComponent={Separator}
        keyExtractor={(feeling) => feeling._id + ""}
        renderItem={({ item }) => (
          <Record onPress={() => deleteFeeling(item._id)}>
            <Emotion>{item.emotion}</Emotion>
            <Message>{item.message}</Message>
          </Record>
        )}
      />
      <Btn onPress={() => navigate("Write")}>
        <Ionicons name="add" color="white" size={40} />
      </Btn>
    </Container>
  );
};

export default Home;
