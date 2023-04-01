import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  image,
  ScrollView,
  ImageBackground,
  backgroundColor,
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
import Button1 from "../components/Button";
import Loader from "../components/Loader";
import bgImage from "../../img/login3.png";



const RegistrationScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    studno: "",
    email: "",
    fullname: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    let isValid = true;

    if (!inputs.studno) {
      handleError("Пожалуйста, введите место обучения", "studno");
      isValid = false;
    }
    if (!inputs.email) {
      handleError("Пожалуйста, введите Email адрес", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Пожалуйста, введите действительный адрес электронной почты", "email");
      isValid = false;
    }
    if (!inputs.fullname) {
      handleError("Пожалуйста, введите ваше полное имя", "fullname");
      isValid = false;
    }
    if (!inputs.password) {
      handleError("Пожалуйста, введите пароль", "password");
      isValid = false;
    } else if (inputs.password.length < 8) {
      handleError("Пожалуйста, введите пароль 8 символов", "password");
      isValid = false;
    }
    if (!inputs.passwordConfirm) {
      handleError("Пожалуйста, введите Подтвердите пароль", "passwordConfirm");
      isValid = false;
    } else if (inputs.passwordConfirm !== inputs.password) {
      handleError("Подтверждение пароля не совпадает", "passwordConfirm");
      isValid = false;
    }

    if (isValid) register();
  };

  
  
  

  const register = () => {
    console.log("register!");
    console.log(inputs);

    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        AsyncStorage.setItem("userData", JSON.stringify(inputs));

        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Успех",
          textBody: "Пользователь успешно создан!",
          button: "Закрыть",
          onHide: () => {
            navigation.navigate("LoginScreen");
          },
        });
      } catch (error) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Ошибка",
          textBody: error,
          button: "Закрыть",
        });
      }
    }, 3000);
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (text, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: text }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <AlertNotificationRoot>
        <Loader visible={loading} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Button title={"загрузить фото"} />
            <Image source={{ uri:"https://sun9-40.userapi.com/impg/_5rdgpgZrkaxReMHCvGZv9mt8GXIgDqW6Yj9Vg/JKeiYDlCykk.jpg?size=1440x1436&quality=96&sign=36b2d4c3d916a0158d1c31127f8979fe&type=album" }}
                             style={styles.profileImg} />
            <Input
              iconName="user"
              placeholder="ФИО"
             onChangeText={(text) => handleOnChange(text, "fullname")}
              onFocus={() => handleError(null, "fullname")}
              error={errors.fullname}
            />
             <Input
            iconName="id-badge"
            placeholder="Место обучения"
            onChangeText={(text) => handleOnChange(text, "studno")}
            onFocus={() => handleError(null, "studno")}
            error={errors.studno}
          />
            <Input
            iconName="envelope"
            placeholder=" Email "
            onChangeText={(text) => handleOnChange(text, "email")}
            onFocus={() => handleError(null, "email")}
            error={errors.email}
          />
            <Input
            iconName="key"
            password
            placeholder=" Password"
            onChangeText={(text) => handleOnChange(text, "password")}
            onFocus={() => handleError(null, "password")}
            error={errors.password}
          />
          <Input
            iconName="key"
            password
            placeholder="Confirm your Password"
            onChangeText={(text) => handleOnChange(text, "passwordConfirm")}
            onFocus={() => handleError(null, "passwordConfirm")}
            error={errors.passwordConfirm}
          />
              
        </ScrollView>
        <View>
          <Button1 title="Зарегестрироваться" onPress={validate} />
        </View>
        <Text style={styles.Text2 } >Заполните данные1 о себе</Text>
      </AlertNotificationRoot>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3A30B2",
    borderRadius: 30,
    height: "85%",
  },
  Text2: {
    alignSelf: "center",
    color:"white",
    


  },
  scrollContainer: {
  },
  Button1: {
    marginHorizontal:50,
    color: "black",
  },
  textTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  textSubTitle: {
    fontSize: 18,
    color: "black",
    marginVertical: 5,
  },
  profileImg: {
    alignItems: 'center',
    marginHorizontal:50,
    width: 125,
    height: 125,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,

  },
  image: {
    width: 250,
    height: 250,
    alignSelf: "center",
    padding: 40,

  },
});

export default RegistrationScreen;
