import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
//import PushNotification from 'react-native-push-notification';
import scheduleLocalNotification from '../services/RemindersService';


const SetReminder = () => {
    const [reminders, setReminders] = useState([
        { title: 'Tooth Brushing', message: '', subtext: '', bigText: '', date: '', repeatTime: '' },
        { title: 'Rubber Bands', message: '', subtext: '', bigText: '', date: '', repeatTime: '' },
        { title: 'Clear Aligners', message: '', subtext: '', bigText: '', date: '', repeatTime: '' },
        { title: 'Retainers', message: '', subtext: '', bigText: '', date: '', repeatTime: '' },
        { title: 'Oral Habits', message: '', subtext: '', bigText: '', date: '', repeatTime: '' },
    ]);

    const [reminderTimes, setReminderTimes] = useState([
        new Date(), // Initial date and time for the first reminder
        new Date(), // Initial date and time for the second reminder
        new Date(), // Initial date and time for the third reminder
        new Date(), // Initial date and time for the fourth reminder
        new Date(), // Initial date and time for the fifth reminder
        // Add more initial dates and times for other reminders as needed
    ]);

    const handleScheduleNotification = (index) => {
        // scheduleLocalNotification(reminders[index]);
        showDateTimePicker(index);
    }

    const showDateTimePicker = (index) => {
        setCurrentReminderIndex(index);
        setShowPicker(true);
    };

    const [currentReminderIndex, setCurrentReminderIndex] = useState(null);
    const [showPicker, setShowPicker] = useState(false);

    // Function to handle the date and time picker confirm button
    const handleDateTimeConfirm = (selectedDate) => {
        if (currentReminderIndex !== null) {
          const newReminderTimes = [...reminderTimes];
          newReminderTimes[currentReminderIndex] = selectedDate;
          setReminderTimes(newReminderTimes);
        }
        setShowPicker(false);
    };
      
    return (
        <View style={{ flex: 1 }}>
            {reminders.map((reminder, index) => (
                <View key={index}>
                    <Text>{reminder.title}</Text>
                    <TextInput
                        placeholder="Message"
                        value={reminder.message}
                        onChangeText={(text) =>
                            setReminders((prevState) => {
                                const updatedReminders = [...prevState];
                                updatedReminders[index].message = text;
                                return updatedReminders;
                            })
                        }
                    />
                    {showPicker && (
                        <DateTimePicker
                            value={reminderTimes[currentReminderIndex]}
                            mode="time"
                            is24Hour={true}
                            display="spinner"
                            onChange={(event, selectedDate) => {
                                if (event.type === 'set') {
                                    handleDateTimeConfirm(selectedDate);
                                } else if (event.type === 'dismissed') {
                                    setShowPicker(false);
                                }
                            }}
                        />
                    )}
                    {/* Add more TextInput components for other reminder parameters */}
                    <TouchableOpacity onPress={() => handleScheduleNotification(index)}>
                        <View
                            style={{
                                backgroundColor: 'blue',
                                padding: 10,
                                borderRadius: 5,
                                marginTop: 10,
                            }}
                        >
                        <Text style={{ color: 'white' }}>Schedule {reminder.title}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );

}; export default SetReminder;