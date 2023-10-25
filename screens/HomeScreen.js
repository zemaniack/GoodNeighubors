import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { getAuth } from "firebase/auth";
import app from "../firebaseConfig";
import { WebView } from "react-native-web-webview" ;

const HomeScreen = ({ navigation }) => {
  const auth = getAuth(app);
  
  //const tableauEmbedCode = `<script type='module' src='https://prod-useast-b.online.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js'></script><tableau-viz id='tableau-viz' src='https://prod-useast-b.online.tableau.com/t/communitydashboard/views/disabilities_communities/Dashboard2/39f71455-34df-42a0-ad94-820bd5eeab43/e3a6f389-3a23-4e10-9a75-7b7a64ebf7a9' width='1488' height='702' hide-tabs toolbar='bottom' ></tableau-viz>`
  const tableauUrl="https://prod-useast-b.online.tableau.com/t/communitydashboard/views/disabilities_communities/Dashboard2/b347fd8f-9ae1-4fc9-8c1a-867b5bdd6120/8c879fdb-6fd7-46a4-bb88-a01be172d755?:embed=yes"
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
      {/* WebView for Tableau embedding */}
      <WebView
        source={{ uri: tableauUrl }} // Pass the Tableau embed code as HTML
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
