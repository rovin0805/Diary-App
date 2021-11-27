import React from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import colors from "../colors";

const Container = styled.View`
  flex: 1;
  padding: 0px 30px;
  padding-top: 100px;
  background-color: ${colors.bgColor};
`;

const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 38px;
  margin-bottom: 100px;
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

const Home = ({ navigation: { navigate } }) => (
  <Container>
    <Title>My Journal 🔭</Title>
    <Btn onPress={() => navigate("Write")}>
      <Ionicons name="add" color="white" size={40} />
    </Btn>
  </Container>
);
export default Home;
