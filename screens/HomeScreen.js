import React from "react";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getAuth } from "firebase/auth";
import { app } from "../firebaseConfig";
import Navbar from "../components/navbar";
import getUserInfo from "../hooks/getUserInfo";

const HomeScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = React.useState(null);

  React.useEffect(() => {
    async function loadUserInfo() {
      const userInformation = await getUserInfo();
      // setUserInfo(userInformation);
      pageContent();
      console.log(userInfo);
    }
    loadUserInfo();
    console.log(userInfo);
  }, []);

  const pageContent = () => {
    if (userInfo === null) {
      <View>
        <Text>Loading...</Text>
      </View>;
    } else {
      if (!userInfo.accountSetup) {
        return (
          <View>
            <Text>Looks like you haven't set up your account yet!</Text>
          </View>
        );
      } else {
        return (
          <View>
            <Text>Good job creating your account!</Text>
          </View>
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.container}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.container}>{pageContent()}</View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "linear-gradient(blue, pink)",
    height: "100%",
    width: "100%",
  },
});

export default HomeScreen;
