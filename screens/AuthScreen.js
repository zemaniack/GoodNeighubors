import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
  Animated,
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
  const [loginError, setLoginError] = React.useState("");
  const [createError, setCreateError] = React.useState("");

  // Animation for the input box on error
  const rotateAnim = React.useRef(new Animated.Value(0)).current;
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-2deg", "2deg"],
  });

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

  // Function to chek that all fields are filled out
  const checkFields = () => {
    if (
      email === "" ||
      password === "" ||
      (action === "createAccount" &&
        (username === "" ||
          firstName === "" ||
          lastName === "" ||
          passwordConfirmation === ""))
    ) {
      return false;
    }
    return true;
  };

  // Function to handle creating a new user
  const handleCreateAccount = () => {
    if (!checkFields()) {
      setCreateError("Please fill out all fields!");
      rotateInput();
      return;
    } else {
      if (password === passwordConfirmation) {
        if (password.length < 8) {
          setCreateError("Password must be at least 8 characters long!");
          rotateInput();
          return;
        } else {
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
        }
      } else {
        setCreateError("Passwords do not match!");
        rotateInput();
      }
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
        rotateInput();
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
    setPasswordConfirmation("");
    setUsername("");
    setFirstName("");
    setLastName("");
    setLoginError("");
    setCreateError("");
  };

  // Function to rotate the input box on error
  const rotateInput = () => {
    Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: -1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
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
          <Animated.View
            style={{
              transform: [{ rotate: username === "" ? rotateInterpolate : 0 }],
            }}
          >
            <TextInput
              style={[
                styles.input,
                username === "" && createError !== "" ? styles.error : null,
              ]}
              autoCapitalize="none"
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
          </Animated.View>
          <View style={styles.realName}>
            <Animated.View
              style={{
                transform: [
                  { rotate: firstName === "" ? rotateInterpolate : 0 },
                ],
              }}
            >
              <TextInput
                style={[
                  styles.name,
                  firstName === "" && createError !== "" ? styles.error : null,
                ]}
                autoCapitalize="none"
                placeholder="First Name"
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
              />
            </Animated.View>
            <Animated.View
              style={{
                transform: [
                  { rotate: lastName === "" ? rotateInterpolate : 0 },
                ],
              }}
            >
              <TextInput
                style={[
                  styles.name,
                  lastName === "" && createError !== "" ? styles.error : null,
                ]}
                autoCapitalize="none"
                placeholder="Last Name"
                value={lastName}
                onChangeText={(text) => setLastName(text)}
              />
            </Animated.View>
          </View>
          <Animated.View
            style={{
              transform: [{ rotate: email === "" ? rotateInterpolate : 0 }],
            }}
          >
            <TextInput
              style={[
                styles.input,
                email === "" && createError !== "" ? styles.error : null,
              ]}
              autoCapitalize="none"
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </Animated.View>
          <Animated.View
            style={{
              transform: [
                {
                  rotate:
                    password === ""
                      ? rotateInterpolate
                      : (passwordConfirmation !== "" &&
                          password !== passwordConfirmation &&
                          checkFields()) ||
                        (password.length < 8 &&
                          checkFields() &&
                          passwordConfirmation == password)
                      ? rotateInterpolate
                      : 0,
                },
              ],
            }}
          >
            <TextInput
              style={[
                styles.input,
                password == "" && createError !== "" ? styles.error : null,
                passwordConfirmation.length < 8 &&
                checkFields() &&
                passwordConfirmation == password
                  ? styles.error
                  : null,
                password !== "" && createError == "Passwords do not match!"
                  ? styles.error
                  : null,
                password !== passwordConfirmation && checkFields()
                  ? styles.error
                  : null,
              ]}
              autoCapitalize="none"
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
          </Animated.View>
          <Animated.View
            style={{
              transform: [
                {
                  rotate:
                    passwordConfirmation === ""
                      ? rotateInterpolate
                      : (password !== "" &&
                          password !== passwordConfirmation &&
                          checkFields()) ||
                        (password.length < 8 &&
                          checkFields() &&
                          passwordConfirmation == password)
                      ? rotateInterpolate
                      : 0,
                },
              ],
            }}
          >
            <TextInput
              style={[
                styles.input,
                passwordConfirmation == "" && createError !== ""
                  ? styles.error
                  : null,
                passwordConfirmation.length < 8 &&
                checkFields() &&
                passwordConfirmation == password
                  ? styles.error
                  : null,
                passwordConfirmation !== "" &&
                createError !== "Passwords do not match!"
                  ? styles.error
                  : null,
                password !== passwordConfirmation && checkFields()
                  ? styles.error
                  : null,
              ]}
              autoCapitalize="none"
              placeholder="Password Confirmation"
              value={passwordConfirmation}
              onChangeText={(text) => setPasswordConfirmation(text)}
              secureTextEntry={true}
            />
          </Animated.View>
          <Text style={styles.passDontMatch}>
            {createError === "" ? "" : createError}
          </Text>
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
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <TextInput
              style={[styles.input, loginError !== "" ? styles.error : null]}
              autoCapitalize="none"
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </Animated.View>
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <TextInput
              style={[styles.input, loginError !== "" ? styles.error : null]}
              autoCapitalize="none"
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
          </Animated.View>
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
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
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
  error: {
    borderColor: "red",
  },
});

export default AuthScreen;
