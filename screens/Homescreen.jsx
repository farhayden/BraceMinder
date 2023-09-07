import  PushNotification  from "react-native-push-notification";

PushNotification.localNotification({
    channelId: "channel-id",
    title: "My Notification Title", // (optional)
    message: "My Notification Message", // (required)
    ticker: "My Notification Ticker", // (optional)
    showWhen: true, // (optional) default: true
    autoCancel: true, // (optional) default: true
    smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
    bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
    
});