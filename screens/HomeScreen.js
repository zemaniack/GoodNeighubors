import React from "react";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getAuth } from "firebase/auth";
import { app } from "../firebaseConfig";

const HomeScreen = ({ navigation }) => {
  const auth = getAuth(app);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.container}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.container}>
          <Text>Welcome to Good NeighUBors!</Text>
          <Button
            title="Go to Profile"
            onPress={() => navigation.navigate("Profile")}
          />
        </View>
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
