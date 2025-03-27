import React from "react";

const Insights = ({ sentimentData, emotionData }) => {
  if (!sentimentData || !emotionData) return null;

  const { Positive, Negative, Neutral } = sentimentData;

  // Determine dominant sentiment
  const totalSentiments = Positive + Negative + Neutral;
  const dominantSentiment =
    Positive > Negative && Positive > Neutral
      ? "Positive"
      : Negative > Positive && Negative > Neutral
      ? "Negative"
      : "Neutral";

  // Find dominant emotion
  const dominantEmotion = Object.entries(emotionData).reduce(
    (max, entry) => (entry[1] > max[1] ? entry : max),
    ["None", 0]
  )[0];

  return (
    <div className="bg-gray-800 text-white p-6 mt-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-[#fbb667] mb-4">🔍 Insights</h2>

      <p className="text-lg">
        📊 The majority of comments show a **{dominantSentiment}** sentiment.
      </p>
      <p className="text-lg">
        😃 The most expressed emotion is **{dominantEmotion}**.
      </p>

      {Negative > Positive && (
        <p className="text-lg text-red-400">
          🚨 Many users expressed negativity. Consider addressing concerns.
        </p>
      )}

      {Positive > Negative && (
        <p className="text-lg text-green-400">
          🎉 Most users have a positive outlook! Keep engaging with them.
        </p>
      )}
    </div>
  );
};

export default Insights;
