import React from 'react'

const Works = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-900 text-center text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold mb-12 text-[#fbb667]">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              step: "1. Log In",
              description: "Connect your Instagram account.",
              image:
                "https://img.freepik.com/premium-vector/free-vector-instagram-social-media-login-screen-page-template_634294-168.jpg?w=826",
            },
            {
              step: "2. Select Post",
              description: "Choose the Instagram post to analyze.",
              image:
                "https://img.freepik.com/free-vector/influencer-concept-landing-page_52683-22684.jpg?t=st=1742477670~exp=1742481270~hmac=f87cc3a66eaa380b8508de640456b0fc8627bcb0900a844be031728d2f07d080&w=826",
            },
            {
              step: "3. Get Insights",
              description: "View sentiment reports instantly.",
              image:
                "https://img.freepik.com/free-psd/3d-render-marketing-sale-background_23-2151665132.jpg?t=st=1742477519~exp=1742481119~hmac=75f5e2e5fa12573511701fe17fa1ba5826a818bbe371750d0bed8ab398c11ea2&w=1380",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:border-[#fbb667]"
            >
              <h3 className="text-2xl font-semibold text-[#fbb667] mb-3">
                {item.step}
              </h3>
              <p className="text-gray-300 text-lg mb-4">{item.description}</p>
              <img
                src={item.image}
                alt="Loading..."
                className="rounded-lg w-full h-[400px] object-cover shadow-md"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
