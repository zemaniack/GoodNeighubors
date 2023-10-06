import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { getAuth } from "firebase/auth";
import app from "../firebaseConfig";

const HomeScreen = ({ navigation }) => {
  const auth = getAuth(app);

  return (
    <View style={styles.container}>
      <Text>Welcome to Good NeighUBors!</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      />
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate("Settings")}
      />
      <Button
        title="print user"
        onPress={() => console.log(auth.currentUser)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
