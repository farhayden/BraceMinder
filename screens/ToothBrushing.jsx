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
      message: "please brush your teeth",
      time: defaultAmTime, // Default time for the AM reminder
      repeatTime: 1, // Default repeat time (you can change this)
    });
  
    const [pmReminder, setPmReminder] = useState({
      title: "Tooth Brushing (PM)",
      message: "Please brush your teeth",
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
            repeatType: 'day',
            repeatTime: 1,
        });
    }
    const handleScheduleReminders = () => {
        // const currentTime = new Date(); // Get the current time
        // // Call the scheduleLocalNotification function with both AM and PM reminder data
        // //check if amTime and pmTime are set before scheduling
        // if (amTime && pmTime) {
        // scheduleLocalNotification(amReminder);
        // scheduleLocalNotification(pmReminder);
        // } else {
        //     alert("Please set both AM and PM times before scheduling reminders.");
        // }
        const currentTime = new Date();

        // Calculate the AM and PM times for the next day if the selected time has passed
        const nextAmTime = amTime < currentTime ? new Date(amTime.getTime() + 24 * 60 * 60 * 1000) : amTime;
        const nextPmTime = pmTime < currentTime ? new Date(pmTime.getTime() + 24 * 60 * 60 * 1000) : pmTime;

        setAmTime(nextAmTime);
        setPmTime(nextPmTime);

        const updatedAmReminder = { ...amReminder, time: nextAmTime };
        const updatedPmReminder = { ...pmReminder, time: nextPmTime };

        scheduleLocalNotification(updatedAmReminder);
        scheduleLocalNotification(updatedPmReminder);
    };

    
    return (
        <View style={styles.container}>
            <Image source={LOGO} style={styles.logo} />
            {/* Add a button to open the time picker for AM reminder */}
            <TouchableOpacity >
                <View style={styles.button}>
                    <Button style={styles.button} title="Set Morning Reminder" onPress={() => setShowAmTimePicker(true)}/>
                </View>
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
                <View style={styles.button}>
                    <Button style={styles.button} title='Set Evening Reminder' onPress={() => setShowPmTimePicker(true)}/>
                </View>
            </TouchableOpacity>
            {/* Add more input fields for additional reminder details as needed */}
            <TouchableOpacity onPress={() => handleScheduleReminders(true)}>
                <View
                    style={{
                        backgroundColor: "blue",
                        padding: 10,
                        borderRadius: 5,
                        marginTop: 50,
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
          marginBottom: 5,
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
export default ToothBrushing;
