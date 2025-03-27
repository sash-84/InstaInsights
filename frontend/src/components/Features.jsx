import React from "react";

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-900 text-white text-center">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold mb-12 text-[#fbb667]">
          Why Use Our Sentiment Analyzer?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Feature Cards */}
          {[
            {
              title: "AI-Powered Analysis",
              description:
                "Detect emotions in comments instantly. Gain valuable insights to enhance engagement. Make data-driven decisions with confidence.",
            },
            {
              title: "Real-Time Insights",
              description:
                "Get instant sentiment reports. Track audience reactions as they happen. Identify trends and optimize your content strategy.",
            },
            {
              title: "Instagram Integration",
              description:
                "Fetch and analyze comments seamlessly. Connect your account with a few clicks. Gain deep insights and improve engagement.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:border-[#fbb667]"
            >
              <h3 className="text-2xl font-semibold text-[#fbb667] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        
        </div>
      </div>
    </section>
  );
};

export default Features;
