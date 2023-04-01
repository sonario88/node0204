import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";
import bgImage from "../../img/login3.png";


const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = async () => {
    let isValid = true;

    if (!inputs.email) {
      handleError("Пожалуйста введите адрес электронной почты", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Пожалуйста, введите действительный адрес электронной почты", "email");
      isValid = false;
    }

    if (!inputs.password) {
      handleError("Пожалуйста, введите пароль", "password");
      isValid = false;
    } else if (inputs.password.length < 8) {
      handleError("Минимальная длина пароля 8 символов  ", "password");
      isValid = false;
    }

    if (isValid) login();
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (text, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: text }));
  };

  const login = () => {
    console.log("login!");
    console.log(inputs);

    setLoading(true);
    setTimeout(async () => {
      try {
        setLoading(false);
        let userData = await AsyncStorage.getItem("userData");
        // console.log(userData);

        if (userData) {
          userData = JSON.parse(userData);
          console.log("userData");
          console.log(userData);

          if (
            inputs.email == userData.email &&
            inputs.password == userData.password
          ) {
            navigation.navigate("HomeScreen");
            AsyncStorage.setItem(
              "userData",
              JSON.stringify({ ...userData, loggedIn: true })
            );
          } else {
            console.log("Аккаунт не найден");
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: "ОШИБКА",
              textBody: "Неправильное Имя пользователя или Пароль!",
              button: "Закрыть",
            });
          }
        } else {
          console.log("Аккаунт не найден");
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "ERROR",
            textBody: "No Account Found!",
            button: "Закрыть",
          });
        }
      } catch (error) {
        console.log("Error! " + error);
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "ERROR",
          textBody: error,
          button: "Close",
        });
      }
    }, 3000);
  };

  return (
    <View style={{ height: '100%',backgroundColor:"#f0f0f0"}}>
      <ImageBackground source={bgImage} style={{width: '100%', height: '100%',}}>
      <AlertNotificationRoot  style={styles.container}>
        <SafeAreaView>
          <Loader visible={loading}/>
          <View style={styles.viewContainer}>
          <Input
              placeholder="Username/email"
              onChangeText={(text) => handleOnChange(text, "email")}
              onFocus={() => handleError(null, "email")}
              error={errors.email}
            />
            <Input
              password
              placeholder="Password"
              onChangeText={(text) => handleOnChange(text, "password")}
              onFocus={() => handleError(null, "password")}
              error={errors.password}
            />
            <Button title="Войти" onPress={validate} />
            <Text style={styles.text}
                  onPress={() => navigation.navigate("RegistrationScreen")}> забыли пароль? 
            </Text>
            <Text
              style={styles.textRegister}
              onPress={() => navigation.navigate("RegistrationScreen")}
              >
              Нет своего аккаунта? Регистрация
            </Text>
          </View>
        
        </SafeAreaView>
      </AlertNotificationRoot>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  svContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: "center",
  },
  textTitle: {
    fontSize: 170,
    fontWeight: "bold",
    color: "black",
  },
  text: {
    fontSize: 16,
    textAlign: 'justify',
    lineHeight: 30,
    paddingVertical: 15,
    paddingHorizontal: 10,
    paddingLeft: 140,
    color: 'black',
},
text1: {
  fontSize: 16,
  textAlign: 'justify',
  lineHeight: 30,
  paddingLeft: 70,
  color: 'black',

},
  viewContainer: {
    paddingVertical: 20,
    marginTop: 350,
  },
  input:{
    borderWidth:2,
    borderRadius:12,
    borderColor: '#fff'
  },
  textRegister: {
    textAlign: "center",
    fontSize: 16,
    color: "black",
    
  },
});

export default LoginScreen;
