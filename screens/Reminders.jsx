import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet, Switch, Image } from "react-native";
import ToothBrushing from "./ToothBrushing";
import { useNavigation } from "@react-navigation/native";
import scheduleLocalNotification from "../services/RemindersService";
import logo from "../assets/logo.png";
import tasks from "../data/tasks";

const LOGO = logo;

function RemindersScreen() {
    const navigation = useNavigation();
  
    const handlePress = () => {
      navigation.navigate('ToothBrushing'); // Navigate to ToothBrushing screen
    };
      
    return (
        <View style={styles.container}>
            {/* Other content */}
            <Button style= {styles.item} title="Tooth Brushing" onPress={handlePress} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
        justifyContent: "center", // Center the content vertically
        alignItems: "center", // Center the content horizontally
        
    },
    logo: {
        width: 100, // Set a width for the logo
        height: 100, // Set a height for the logo (you can adjust as needed)
        resizeMode: "contain", // Keep the logo's aspect ratio
        marginBottom: 20
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        width: 200,
        backgroundColor: "#f7f7f7",
        color: 'black', 
        borderWidth: 1,   
        borderColor: 'black',
        borderRadius: 25, // Rounded edges
        marginBottom: 10, // Gap between items
        textAlign: 'center',
    
    },
}); 
export default RemindersScreen;
