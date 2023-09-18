import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker'; // Import the datetimepicker component
import scheduleLocalNotification from "../services/RemindersService";
import logo from "../assets/logo.png";

const LOGO = logo;

function ToothBrushing() {
    const [amReminder, setAmReminder] = useState({
      title: "Tooth Brushing (AM)",
      message: "",
      subtext: "",
      bigText: "",
      time: new Date(), // Default time for the AM reminder
      repeatTime: 1, // Default repeat time (you can change this)
    });
  
    const [pmReminder, setPmReminder] = useState({
      title: "Tooth Brushing (PM)",
      message: "",
      subtext: "",
      bigText: "",
      time: new Date(), // Default time for the PM reminder
      repeatTime: 1, // Default repeat time (you can change this)
    });

    const [showTimePicker, setShowTimePicker] = useState(false); // State to control the visibility of the time picker

    const handleTimeChange = (event, selectedTime) => {
        if (selectedTime !== undefined) {
        const updatedAmReminder = { ...amReminder, time: selectedTime };
        setAmReminder(updatedAmReminder);

        const updatedPmReminder = { ...pmReminder, time: selectedTime };
        setPmReminder(updatedPmReminder);
        }

        setShowTimePicker(false);
    };
    
    const handleScheduleReminders = () => {
        // Call the scheduleLocalNotification function with both AM and PM reminder data
        scheduleLocalNotification(amReminder);
        scheduleLocalNotification(pmReminder);
    };

    
    return (
        <View style={styles.container}>
            <Image source={LOGO} style={styles.logo} />
            <Text>Morning Tooth Brushing Reminder</Text>
            <TextInput
                placeholder="Message"
                value={amReminder.message}
                onChangeText={(text) => setAmReminder({ ...amReminder, message: text })}
            />

            {/* Add a button to open the time picker for AM reminder */}
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                <Text>Set Time for Morning Reminder</Text>
            </TouchableOpacity>

            {showTimePicker && (
                <DateTimePicker
                    value={amReminder.time}
                    mode="time"
                    is24Hour={false}
                    display="clock"
                    onChange={handleTimeChange}
                    selectedTime={amReminder.time}
                />
            )}
            <Text>Evening Tooth Brushing Reminder</Text>
            <TextInput
                placeholder="Message"
                value={amReminder.message}
                onChangeText={(text) => setAmReminder({ ...pmReminder, message: text })}
            />
            {showTimePicker && (
                <DateTimePicker
                    value={pmReminder.time}
                    mode="time"
                    is24Hour={false}
                    display="clock"
                    onChange={handleTimeChange}
                />
            )}
            {/* Add a button to open the time picker for AM reminder */}
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                <Text>Set Time for Evening Reminder</Text>
            </TouchableOpacity>
            {/* Add more input fields for additional reminder details as needed */}
            <TouchableOpacity onPress={handleScheduleReminders}>
                <View
                    style={{
                        backgroundColor: "blue",
                        padding: 10,
                        borderRadius: 5,
                        marginTop: 10,
                    }}
                >
                    <Text style={{ color: "white" }}>Schedule Reminders</Text>
                </View>
            </TouchableOpacity>
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
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around', // This already makes sure there's space between items
      padding: 15,
      width: '100%', // Use full width of the container 
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
    buttonText: {
      color: 'white',
      fontSize: 20,
    },

});
export default ToothBrushing;
