import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import ArticleImage from "./ArticleImage";
import "./NewsSwiper.css";

const NewsPage = ({ news, goToArticle }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showFullArticle, setShowFullArticle] = useState(false);
  const containerRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const ITEM_HEIGHT = 238; // Height of each article item

  if (!news?.length) return null;
  const [mainArticle, ...otherNews] = news;

  const handleNext = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop += ITEM_HEIGHT;
      if (container.scrollTop >= otherNews.length * ITEM_HEIGHT) {
        container.scrollTop = 0; // Restart from the beginning
      }
    }
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowFullArticle(false); // Reset to only show description when a new article is selected
  };

  // Start auto-scroll
  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll(); // Clean up on unmount
  }, []);

  const startAutoScroll = () => {
    stopAutoScroll(); // Clear any existing interval
    scrollIntervalRef.current = setInterval(handleNext, 3000); // Scroll every 3 seconds
  };

  const stopAutoScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  const toggleArticleView = () => {
    setShowFullArticle(!showFullArticle);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-8">
      {/* Main Article */}
      <main className="flex-grow md:w-2/3">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-[400px] overflow-hidden">
            <ArticleImage name={(selectedArticle || mainArticle).image} />
          </div>
          <div className="p-6">
            <span className="text-gray-500 text-sm block mb-2">
              Publié le {moment((selectedArticle || mainArticle).Date).format("DD-MM-YYYY")}
            </span>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {(selectedArticle || mainArticle).Titre}
            </h1>
            
            {/* Scrollable article content */}
            <div className="max-h-[200px] overflow-y-auto text-gray-600 leading-relaxed border-t border-gray-200 pt-4">
              {showFullArticle
                ? (selectedArticle || mainArticle).article
                : (selectedArticle || mainArticle).descrip}
            </div>
            
            <button
              onClick={toggleArticleView}
              className="text-blue-600 border-none bg-white font-semibold hover:underline"
            >
              {showFullArticle ? "Voir moins" : "Voir plus"}
            </button>
          </div>
        </div>
      </main>

      {/* Latest News List */}
      <aside className="md:w-1/3">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-6">
            LATEST NEWS
          </h2>
          
          <div 
            ref={containerRef}
            className="h-[500px] overflow-auto smooth-scroll"
          >
            {otherNews.map((item) => (
              <div 
                key={item.id}
                className="mb-6 pb-6 border-b border-gray-100 last:border-b-0 transition-opacity duration-500 ease-in-out opacity-0 fade-in"
                onMouseEnter={stopAutoScroll}
                onMouseLeave={startAutoScroll}
              >
                <div 
                  onClick={() => handleArticleClick(item)}
                  className="group cursor-pointer space-y-3"
                >
                  <div className="overflow-hidden h-[180px] rounded-lg bg-[#f7f7f7] relative">
                    <ArticleImage name={item.image} />
                    {item.sources && (
                      <span style={{color:"black"}} className="absolute bottom-2 left-2 bg-white/80 text-xs px-2 py-1 rounded">
                        {item.sources}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-gray-500 text-[12px] block">
                      Publié le {moment(item.Date).format("DD-MM-YYYY")}
                    </span>
                    
                    <p style={{color:"black"}} className="line-clamp-2 text-base font-semibold leading-6 group-hover:underline">
                      {item.Titre}
                    </p>
                    
                    {item.titres_bvc && (
                      <p className="text-sm text-gray-600 ">
                        {item.titres_bvc}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default NewsPage;
