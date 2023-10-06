import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import app from "../firebaseConfig";

const AuthScreen = ({ navigation }) => {
  // States for the form inputs
  const [action, setAction] = React.useState("login"); // ["login", "createAccount"
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [loginError, setLoginError] = React.useState("");

  // Firebase auth
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider(app);

  getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    });

  // Function to handle creating a new user
  const handleCreateAccount = () => {
    if (password === passwordConfirmation) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigation.navigate("Home");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      setPasswordError("Passwords do not match!");
    }
  };

  // Function to handle logging in an existing user
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoginError("No account found with that email/password!");
      });
  };

  // Function to switch between login and create account
  const handleSwitchAuthType = () => {
    if (action === "login") {
      setAction("createAccount");
    } else {
      setAction("login");
    }
    setEmail("");
    setPassword("");
  };

  // Function to create a new user
  const createAccount = () => {
    return (
      <View style={styles.create}>
        <LinearGradient
          colors={["#192f6a", "#3b5998", "#4c669f"]}
          style={styles.bubble}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Create Account
          </Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <View style={styles.realName}>
            <TextInput
              style={styles.name}
              autoCapitalize="none"
              placeholder="First Name"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
            <TextInput
              style={styles.name}
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
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
          <Text style={styles.passDontMatch}>
            {passwordError === "" ? "" : "Passwords do not match!"}
          </Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder="Password Confirmation"
            value={passwordConfirmation}
            onChangeText={(text) => setPasswordConfirmation(text)}
            secureTextEntry={true}
          />
          <View style={styles.loginCreate}>
            <View style={styles.buttonContainer}>
              <Button
                title="Back to Login"
                onPress={() => handleSwitchAuthType()}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Create Account"
                onPress={() => handleCreateAccount()}
                color="blue"
              />
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  // Function to login an existing user
  const login = () => {
    return (
      <View style={styles.login}>
        <LinearGradient
          colors={["#192f6a", "#3b5998", "#4c669f"]}
          style={styles.bubble}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
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
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
          <Text style={styles.loginError}>
            {loginError === ""
              ? ""
              : "No account found with that email/password!"}
          </Text>
          <View style={styles.loginCreate}>
            <View style={styles.buttonContainer}>
              <Button
                color="blue"
                title="Login"
                onPress={() => handleLogin()}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                borderRadius="10"
                title="Create Account"
                onPress={() => handleSwitchAuthType()}
              />
            </View>
          </View>
          <Text
            style={{
              color: "white",
              textAlign: "center",
            }}
          >
            - OR -
          </Text>
          <View style={styles.googleButton}>
            <Button
              title="Sign in with Google"
              onPress={() => signInWithRedirect(auth, provider)}
            />
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.container}
      >
        {action === "login" ? login() : createAccount()}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
  realName: {
    flexDirection: "row",
  },
  name: {
    flex: 1,
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
  loginCreate: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonContainer: {
    margin: 10,
    width: 150,
  },
  create: {
    width: 500,
    justifyContent: "center",
  },
  login: {
    width: 500,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "linear-gradient(blue, pink)",
    height: "100%",
    width: "100%",
  },
  googleButton: {
    margin: 10,
    width: 200,
    alignSelf: "center",
  },
  bubble: {
    padding: 20,
    borderRadius: 20,
  },
  passDontMatch: {
    color: "red",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  loginError: {
    color: "red",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default AuthScreen;
