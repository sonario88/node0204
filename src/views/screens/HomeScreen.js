import React from "react";
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground } from "react-native";

import bgImage1 from "../../img/background.jpg";

import AsyncStorage from "@react-native-async-storage/async-storage";




const HomeScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem("userData");

    if (userData) {
      console.log("Home Screen");
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
    <ImageBackground source={bgImage1} style={{width: '100%', height: '100%'}}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center",marginTop:350, }}>
        <Text style={styles.text}> {userDetails?.fullname} </Text>
        <Text style={styles.text}> Организуй свой {'\n'} учебный процесс </Text>
        <Text style={styles.text1}> Равным образом курс на социально- {'\n'} ориентированный национальный{'\n'}  проект требует определения... </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('FirstScreen')}
           style={styles.loginScreenButton}
           underlayColor='#fff'>
          <Text style={styles.loginText} > Начать</Text>
        </TouchableOpacity>
        <Text style={styles.txt3} onPress={logout}>Выйти из приложения  </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({

  text: {
    fontSize: 36,
    fontWeight: '700',
    color: 'white',
    textAlign: 'justify',
    lineHeight: 50,
},
text1: {
    marginTop:10,
    fontSize: 16,
    color:'#a5a5a5',
},
txt3: {
  marginTop: 40,
  justifyContent: 'flex-end',
  color: 'black',
  textAlign: 'justify',
  
},
loginText:{
  color:'black',
  textAlign:'center',
  paddingLeft : 10,
  paddingRight : 10
},
loginScreenButton:{
  marginTop:30,
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 15,
  paddingHorizontal: 72,
  borderRadius: 20,
  backgroundColor:'#FFFFFF' ,
  borderColor: '#fff'
}

});
export default HomeScreen;
