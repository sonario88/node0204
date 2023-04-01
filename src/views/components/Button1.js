import { Text, TouchableOpacity, StyleSheet } from "react-native";

const Button1 = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button1}
      activeOpacity={0.7}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems:"center",
    marginHorizontal: 50,
    marginVertical:30,
    borderWidth:2,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius:23,
    backgroundColor:'#FFFFFF',

    borderColor: '#fff'
  },
  title: {
    color: "#505050",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Button;