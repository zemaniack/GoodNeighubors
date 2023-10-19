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
  Alert,
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
import * as ImagePicker from "expo-image-picker";

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
  const [emergencyContactEmail, setEmergencyContactEmail] = React.useState("");
  const [numberOfChildren, setNumberOfChildren] = React.useState("");
  const [numberOfAdults, setNumberOfAdults] = React.useState("");
  const [numberOfPets, setNumberOfPets] = React.useState("");
  const [medicalConditions, setMedicalConditions] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [profilePicture, setProfilePicture] = React.useState(null);

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
        setEmergencyContactEmail(data?.emergencyContactEmail ?? "");
        setNumberOfChildren(data?.numberOfChildren ?? "");
        setNumberOfAdults(data?.numberOfAdults ?? "");
        setNumberOfPets(data?.numberOfPets ?? "");
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
      emergencyContactEmail: emergencyContactEmail,
      numberOfChildren: numberOfChildren,
      numberOfAdults: numberOfAdults,
      numberOfPets: numberOfPets,
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

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      // If permission is denied, show an alert
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera  
             roll permission to upload images.`
      );
    } else {
      // Launch the image library and get the selected image
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.cancelled) {
        setProfilePicture(result.uri);
      }
    }
  };

  const uploadProfileImage = async () => {};

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
                <View style={styles.imageContainer}>
                  <Image
                    source={require("../assets/defaultProfileIcon.png")}
                    style={styles.profilePicture}
                  />
                  <Button title="Upload Photo" onPress={() => pickImage()} />
                </View>
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
                  {/* <View style={styles.names}> */}
                  <View style={styles.namesLabelContainer}>
                    <Text style={[styles.label, styles.name]}>First Name</Text>
                    <Text style={[styles.label, styles.name]}>Last Name</Text>
                  </View>
                  <View style={styles.namesContainer}>
                    <TextInput
                      style={[styles.input, styles.name]}
                      autoCapitalize="none"
                      placeholder="Jane"
                      value={firstName}
                      onChangeText={(text) => setFirstName(text)}
                    />
                    <TextInput
                      style={[styles.input, styles.name]}
                      autoCapitalize="none"
                      placeholder="Smith"
                      value={lastName}
                      onChangeText={(text) => setLastName(text)}
                    />
                  </View>
                  {/* </View> */}
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="email@email.com"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                  />
                  <Text style={styles.label}>Username</Text>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="BuffaloBillsFan123"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                  />
                  <Text style={styles.label}>Address</Text>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="123 Street Name, County, State Zip"
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                  />
                  <Text style={styles.label}>Account Type</Text>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="(basic, volunteer, authority, authority coordinator)"
                    value={accountType}
                    onChangeText={(text) => setAccountType(text)}
                  />
                  <Text style={styles.label}>Phone Number</Text>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="(123)-456-7890"
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                  />
                  <Text style={styles.label}>Date of Birth</Text>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="January 1, 2000"
                    value={dob}
                    onChangeText={(text) => setDob(text)}
                  />
                  <Text style={[styles.label, styles.sectionTitle]}>
                    Emergency Contact Information
                  </Text>
                  <Text style={styles.description}>
                    This will be used only in emergency situations, such as
                    being incapacitated or unable to be reached during a
                    disaster situation.
                  </Text>
                  <Text style={styles.label}>Emergency Contact Name</Text>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="John Smith"
                    value={emergencyContactName}
                    onChangeText={(text) => setEmergencyContactName(text)}
                  />
                  <Text style={styles.label}>Emergency Contact Number</Text>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="(123)-456-7890"
                    value={emergencyContactNumber}
                    onChangeText={(text) => setEmergencyContactNumber(text)}
                  />
                  <Text style={styles.label}>Emergency Contact Email</Text>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="email@email.com"
                    value={emergencyContactEmail}
                    value={emergencyContactEmail}
                    onChangeText={(text) => setEmergencyContactEmail(text)}
                  />
                  <Text style={[styles.label, styles.sectionTitle]}>
                    Household Information
                  </Text>
                  <Text style={styles.description}>
                    This information will be used to help first responders
                    determine the number of people and pets that may need
                    assistance during a disaster situation.
                  </Text>
                  <Text style={styles.label}>Number of Adults</Text>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="2"
                    value={numberOfAdults}
                    onChangeText={(text) => setNumberOfAdults(text)}
                  />
                  <Text style={styles.label}>Number of Children</Text>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="3"
                    value={numberOfChildren}
                    onChangeText={(text) => setNumberOfChildren(text)}
                  />
                  <Text style={styles.label}>Number of Pets</Text>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Number of Pets"
                    value={numberOfPets}
                    onChangeText={(text) => setNumberOfPets(text)}
                  />
                  <Text style={styles.label}>
                    Significant Medical Conditions or Disabilities
                  </Text>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Chronic Heart Disease, Asthma, Depression, etc."
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
  imageContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  namesContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 10,
  },
  namesLabelContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  bubble: {
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
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
    placeholderTextColor: "grey",
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
    width: "100%",
  },
  infoFooter: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontWeight: "bold",
    marginLeft: 15,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    borderTopWidth: 1,
    borderTopColor: "black",
    marginRigth: 15,
  },
  description: {
    margin: 15,
    marginTop: 5,
    marginBottom: 5,
  },
});

export default ProfileScreen;
