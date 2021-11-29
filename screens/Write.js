import React, { useState } from "react";
import { Alert, Platform } from "react-native";
import styled from "styled-components/native";
import colors from "../colors";
import { useDB } from "../context";
import { AdMobInterstitial } from "expo-ads-admob";

const Container = styled.View`
  background-color: ${colors.bgColor};
  flex: 1;
  padding: 0px 30px;
`;

const Title = styled.Text`
  color: ${colors.textColor};
  margin: 50px 0px;
  text-align: center;
  font-size: 28px;
  font-weight: 500;
`;

const TextInput = styled.TextInput`
  background-color: white;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 18px;
  box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
`;

const Btn = styled.TouchableOpacity`
  width: 100%;
  margin-top: 20px;
  background-color: ${colors.btnColor};
  padding: 10px 20px;
  align-items: center;
  border-radius: 20px;
  box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
`;

const BtnText = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 18px;
`;

const Emotions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Emotion = styled.TouchableOpacity`
  background-color: white;
  box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
  padding: 5px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${(props) =>
    props.selected ? "rgba(41, 30, 95, 1);" : "transparent"};
`;

const EmotionText = styled.Text`
  font-size: 18px;
`;

const emotions = ["🤯", "🥲", "🤬", "🤗", "🥰", "😊", "🤩"];

const INTERSTITIAL_TEST_ID = Platform.select({
  ios: "ca-app-pub-3940256099942544/4411468910",
  android: "ca-app-pub-3940256099942544/1033173712",
});

const Write = ({ navigation: { goBack } }) => {
  const [feelings, setFeelings] = useState("");
  const [selectedEmotion, setEmotion] = useState(null);
  const realm = useDB();

  const onEmotionPress = (face) => setEmotion(face);

  const onChangeText = (text) => setFeelings(text);

  const onSubmit = async () => {
    if (feelings === "" || selectedEmotion == null) {
      return Alert.alert("Please complete form");
    }
    await AdMobInterstitial.setAdUnitID(INTERSTITIAL_TEST_ID);
    await AdMobInterstitial.requestAdAsync({ serverPersonalizedAds: true });
    await AdMobInterstitial.showAdAsync();
    AdMobInterstitial.addEventListener("interstitialDidClose", () => {
      realm.write(() => {
        realm.create("Feeling", {
          _id: Date.now(),
          emotion: selectedEmotion,
          message: feelings,
        });
      });
      goBack();
    });
  };

  return (
    <Container>
      <Title>How do you feel now?</Title>
      <Emotions>
        {emotions.map((emotion, index) => (
          <Emotion
            key={index}
            selected={emotion === selectedEmotion}
            onPress={() => onEmotionPress(emotion)}
          >
            <EmotionText>{emotion}</EmotionText>
          </Emotion>
        ))}
      </Emotions>
      <TextInput
        returnKeyType="done"
        value={feelings}
        onChangeText={onChangeText}
        placeholder="Write your feelings...🖌"
        placeholderTextColor="gray"
        multiline={true}
        onSubmitEditing={onSubmit}
      />
      <Btn onPress={onSubmit}>
        <BtnText>Save</BtnText>
      </Btn>
    </Container>
  );
};

export default Write;
