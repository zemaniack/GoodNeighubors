import React from "react";
import {
  Text,
  SafeAreaView,
  View,
  Button,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getAuth } from "firebase/auth";
import { app, db } from "../firebaseConfig";
import "../assets/defaultProfileIcon.png";
import {
  collection,
  query,
  where,
  doc,
  setDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const ProfileScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [accountType, setAccountType] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [emergencyContactName, setEmergencyContactName] = React.useState("");
  const [emergencyContactNumber, setEmergencyContactNumber] =
    React.useState("");
  const [numberOfChildren, setNumberOfChildren] = React.useState("");
  const [numberOfPets, setNumberOfPets] = React.useState("");
  const [disabilities, setDisabilities] = React.useState("");
  const [medicalConditions, setMedicalConditions] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const auth = getAuth(app);

  const getSnapshot = async () => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0];
  };

  React.useEffect(() => {
    const loadData = async () => {
      const docSnap = await getSnapshot();

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const data = docSnap.data();
        setEmail(data?.email ?? "");
        setUsername(data?.username ?? "");
        setAddress(data?.address ?? "");
        setAccountType(data?.accountType ?? "");
        setPhoneNumber(data?.phoneNumber ?? "");
        setDob(data?.dob ?? "");
        setEmergencyContactName(data?.emergencyContactName ?? "");
        setEmergencyContactNumber(data?.emergencyContactNumber ?? "");
        setNumberOfChildren(data?.numberOfChildren ?? "");
        setNumberOfPets(data?.numberOfPets ?? "");
        setDisabilities(data?.disabilities ?? "");
        setMedicalConditions(data?.medicalConditions ?? "");
        setFirstName(data?.firstName ?? "");
        setLastName(data?.lastName ?? "");
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    loadData();
  }, []);

  const handleSave = async () => {
    const docSnap = await getSnapshot();

    await updateDoc(doc(db, "users", docSnap.id), {
      email: email,
      username: username,
      address: address,
      accountType: accountType,
      phoneNumber: phoneNumber,
      dob: dob,
      emergencyContactName: emergencyContactName,
      emergencyContactNumber: emergencyContactNumber,
      numberOfChildren: numberOfChildren,
      numberOfPets: numberOfPets,
      disabilities: disabilities,
      medicalConditions: medicalConditions,
      firstName: firstName,
      lastName: lastName,
    })
      .then(() => {
        console.log("Document successfully written!");
        navigation.reset({
          index: 0,
          routes: [{ name: "Profile" }],
        });
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

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
          <Text>Profile</Text>
          <View style={styles.buttonsContainer}>
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
          <View style={styles.sectionContainer}>
            <View style={styles.profileContainer}>
              <LinearGradient
                colors={["#192f6a", "#3b5998", "#4c669f"]}
                style={styles.bubble}
                start={{ x: 0, y: 0.75 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.header}>Public Profile</Text>
                <Image
                  source={require("../assets/defaultProfileIcon.png")}
                  style={styles.profilePicture}
                />
                <Button title="Upload Photo"></Button>
                <Text style={styles.profileName}>
                  {auth.currentUser.displayName}
                </Text>
              </LinearGradient>
            </View>
            <View style={styles.infoContainer}>
              <LinearGradient
                colors={["#192f6a", "#3b5998", "#4c669f"]}
                style={styles.bubble}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
              >
                <Text style={styles.header}>Account Information</Text>
                <ScrollView style={styles.infoSection}>
                  <View style={styles.names}>
                    <TextInput
                      style={[styles.input, styles.name]}
                      autoCapitalize="none"
                      placeholder="First Name"
                      value={firstName}
                      onChangeText={(text) => setFirstName(text)}
                    />
                    <TextInput
                      style={[styles.input, styles.name]}
                      autoCapitalize="none"
                      placeholder="Last Name"
                      value={lastName}
                      onChangeText={(text) => setLastName(text)}
                    />
                  </View>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                  />
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Username"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                  />
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Address"
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                  />
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Account Type"
                    value={accountType}
                    onChangeText={(text) => setAccountType(text)}
                  />
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                  />
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Date of Birth"
                    value={dob}
                    onChangeText={(text) => setDob(text)}
                  />
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Emergency Contact Name"
                    value={emergencyContactName}
                    onChangeText={(text) => setEmergencyContactName(text)}
                  />
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Emergency Contact Number"
                    value={emergencyContactNumber}
                    onChangeText={(text) => setEmergencyContactNumber(text)}
                  />
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Number of Children"
                    value={numberOfChildren}
                    onChangeText={(text) => setNumberOfChildren(text)}
                  />
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Number of Pets"
                    value={numberOfPets}
                    onChangeText={(text) => setNumberOfPets(text)}
                  />
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Disabilities"
                    value={disabilities}
                    onChangeText={(text) => setDisabilities(text)}
                  />
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Medical Conditions"
                    value={medicalConditions}
                    onChangeText={(text) => setMedicalConditions(text)}
                  />
                </ScrollView>
                <View style={styles.infoFooter}>
                  <Button title="Save Info" onPress={() => handleSave()} />
                </View>
              </LinearGradient>
            </View>
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    position: "absolute",
    top: 0,
  },
  sectionContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  infoContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
  },
  bubble: {
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
  infoSection: {
    width: "100%",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  names: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    flex: 1,
  },
  infoFooter: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileScreen;
