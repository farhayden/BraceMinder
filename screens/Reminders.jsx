import React, { useState } from "react";
import scheduleLocalNotification from "../services/RemindersService";
import SetReminder from "./SetReminder";

function App() {
    const [reminders, setReminders] = useState([
        { title: 'Tooth Brushing', message: '', subtext: '', bigText: '', time: '09:00', repeatTime: 1 },
        { title: 'Rubber Bands', message: '', subtext: '', bigText: '', time: '12:00', repeatTime: 1 },
        // Add more initial reminders as needed
    ]);
}
