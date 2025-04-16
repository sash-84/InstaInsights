import React from "react";
import SentimentChart from "./SentimentChart.tsx";
import EmotionChart from "./EmotionChart.tsx";
import Insights from "./Insights.jsx";
import { useAppContext } from "./AppContext";

const Analysis = () => {

  const { sentimentData, emotionData } = useAppContext();

  console.log(sentimentData);

  return (
    <div className="py-10">
      {sentimentData && emotionData && (
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#fbb667] mb-10">
            Sentiment & Emotion Analysis
          </h2>
            <div className="flex flex-col  justify-center items-center gap-12"> {/*lg:flex-row */}
              <SentimentChart sentimentData={sentimentData} />
              <EmotionChart emotionData={emotionData} />
            </div>
            <div className="bg-gray-800 text-white rounded py-4 mb-5">
              <h4 className="font-semibold  text-2xl text-[#fbb667]">😏 Sarcasm Detection:</h4>
              <ul className="ml-5">
                <li>Sarcastic: {sentimentData.Sarcastic}</li>
                <li>Not Sarcastic: {sentimentData.NotSarcastic}</li>
              </ul>
            </div>
          <Insights sentimentData={sentimentData} emotionData={emotionData} />
        </div>
      )}
    </div>
  );
};

export default Analysis;
