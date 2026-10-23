
const SMS8_API_KEY = process.env.SMS8_API_KEY;

async function sendSMS(phone, message) {
  if (!SMS8_API_KEY) {
    throw new Error("SMS8_API_KEY is missing from .env");
  }

  if (!phone) {
    throw new Error("User phone number is missing");
  }

  const response = await fetch(
    "https://app.sms8.io/services/send.php",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        key: SMS8_API_KEY,
        number: phone,
        message,
      }),
    }
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.error?.message || "SMS8 failed to send SMS"
    );
  }

  console.log("[SMS] Message accepted by SMS8:", phone);
  return result;
}

module.exports = { sendSMS };
