import { FlatList, StyleSheet, Text, View, Button, Image } from "react-native";

import logo from "../assets/logo.png";

const LOGO = logo;

const HomeScreen = () => {
    return (
      <View style={styles.container}>
        <Image source={LOGO} style={styles.logo} />
        <Text style={styles.text}>
          The app is the ultimate companion of your orthodontic journey, whether
          you're using braces or clear aligners. 
          </Text>
          <Text style={styles.text}>
          The app combines intuitive
          reminders and progress tracking, making your path to a perfect smile
          smoother than ever before. 
          </Text>
          <Text style={styles.text}>
          Embrace orthodontics with confidence and
          achieve the smile you've always dreamed of.
        </Text>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center", // Center the content vertically
      alignItems: "center", // Center the content horizontally
      backgroundColor: "white",
    },
    logo: {
      width: 100, // Set a width for the logo
      height: 100, // Set a height for the logo (you can adjust as needed)
      resizeMode: "contain", // Keep the logo's aspect ratio
    },
    item: {
      padding: 10,
      height: 50,
      flexDirection: "row",
      alignItems: "center",
      padding: 0,
      height: 50,
      justifyContent: "center",
    },
    text: {
      fontSize: 16,
      lineHeight: 24,
      textAlign: "center",
      maxWidth: "80%",
      marginTop: 10,
      marginBottom: 10 // Add margin to separate paragraphs
    }
});

export default HomeScreen;
  