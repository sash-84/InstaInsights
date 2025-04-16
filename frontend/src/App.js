import React, {useEffect } from "react";
import axios from "axios";
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from "./pages/Dashboard";
import { useAppContext } from "./components/AppContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import PostGallery from "./components/PostGallery";
import MainLayout from "./pages/MainLayout";
import Analysis from "./components/Analysis";
import Settings from "./components/Settings";

function App() {

  const navigate = useNavigate();

  const {setAccessToken, setPages, setFullPageData, login, setAnalyzedCommentsAllPosts,fullPageData} = useAppContext();

  // Extract access token from URL or loalstorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const tokenFromUrl = params.get("access_token");

    const tokenFromStorage = localStorage.getItem("access_token");

    const accessToken = tokenFromUrl || tokenFromStorage;

    if (accessToken) {

      setAccessToken(accessToken);
      localStorage.setItem("access_token", accessToken);
      login();
      fetchUser(accessToken);
      fetchPages(accessToken);
      window.history.replaceState({}, document.title, "/"); // Remove token from URL
      navigate("/dashboard");
    }
  }, []);

  const fetchUser = async (accessToken) => {
    try {
      const res = await axios.get(`http://localhost:5000/get_user?access_token=${accessToken}`);
      const userData = res.data || [];
      localStorage.setItem("user", userData.name);
    } catch(error) {
      console.log("Error fetching pages:", error);
    }
  };

  const fetchPages = async (accessToken) => {
    try {
      const res = await axios.get(`http://localhost:5000/get_pages?access_token=${accessToken}`);
      const pagesData = res.data?.data || [];
      setPages(pagesData);
      fetchAllPageDetails(pagesData);
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  };

  const fetchAllPageDetails = async (pages) => {
    const allDetails = [];

    for (const page of pages) {
      const pageData = {
        id: page.id,
        name: page.name,
        access_token: page.access_token,
        category: page.category,
        picture: page.picture,
        instagram_account: null,
        posts: [],
      };

      try {
        const instaRes = await axios.get(
          `http://localhost:5000/get_instagram_account?access_token=${page.access_token}&page_id=${page.id}`
        );

        const igId = instaRes.data?.instagram_business_account?.id;

        if (!igId) {
          allDetails.push(pageData);
          continue;
        }

        pageData.instagram_account = {
          id: igId,
          username: instaRes.data.instagram_business_account.username,
          name: instaRes.data.instagram_business_account.name,
          profile_picture_url: instaRes.data.instagram_business_account.profile_picture_url,
        };

        const postsRes = await axios.get(
          `http://localhost:5000/get_posts?page_access_token=${page.access_token}&instagram_id=${igId}`
        );
        const posts = postsRes.data?.data || [];

        for (const post of posts) {
          const commentsRes = await axios.get("http://localhost:5000/fetch_comments", {
            params: {
              postId: post.id,
              access_token: page.access_token,
            },
          });

          const comments = commentsRes.data?.data || [];

          pageData.posts.push({
            ...post,
            comments: comments,
          });
        }

        allDetails.push(pageData);
      } catch (err) {
        console.error(`Error with page ${page.name}:`, err);
        allDetails.push(pageData);
      }
    }

    setFullPageData(allDetails);
    console.log(allDetails);
    setAnalyzedCommentsAllPosts(fullPageData.posts);
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Navbar/>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/main-layout" element={<MainLayout />} >
           <Route path="posts" element={<PostGallery />} />
           <Route path="analysis" element={<Analysis />} />
        </Route>
        <Route path="/dashboard/settings" element={<Settings />}/>
      </Routes>
    </div>
  );
} 

export default App;
{/* <h2 className="text-3xl font-bold text-[#fbb667] mt-16">Fan Engagement Insights</h2>  */}