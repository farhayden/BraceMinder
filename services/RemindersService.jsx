import PushNotification from 'react-native-push-notification';

function scheduleLocalNotification() {

    PushNotification.localNotificationSchedule({
        channelId: "BraceMinder-channel-id",
        title: "Tooth Brushing", // (optional)
        message: "My Notification Message", // (required)
        color: "blue",
        vibrate: true,
        vibration: 300,
        subtext: "This is a subtext",
        bigText: "",
        date: new Date,
        repeatTime: 'daily',
    });
} export default scheduleLocalNotification;