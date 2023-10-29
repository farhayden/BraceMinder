//
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Button, Picker } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from 'react-native-push-notification';
import logo from "../assets/logo.png";

const LOGO = logo;

function RubberBands() {

    // Declaration of the state variables
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [timeFrame, setTimeFrame] = useState(1); // Default time frame is 1 hour

    const handleStartDateChange = (event, selectedDate) => {
        if (selectedDate !== undefined) {
            setStartDate(selectedDate);
        }
    };

    const handleEndDateChange = (event, selectedDate) => {
        if (selectedDate !== undefined) {
            setEndDate(selectedDate);
        }
    };
    
}