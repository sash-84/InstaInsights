from flask import Flask, redirect, request, jsonify
import requests
from flask_cors import CORS
from textblob import TextBlob
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from datetime import datetime, timedelta
from collections import defaultdict
from transformers import pipeline
import emoji
import re

app = Flask(__name__)
CORS(app, resources={r"/*":{"origin":"*"}})  # Allow frontend to communicate with backend

# In-memory storage for fan engagement tracking
fan_engagement = defaultdict(lambda: {"count": 0, "last_commented": None})

# Meta App Credentials (Replace with your actual values)
CLIENT_ID = "999489145463251"
CLIENT_SECRET = "1681862272b1af2e62528c14cb9d791e"
REDIRECT_URI = "http://localhost:5000/auth/callback"

# Facebook OAuth URL
AUTH_URL = f"https://www.facebook.com/v18.0/dialog/oauth?client_id=999489145463251&redirect_uri={REDIRECT_URI}&scope=instagram_basic,instagram_manage_comments,pages_show_list&response_type=code"

@app.route("/")
def home():
    """Redirect user to Instagram Login"""
    return redirect(AUTH_URL)

@app.route("/auth/callback")
def auth_callback():
    """Handle OAuth Callback & Exchange Code for Access Token"""
    code = request.args.get("code")
    if not code:
        return jsonify({"error": "No authorization code received"}), 400

    # Exchange code for access token
    token_url = "https://graph.facebook.com/v18.0/oauth/access_token"
    params = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "redirect_uri": REDIRECT_URI,
        "code": code,
    }

    response = requests.get(token_url, params=params)

    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch access token", "details": response.json()}), 400
        
    data = response.json()
    if "access_token" in data:
        access_token = data["access_token"]
        frontend_redirect = f"http://localhost:3000?access_token={access_token}"
        return redirect(frontend_redirect)
    else:
        return jsonify(data), 400

# Backend: Get Facebook Pages
@app.route('/get_pages')
def get_pages():
    access_token = request.args.get("access_token")
    url = "https://graph.facebook.com/v18.0/me/accounts"
    params = {
        "access_token": access_token,
        "fields": "access_token,id,name,category,picture{url}"
    }
    
    response = requests.get(url, params=params)
    return jsonify(response.json())

@app.route('/get_instagram_account')
def get_instagram_account():
    page_access_token = request.args.get("access_token")

    if not page_access_token:
        return jsonify({"error": "Access token is required"}), 400

    url = f"https://graph.facebook.com/v18.0/me"
    params = {
        "access_token": page_access_token,
        "fields": "id,instagram_business_account"
    }
    response = requests.get(url, params=params)
    return jsonify(response.json())



# Backend: Get Instagram Posts
@app.route('/get_posts')
def get_posts():
    page_access_token = request.args.get("page_access_token")
    instagram_id = request.args.get("instagram_id")  # Instagram Business Account ID

    if not page_access_token or not instagram_id:
        return jsonify({"error": "Missing access token or Instagram Business ID"}), 400

    url = f"https://graph.facebook.com/v18.0/{instagram_id}/media"
    params = {
        "access_token": page_access_token,
        "fields": "id,caption,media_url,permalink"
    }

    response = requests.get(url, params=params)
    return jsonify(response.json())


@app.route("/fetch_comments")
def fetch_comments():
    postId = request.args.get("postId")
    access_token = request.args.get("access_token")

    if not access_token or not postId:
        return jsonify({"error": "Missing access token or Post ID"}), 400

    url = f"https://graph.facebook.com/v18.0/{postId}/comments"
    params = {
        "access_token": access_token,
        "fields": "id,text,username"
    }

    response = requests.get(url, params=params)

    if response.status_code != 200:
        return {"error": "Failed to fetch comments", "details": response.text}

    return jsonify(response.json())


#Sentiment Analysis

nltk.download("vader_lexicon")

# Load Pre-trained Emotion Analysis Model
emotion_model = pipeline("text-classification", model="joeddav/distilbert-base-uncased-go-emotions-student")

sentiment_model = pipeline("sentiment-analysis", model="cardiffnlp/twitter-roberta-base-sentiment")

def preprocess_text(text):
    text = text.lower()  # Convert to lowercase
    text = re.sub(r"http\S+|www\S+", "", text)  # Remove URLs
    # Remove unwanted characters while keeping spaces, alphanumeric characters, and emojis
    text = re.sub(r"[^a-zA-Z0-9\s.,!?️\U0001F600-\U0001F64F\U0001F300-\U0001F5FF\U0001F680-\U0001F6FF\U0001F700-\U0001F77F\U0001F780-\U0001F7FF\U0001F800-\U0001F8FF\U0001F900-\U0001F9FF\U0001FA00-\U0001FA6F\U0001FA70-\U0001FAFF]", "", text)
    
    # Return the cleaned text
    return text

def get_sentiment(comment_text):
    results = sentiment_model(comment_text)
    sentiment_label = results[0]['label']
    return "Positive" if sentiment_label == "LABEL_2" else "Negative" if sentiment_label == "LABEL_0" else "Neutral"

def analyze_emotion(text):
    """Analyze emotions from text using Google's GoEmotions model"""
    result = emotion_model(text)
    # sorted_result = sorted(result[0], key=lambda x: x['score'], reverse=True)
    return result[0]['label']  # Highest scoring emotion

