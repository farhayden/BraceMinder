import PushNotification from 'react-native-push-notification';

function scheduleLocalNotification() {

    PushNotification.localNotificationSchedule({
        channelId: "BraceMinder-channel-id",
        title: "Tooth Brushing", // (optional)
        message: "My Notification Message", // (required)
        color: "red",
        vibrate: true,
        vibration: 300,
        subtext: "This is a subtext",
        bigText: "This is a place holder for tooth brushing reminder",
        date: selectedTime,
        repeatTime: 'daily',
    });
} export default scheduleLocalNotification;