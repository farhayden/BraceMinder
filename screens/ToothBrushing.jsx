import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker'; // Import the datetimepicker component
import scheduleLocalNotification from "../services/RemindersService";

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
        <View>
            <Text>Morning Tooth Brushing Reminder</Text>
            <TextInput
                placeholder="Message"
                value={amReminder.message}
                onChangeText={(text) => setAmReminder({ ...amReminder, message: text })}
            />

            {/* Add a button to open the time picker for AM reminder */}
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                <Text>Set Time for Reminder</Text>
            </TouchableOpacity>

            {showTimePicker && (
                <DateTimePicker
                    value={amReminder.time}
                    mode="time"
                    is24Hour={true}
                    display="clock"
                    onChange={handleTimeChange}
                />
            )}

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

export default ToothBrushing;
