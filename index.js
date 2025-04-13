require("dotenv").config();
const axios = require("axios");
const schedule = require("node-schedule");

// Telegram config
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Define target price alerts (you can edit these)
const priceTargets = [
  { type: "above", value: 60 },
  { type: "below", value: 40 },
];

// Optional: Custom round logic (not used in this version, but included)
function customRound(price) {
  const decimal = price - Math.floor(price);
  return decimal < 0.5 ? Math.floor(price) : Math.ceil(price);
}

// Send Telegram message
async function sendTelegramMessage(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  try {
    await axios.post(url, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    });
    console.log("✅ Telegram alert sent:", message);
  } catch (error) {
    console.error("Telegram error:", error.response?.data || error.message);
  }
}

let lastPrice = null; // store last price in memory

async function checkPrice() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=pi-network&vs_currencies=inr"
    );
    const fetchedPrice = response.data["pi-network"]?.inr;
    const price = customRound(fetchedPrice);
    if (!price) throw new Error("Price not available");

    console.log(`Current Pi price: ₹${price}`);

    if (lastPrice !== price) {
      for (const target of priceTargets) {
        const key = `${target.type}_${target.value}`;
        let shouldNotify = false;

        if (target.type === "above") {
          shouldNotify = price >= target.value;
        } else if (target.type === "below") {
          shouldNotify = price <= target.value;
        }

        if (shouldNotify) {
          const message = `📢 ALERT: Pi Coin just crossed ${target.type} ₹${target.value}! Current: ₹${price}`;
          await sendTelegramMessage(message);
        }
      }
    }

    // Store the current price in memory
    lastPrice = price;
  } catch (error) {
    console.error("Price check error:", error.message);
  }
}

// Schedule: run every 5 minutes
schedule.scheduleJob("*/3 * * * *", checkPrice);
checkPrice(); // Run once immediately

console.log("🚀 Telegram-only Pi Coin tracker started...");

// Keep the bot running
// setInterval(() => {}, 24 * 60 * 60 * 1000);
