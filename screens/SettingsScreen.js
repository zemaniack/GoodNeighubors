import React from "react";
import { SafeAreaView, Text, Button } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import app from "../firebaseConfig";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth(app);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful.");
        console.log(auth.currentUser);
        navigation.reset({
          index: 0,
          routes: [{ name: "Auth" }],
        });
      })
      .catch((error) => {
        // An error happened.
        console.log("An error happened.");
      });
  };

  return (
    <SafeAreaView>
      <Text>Settings Screen</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </SafeAreaView>
  );
};

export default SettingsScreen;
