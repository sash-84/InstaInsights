import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [pages, setPages] = useState([]);
  const [fullPageData, setFullPageData] = useState([]);
  const [activePostSelected, setActivePostSelected] = useState(null);
  const [comments, setComments] = useState([]);
  const [activePageSelected, setActivePageSelected] = useState(null);
  const [analyzedCommentsAllPosts, setAnalyzedCommentsAllPosts] = useState([]);
  const [sentimentData, setSentimentData] = useState(null);
  const [emotionData, setEmotionData] = useState(null);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAccessToken(null);
    setPages([]);
    setFullPageData([]);
    setActivePostSelected(null);
    setComments([]);
    setActivePageSelected(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setAnalyzedCommentsAllPosts([]);
    setSentimentData(null);
    setEmotionData(null);
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        comments,
        pages,
        accessToken,
        fullPageData,
        setActivePostSelected,
        activePostSelected,
        setComments,
        setPages,
        setAccessToken,
        setFullPageData,
        login,
        logout,
        setActivePageSelected,
        activePageSelected,
        setAnalyzedCommentsAllPosts,
        analyzedCommentsAllPosts,
        sentimentData,
        setEmotionData,
        setSentimentData,
        emotionData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);