import arcjet, { detectBot, shield, validateEmail } from "@arcjet/next";

const aj = arcjet({
    key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
    rules: [
        // Shield protects your app from common attacks e.g. SQL injection
        validateEmail({
            mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
            // block disposable, invalid, and email addresses with no MX records
            block: ["DISPOSABLE", "NO_MX_RECORDS"], // we assue the email is in valid form 
        }),
    ],
});

export { aj };