import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Button } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker'; // Import the datetimepicker component
//import scheduleLocalNotification from "../services/RemindersService";
import PushNotification from 'react-native-push-notification';
//import { amTime as defaultAmTime, pmTime as defaultPmTime } from "../services/RemindersService"; // Import the constants
import logo from "../assets/logo.png";

const LOGO = logo;

function ToothBrushing() {

    const defaultAmTime = new Date();
    defaultAmTime.setHours(8); // Set AM hour (e.g., 8 AM)
    defaultAmTime.setMinutes(0); // Set AM minute (e.g., 0 minutes)

    const defaultPmTime = new Date();
    defaultPmTime.setHours(20); // Set PM hour (e.g., 8 PM)
    defaultPmTime.setMinutes(0); // Set PM minute (e.g., 0 minutes)

    const [amReminder, setAmReminder] = useState({
      title: "Tooth Brushing (AM)",
      message: "",
      time: defaultAmTime, // Default time for the AM reminder
      repeatTime: 1, // Default repeat time (you can change this)
    });
  
    const [pmReminder, setPmReminder] = useState({
      title: "Tooth Brushing (PM)",
      message: "",
      time: defaultPmTime, // Default time for the PM reminder
      repeatTime: 1, // Default repeat time (you can change this)
    });

    // New state variables for the selected times
    const [amTime, setAmTime] = useState(new Date());
    const [pmTime, setPmTime] = useState(new Date());

    const [showAmTimePicker, setShowAmTimePicker] = useState(false); // State to control the visibility of the time picker for AM reminder
    const [showPmTimePicker, setShowPmTimePicker] = useState(false); // State to control the visibility of the time picker for PM reminder
    
    const handleAmTimeChange = (event, selectedTime) => {
        if (selectedTime !== undefined) {
            setAmTime(selectedTime);
            
            const updatedAmReminder = { ...amReminder, time: selectedTime };
            setAmReminder(updatedAmReminder);
        }
        setShowAmTimePicker(false);
    };
    
    const handlePmTimeChange = (event, selectedTime) => {
        if (selectedTime !== undefined) {
            setPmTime(selectedTime);
            
            const updatedPmReminder = { ...pmReminder, time: selectedTime };
            setPmReminder(updatedPmReminder);
        }
        setShowPmTimePicker(false);
    };
    // Define the scheduleLocalNotification function here
    function scheduleLocalNotification(reminderData) {
        PushNotification.localNotificationSchedule({
            channelId: "BraceMinder-channel-id",
            title: reminderData.title,
            message: reminderData.message,
            color: "blue",
            vibrate: true,
            vibration: 300,
            foreground: true,
            date: reminderData.time,
            repeatTime: 'daily',
        });
    }
    const handleScheduleReminders = () => {
        // Call the scheduleLocalNotification function with both AM and PM reminder data
        //check if amTime and pmTime are set before scheduling
        if (amTime && pmTime) {
        scheduleLocalNotification(amReminder);
        scheduleLocalNotification(pmReminder);
        } else {
            alert("Please set both AM and PM times before scheduling reminders.");
        }
    };

    
    return (
        <View style={styles.container}>
            <Image source={LOGO} style={styles.logo} />
            <Text>Morning Tooth Brushing Reminder</Text>
            <TextInput style={styles.textInput}
                placeholder="enter reminder message"
                value={amReminder.message}
                onChangeText={(text) => setAmReminder({ ...amReminder, message: text })}
            />

            {/* Add a button to open the time picker for AM reminder */}
            <TouchableOpacity >
                <Button title="Time for AM Reminder" onPress={() => setShowAmTimePicker(true)}/>
            </TouchableOpacity>

            {showAmTimePicker && (
                <DateTimePicker
                    value={amTime || new Date()}
                    mode="time"
                    is24Hour={false}
                    display="spinner"
                    onChange={handleAmTimeChange}
                />
            )}
            <Text>Evening Tooth Brushing Reminder</Text>
            <TextInput style={styles.textInput}
                placeholder="enter reminder message"
                value={pmReminder.message}
                onChangeText={(text) => setPmReminder({ ...pmReminder, message: text })}
            />
            {showPmTimePicker && (
                <DateTimePicker
                    value={pmTime || new Date()}
                    color="blue"
                    mode="time"
                    is24Hour={false}
                    display="spinner"
                    onChange={handlePmTimeChange}
                />
            )}
            {/* Add a button to open the time picker for PM reminder */}
            <TouchableOpacity >
                <Button title='Time for PM Reminder' onPress={() => setShowPmTimePicker(true)}/>
            </TouchableOpacity>
            {/* Add more input fields for additional reminder details as needed */}
            <TouchableOpacity onPress={() => handleScheduleReminders(true)}>
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
    textInput: {
        height: 100, // Adjust the height as needed
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 20,
    },

});
export default ToothBrushing;
