import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import scheduleLocalNotification from "../services/RemindersService";
import SetReminder from "./SetReminder";

function App() {
    const [reminders, setReminders] = useState([
        { title: 'Tooth Brushing', message: '', subtext: '', bigText: '', time: '09:00', repeatTime: 1 },
        { title: 'Rubber Bands', message: '', subtext: '', bigText: '', time: '12:00', repeatTime: 1 },
        // Add more initial reminders as needed
    ]);

    // Function to schedule a reminder
    const handleScheduleReminder = (reminderIndex) => {
        const reminderToSchedule = reminders[reminderIndex];
        // Call the scheduleLocalNotification function with the reminder data
        scheduleLocalNotification(reminderToSchedule);
    };

    return (
        <View>
            {/* Render a list of reminders and pass the scheduling function */}
            {reminders.map((reminder, index) => (
                <SetReminder
                    key={index}
                    reminder={reminder}
                    onSchedule={() => handleScheduleReminder(index)}
                />
            ))}
        </View>
    );
} export default App;
