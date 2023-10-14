import React from "react";
import { Text, SafeAreaView, View, Button, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getAuth } from "firebase/auth";
import { app } from "../firebaseConfig";

const ProfileScreen = ({ navigation }) => {
  const auth = getAuth(app);

  return (
    console.log(auth.currentUser),
    (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          style={styles.container}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.container}>
            <Text>Profile</Text>
            <Button
              title="Go to Home"
              onPress={() => navigation.navigate("Home")}
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
        </LinearGradient>
      </SafeAreaView>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});

export default ProfileScreen;
