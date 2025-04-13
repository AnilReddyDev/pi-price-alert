# 📈 Pi Coin Telegram Price Alert Bot

A simple Node.js app that tracks Pi Coin price in INR and alerts you on Telegram when the price crosses your defined thresholds.

---

## 💡 Features

- ✅ Alerts when Pi Coin price crosses **above or below** target values
- ✅ Custom rounding logic for price precision (e.g., 65.48 → 65, 66.56 → 67)
- ✅ Avoids duplicate alerts unless price changes again
- ✅ Uses [CoinGecko API](https://www.coingecko.com/en/api)
- ✅ Sends notifications via Telegram Bot
- ✅ Checks price every **3 minutes** using `node-schedule`
- ✅ Lightweight and free to deploy on services like Render

---

## ⚙️ Setup Instructions

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/AnilReddyDev/pi-price-alert.git
cd pi-price-alert
npm install
```

### 2. Configure Environment Variables

Create a .env file:

```bash
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

To get these:
-Create a bot via @BotFather
-Get your chat ID via getUpdates:

```bash
https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates
```

### 3. Set Price Targets

Edit the priceTargets array in index.js to change your alerts:

```bash
const priceTargets = [
  { type: "above", value: 60 },
  { type: "below", value: 40 },
];
```

### 4. Run Locally

```bash
npm start
```

### Example Telegram Alert

```yaml
📢 ALERT: Pi Coin just crossed above ₹60! Current: ₹61
```

### 🤝 Contributions

Feel free to open issues or pull requests if you want to improve this project.
