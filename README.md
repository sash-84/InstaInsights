# Instagram Comments Sentiment Analysis

## 📌 Project Overview
This project analyzes the sentiment of Instagram post comments using sentiment analysis techniques. Users can fetch comments from Instagram posts and visualize the sentiment distribution using interactive charts.

## 🛠 Tech Stack
### **Frontend:** 
- ReactJS - Component-based UI
- Tailwind CSS - Styling framework
- Chart.js & React-Chartjs-2 - Data Visualization
### **Backend:** 
- Node.js & Express.js - API handling
- Axios - Fetching data from the backend
- Python (Flask/NTLK/TextBlob) - Sentiment analysis
### **APIs:** 
- Instagram Graph API
- Custom Sentiment Analysis API

## 🚀 Features
- Fetch Instagram posts and comments via API
- Perform sentiment analysis (Positive, Neutral, Negative)
- Display results using an interactive bar chart
- Responsive UI with Tailwind CSS

## 📂 Project Structure
```
instagram-sentiment-analysis/
│── backend/       # Node.js & Express backend
│── frontend/      # React frontend
│── README.md      # Project documentation
```

## 🔧 Setup Instructions
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/instagram-sentiment-analysis.git
cd instagram-sentiment-analysis
```

### 2️⃣ Backend Setup
```bash
cd backend
python app.py
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm start
```
## 🔧 Configuration
Set up an .env file in the backend with the following:
```bash
INSTGRAM_ACCESS_TOKEN = your_access_token
PORT = 5000
```

## 🎯 Usage
1. Open the frontend (http://localhost:3000 by default)
2. Authenticate with Instagram and load posts
3. Click "Show Comments" on any post to fetch and display comments
4. Click "Analyze Comments" to see sentiment distribution

## 📊 Sentiment Analysis Breakdown
- Positive (🟢) - Indicates favorable sentiment
- Neutral (🟡) - Neither positive nor negative
- Negative (🔴) - Indicates criticism or negative feedback

## 🏗️ Future Improvements
- Improve comment fetching with pagination
- Store analyzed data for historical insights
- Enhance NLP model for better accuracy

## 🤝 Contributing
Feel free to contribute by creating a pull request or opening an issue!

## 📜 License
This project is licensed under the MIT License.

<hr>

Made with ❤️ by Aditi, Prajakta and Sakshi
