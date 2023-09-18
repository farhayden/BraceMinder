import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native";
import ToothBrushing from "./ToothBrushing";
import { useNavigation } from "@react-navigation/native";
import scheduleLocalNotification from "../services/RemindersService";

function RemindersScreen() {
    const navigation = useNavigation();
  
    const handlePress = () => {
      navigation.navigate('ToothBrushing'); // Navigate to ToothBrushing screen
    };
      
    return (
        <View>
            {/* Other content */}
            <Button title="Set Tooth Brushing Reminder" onPress={handlePress} />
        </View>
    );
}
const styles = StyleSheet.create({
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
