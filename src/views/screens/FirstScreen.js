import React from "react";
import { View, 
        Text, 
        StyleSheet,  
        TouchableOpacity,
        ImageBackground, } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../components/Button";

const FirstScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem("userData");

    if (userData) {
      console.log("FirstScreen");
      console.log(JSON.parse(userData));
      setUserDetails(JSON.parse(userData));
    }
  };
  const logout = () => {
    AsyncStorage.setItem(
      "userData",
      JSON.stringify({ ...userDetails, loggedIn: false })
    );

    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container }>
      <Text style={styles.text}>Welcome {userDetails?.fullname} </Text>
      
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 20,
    color: "black",
  },
  container: {
    justifyContent: "center",
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: "#3A30B2",

  },
});
export default FirstScreen;






