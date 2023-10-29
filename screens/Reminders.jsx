import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet, Image } from "react-native";
import ToothBrushing from "./ToothBrushing";
import RubberBands from "./RubberBands";
import { useNavigation } from "@react-navigation/native";
import scheduleLocalNotification from "../services/RemindersService";
import logo from "../assets/logo.png";

const LOGO = logo;

function RemindersScreen() {
    const navigation = useNavigation();
  
    const handlePress = () => {
      navigation.navigate('ToothBrushing'); // Navigate to ToothBrushing screen
      //navigation.navigate('RubberBands'); // Navigate to RubberBands screen
    };
      
    return (<>
        
        <View style={styles.container}>
            <Image source={LOGO} style={styles.logo} />
            <View>
                {/* Other content */}
                <Button style= {styles.item} title="Tooth Brushing" onPress={handlePress} />
            </View>
            <View>
                <Button style= {styles.item} title="Rubber Bands" onPress={handlePress} />
            </View>
        </View>
    </>);
}
const styles = StyleSheet.create({
    container: {
        flex: 0,
        height: "100%",
        flexDirection: "column",
        backgroundColor: '#ffffff',
        justifyContent: "space-around", // Center the content vertically
        alignItems: "center", // Center the content horizontally
    },
    logo: {
        width: 100, // Set a width for the logo
        height: 100, // Set a height for the logo (you can adjust as needed)
        resizeMode: "contain", // Keep the logo's aspect ratio
        marginBottom: 20
    },
    
    button: {
        borderRadius: 15,
        color: 'white',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
}); 
export default RemindersScreen;