def emoji_to_text(emoji_text):
    """Convert emoji to text description"""
    return emoji.demojize(emoji_text).replace("_", " ")

# Initialize VADER Sentiment Analyzer
sia = SentimentIntensityAnalyzer()

@app.route("/analyze_comments", methods=["POST"])
def analyze_comments():

    data = request.json  # Get JSON data from request
    comments = data.get("comments", [])  # Extract comments array

    if not comments:
        return jsonify({"error": "No comments provided"}), 400

    # Initialize sentiment and emotion counters
    sentiment_counts = {"Positive": 0, "Negative": 0, "Neutral": 0}
    analyzed_comments = []

    for comment in comments:
        comment_text = comment.get("text", "")

        comment_text = preprocess_text(comment_text)
        text_with_emojis = emoji_to_text(comment_text)  # Convert emojis to words


        # 🟢 Sentiment Analysis (VADER + TextBlob)
        vader_score = sia.polarity_scores(comment_text)["compound"]
        blob_score = TextBlob(comment_text).sentiment.polarity
        sentiment_score = (vader_score + blob_score)/2

        sentiment = get_sentiment(comment_text)
        emotion = analyze_emotion(text_with_emojis)  # Detect dominant emotion
        sentiment_counts[sentiment] += 1

        # Store analyzed comment
        analyzed_comments.append({
            "id": comment.get("id"),
            "text": comment_text,
            "username": comment.get("username"),
            "created_time":comment.get("created_time"),
            "sentiment": sentiment,
            "emotion": emotion,
        })

    return jsonify({
        "message": "Sentiment and emotion analysis completed",
        "data": analyzed_comments,
        "sentiment_counts": sentiment_counts,  # Send counts for visualization
    })

@app.route("/fan_engagement_insights")
def fan_engagement_insights():
    """Analyze fan engagement across all posts by processing Instagram comments."""

    # Get access token from request
    access_token = request.args.get("access_token")
    
    if not access_token:
        return jsonify({"error": "Missing access token"}), 400

    #Get Instagram Business ID
    page_url = f"https://graph.facebook.com/v18.0/me/accounts"
    page_params = {"access_token": access_token, "fields": "id,instagram_business_account"}
    
    page_response = requests.get(page_url, params=page_params)
    page_data = page_response.json()

    if "error" in page_data or "data" not in page_data or not page_data["data"]:
        return jsonify({"error": "Failed to fetch Instagram Business Account"}), 400

    instagram_id = page_data["data"][0].get("instagram_business_account", {}).get("id")

    if not instagram_id:
        return jsonify({"error": "Instagram Business Account not found"}), 400

    # Step 1: Fetch all posts
    posts_url = f"https://graph.facebook.com/v18.0/{instagram_id}/media"
    posts_params = {"access_token": access_token, "fields": "id,caption"}

    posts_response = requests.get(posts_url, params=posts_params)
    posts_data = posts_response.json().get("data", [])

    if posts_response.status_code != 200 or not posts_data:
        return jsonify({"error": "Failed to fetch posts", "details": posts_response.json()}), 400

    fan_activity = defaultdict(lambda: {"count": 0, "sentiment": []})

    # Step 2: Fetch comments for each post
    for post in posts_data:
        post_id = post.get("id")
        comments_url = f"https://graph.facebook.com/v18.0/{post_id}/comments"
        comments_params = {"access_token": access_token, "fields": "id,text,from"}

        comments_response = requests.get(comments_url, params=comments_params)
        comments_data = comments_response.json().get("data", [])

        if comments_response.status_code != 200:
            continue  # Skip if comments couldn't be fetched

        # Step 3: Process comments and aggregate engagement data
        for comment in comments_data:
            username = comment.get("from", {}).get("username", "Anonymous")
            comment_text = comment.get("text", "")

            # Compute sentiment if comment has text
            sentiment_score = sia.polarity_scores(comment_text)["compound"] if comment_text else 0

            fan_activity[username]["count"] += 1
            fan_activity[username]["sentiment"].append(sentiment_score)

    # Step 4: Extract engagement insights
    top_fans = sorted(fan_activity.items(), key=lambda x: x[1]["count"], reverse=True)[:5]
    loyal_fans = sorted(fan_activity.items(), key=lambda x: sum(x[1]["sentiment"]) / len(x[1]["sentiment"]) if x[1]["sentiment"] else 0, reverse=True)[:5]
    # Fix: Accessing "count" correctly
    suggested_engagement = [fan[0] for fan in loyal_fans if fan[1].get("count", 0) > 1]

    insights = {
        "top_fans": [{"username": fan[0], "comment_count": fan[1]["count"]} for fan in top_fans],
        "loyal_fans": [{"username": fan[0], "avg_sentiment": sum(fan[1]["sentiment"]) / len(fan[1]["sentiment"]) if fan[1]["sentiment"] else 0} for fan in loyal_fans],
        "suggested_engagement": [{"username": fan} for fan in suggested_engagement] if suggested_engagement else "No suggested engagement found."
    }

    return jsonify(insights)

if __name__ == "__main__":
    app.run(port=5000, debug=True)