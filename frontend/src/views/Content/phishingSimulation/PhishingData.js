const phishingEmails = [
    {
        id: 1,
        sender: "Amazon Support",
        subject: "Your account has been suspended",
        body: "Dear Customer, Your Amazon account has been suspended due to suspicious activity. Click here to verify your account.",
        isPhishing: true,
        explanation: "This email uses scare tactics and asks you to click a link, a common phishing technique."
    },
    {
        id: 2,
        sender: "Google Security",
        subject: "New login from unrecognized device",
        body: "Your Google account was accessed from a new device. If this was you, no further action is required. If not, click here to secure your account.",
        isPhishing: true,
        explanation: "Although it seems legit, it asks you to click a link without verifying it's from Google."
    },
    {
        id: 3,
        sender: "Your Bank",
        subject: "Transaction Alert",
        body: "A recent transaction on your account exceeds your set limit. Log into your account to view details.",
        isPhishing: false,
        explanation: "This email does not have any suspicious links or requests, it's a legitimate alert from your bank."
    }
];

export default phishingEmails;
