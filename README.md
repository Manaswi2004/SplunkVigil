# 🛡 SplunkVigil: Insider Threat Detection System

A modern, AI-powered web application to detect, score, and explain suspicious user activity from logs. Built for security teams, hackathons, and real-world demos.

---

## 🚀 Features
- Paste or simulate user log data in a beautiful React UI
- Analyze logs for insider threats using OpenAI (with local fallback)
- Risk scoring: *LOW, **MEDIUM, **HIGH*
- Color-coded, clear results and explanations
- Responsive, professional UI
- Easy to extend with your own rules or ML models
- Custom favicon/icon included (see frontend/favicon.ico)

---

## 🛠 Tech Stack
- *Frontend:* React (Create React App)
- *Backend:* Node.js + Express
- *AI:* OpenAI API (GPT-3.5-turbo) with local fallback logic

---

## 📝 Setup Instructions

### 1. *Clone the Repository*
sh
git clone https://github.com/Manaswi2004/SplunkVigil.git
cd SplunkVigil

### 2. *Backend Setup*
sh
cd backend
npm install


#### **Create a .env file in the backend/ folder:**

OPENAI_API_KEY=sk-...your-key-here...

- Get your API key from https://platform.openai.com/api-keys
- If you run out of quota, the app will still work using local scoring logic.

### 3. *Frontend Setup*
sh
cd ../frontend
npm install


---

## ▶ Running the App

### *Start the Backend*
sh
cd backend
node server.js

- Or use npx nodemon server.js for auto-reload.
- The backend runs on [http://localhost:5000](http://localhost:5000)

### *Start the Frontend*
sh
cd frontend
npm start

- The frontend runs on [http://localhost:3000](http://localhost:3000)
- All API requests are automatically proxied to the backend.
- The browser tab will show the SplunkVigil icon (see frontend/favicon.ico).

---

## 🧪 Usage
1. Paste or type your log data in the textarea.
2. Click *Analyze*.
3. See the risk level and explanation instantly.

### *Sample Logs*
Paste these to test:

#### High Risk (Unauthorized Access)

2024-07-18 11:05:22, user: eve, action: login, ip: 10.0.0.5, location: US
2024-07-18 11:06:00, user: eve, action: access_file, file: /restricted/secret.docx, status: unauthorized
2024-07-18 11:06:30, user: eve, action: logout


#### Medium Risk

2024-07-18 14:05:10, user: alice, action: login, ip: 192.168.1.10, location: US
2024-07-18 14:06:00, user: alice, action: access_file, file: /docs/project1.docx, bytes: 6000
2024-07-18 14:07:00, user: alice, action: access_file, file: /docs/project2.docx, bytes: 8000
2024-07-18 14:08:00, user: alice, action: logout


#### Low Risk

2024-07-18 09:12:34, user: carol, action: login, ip: 192.168.1.20, location: US
2024-07-18 09:15:02, user: carol, action: access_file, file: /docs/notes.txt, bytes: 1200
2024-07-18 09:20:45, user: carol, action: logout


---

## 🛠 Troubleshooting
- *500 Internal Server Error?*
  - Check your OpenAI API key and quota.
  - If OpenAI is down or quota is exceeded, the app will use local scoring.
- *Frontend not connecting?*
  - Make sure both backend and frontend are running.
  - The proxy is set in frontend/package.json.
- *Change the port?*
  - Edit PORT in backend/server.js and update the proxy in frontend/package.json if needed.

---

## 🤝 Contributing
- Fork the repo, make your changes, and submit a pull request!
- Ideas for new rules, ML models, or UI improvements are welcome.

---

## 📄 License
MIT

---

## 🙏 Credits
- Built with ❤ for Splunk Build-a-thon and security enthusiasts.
- Powered by OpenAI and React.
