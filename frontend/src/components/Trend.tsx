import React, { useState, useEffect, useRef } from "react";

const Trend: React.FC = () => {
  const trendingItems = [
    {
      id: 1,
      title: "Black Adem",
      imageUrl: "/images/blackadam.png",
      rating: 8.8,
      type: "Action",
    },
    {
      id: 2,
      title: "Moonfall",
      imageUrl: "/images/moonfall.png",
      rating: 7.1,
      type: "Action",
    },
    {
      id: 3,
      title: "The Batman",
      imageUrl: "/images/batman.jpg",
      rating: 8.2,
      type: "Action",
    },
    {
      id: 4,
      title: "Avengers: Endgame",
      imageUrl: "/images/avengers.jpg",
      rating: 8.4,
      type: "Action/Sci-Fi",
    },
    {
      id: 5,
      title: "Dune",
      imageUrl: "/images/dune.jpg",
      rating: 8.1,
      type: "Sci-Fi",
    },
    {
      id: 6,
      title: "Inception",
      imageUrl: "/images/inception.jpg",
      rating: 8.8,
      type: "Sci-Fi/Thriller",
    },
    {
      id: 7,
      title: "Interstellar",
      imageUrl: "/images/interstella.jpg",
      rating: 8.6,
      type: "Sci-Fi",
    },
    {
      id: 8,
      title: "Joker",
      imageUrl: "/images/joker.jpg",
      rating: 8.5,
      type: "Drama/Crime",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1440) {
        setItemsPerView(5);
      } else if (width >= 1024) {
        setItemsPerView(4);
      } else if (width >= 768) {
        setItemsPerView(3);
      } else if (width >= 480) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate scale for each item based on position
  const calculateScale = (index: number) => {
    const centerIndex = currentIndex + Math.floor(itemsPerView / 2);
    const distanceFromCenter = Math.abs(index - centerIndex);
    const maxDistance = Math.ceil(itemsPerView / 2);
    
    // Items at edges will have larger scale (1.0) and center items will have smaller scale (0.85)
    const scale = 1.0 - (distanceFromCenter / maxDistance) * 0.15;
    return Math.max(0.85, scale);
  };

  // Calculate z-index for each item
  const calculateZIndex = (index: number) => {
    const centerIndex = currentIndex + Math.floor(itemsPerView / 2);
    return 10 - Math.abs(index - centerIndex);
  };

  // Navigation handlers
  const handlePrev = () => {
    setCurrentIndex(prev => 
      prev === 0 ? trendingItems.length - itemsPerView : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex(prev => 
      prev >= trendingItems.length - itemsPerView ? 0 : prev + 1
    );
  };
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setDragStartX(
      "touches" in e ? e.touches[0].clientX : e.clientX
    );
    setDragOffset(0);
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    
    const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const distance = currentX - dragStartX;
    setDragOffset(distance);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Swipe threshold (20% of item width)
    const threshold = window.innerWidth * 0.2;
    
    if (dragOffset < -threshold) handleNext();
    else if (dragOffset > threshold) handlePrev();
    
    setDragOffset(0);
  };

  // Event listeners for dragging
  useEffect(() => {
    document.addEventListener("mousemove", handleDragMove as any);
    document.addEventListener("touchmove", handleDragMove as any);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchend", handleDragEnd);

    return () => {
      document.removeEventListener("mousemove", handleDragMove as any);
      document.removeEventListener("touchmove", handleDragMove as any);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, dragStartX]);

  // Button visibility logic
  const showControls = trendingItems.length > itemsPerView;
  const disablePrev = currentIndex === 0;
  const disableNext = currentIndex >= trendingItems.length - itemsPerView;

  return (
    <div
      style={{
        padding: "40px 20px",
        background: "linear-gradient(to bottom, #0a0a0a, #111)",
        minHeight: "100vh",
        width: "100%",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ 
        maxWidth: "1400px", 
        margin: "0 auto",
        position: "relative",
        zIndex: 2
      }}>
        <h2 style={{ 
          color: "#fff",
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "40px",
          textAlign: "center",
          textShadow: "0 2px 10px rgba(255,255,255,0.1)",
          position: "relative",
          paddingBottom: "15px"
        }}>
          Trending at this moment
          <div style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100px",
            height: "4px",
            background: "linear-gradient(90deg, #ff0000, #ff9900)",
            borderRadius: "2px"
          }}></div>
        </h2>
        
        <div 
          ref={carouselRef}
          style={{ 
            position: "relative",
            height: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            perspective: "1200px",
            overflow: "visible",
            margin: "0 auto"
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          {trendingItems.map((item, index) => {
            const isVisible = index >= currentIndex && index < currentIndex + itemsPerView;
            if (!isVisible) return null;
            
            const position = index - currentIndex;
            const scale = calculateScale(index);
            const zIndex = calculateZIndex(index);
            
            return (
              <div
                key={item.id}
                style={{
                  position: "absolute",
                  transform: `translateX(${(position - itemsPerView/2) * 240}px) 
                             scale(${scale})
                             translateZ(${(1 - scale) * -200}px)`,
                  transformStyle: "preserve-3d",
                  transition: "transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1)",
                  zIndex: zIndex,
                  filter: `brightness(${0.7 + scale * 0.3})`,
                  opacity: 0.9,
                  width: "280px",
                  height: "420px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 20px 30px rgba(0,0,0,0.5)",
                  cursor: "pointer",
                }}
                onClick={() => console.log("Clicked:", item.title)}
              >
                <div style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  background: `linear-gradient(to top, #000, transparent), url(${item.imageUrl}) center/cover`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "20px",
                  boxSizing: "border-box"
                }}>
                  <div style={{ 
                    background: "rgba(0,0,0,0.7)", 
                    padding: "15px", 
                    borderRadius: "8px",
                    transform: "translateZ(30px)"
                  }}>
                    <h3 style={{ 
                      color: "#fff", 
                      fontSize: "22px", 
                      margin: "0 0 8px",
                      fontWeight: "bold"
                    }}>{item.title}</h3>
                    <div style={{ 
                      color: "#aaa", 
                      fontSize: "16px", 
                      marginBottom: "10px"
                    }}>{item.type}</div>
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center",
                      color: "#ffd700",
                      fontSize: "18px",
                      fontWeight: "bold"
                    }}>
                      ★ {item.rating}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Navigation buttons */}
          {showControls && (
            <>
              <button
                onClick={handlePrev}
                disabled={disablePrev}
                style={{
                  position: "absolute",
                  left: "-60px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 20,
                  background: "rgba(200, 0, 0, 0.7)",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  fontSize: "24px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 15px rgba(255,0,0,0.4)",
                  opacity: disablePrev ? 0.4 : 1,
                  transition: "all 0.3s ease",
                }}
                aria-label="Previous items"
              >
                &lt;
              </button>
              
              <button
                onClick={handleNext}
                disabled={disableNext}
                style={{
                  position: "absolute",
                  right: "-60px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 20,
                  background: "rgba(200, 0, 0, 0.7)",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  fontSize: "24px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 15px rgba(255,0,0,0.4)",
                  opacity: disableNext ? 0.4 : 1,
                  transition: "all 0.3s ease",
                }}
                aria-label="Next items"
              >
                &gt;
              </button>
            </>
          )}
        </div>
        
        {/* Position indicators */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginTop: "50px"
        }}>
          {Array.from({ length: Math.ceil(trendingItems.length / itemsPerView) }).map((_, i) => (
            <div 
              key={i}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: i === Math.floor(currentIndex / itemsPerView) 
                  ? "#ff0000" 
                  : "rgba(255,255,255,0.3)",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onClick={() => setCurrentIndex(i * itemsPerView)}
            />
          ))}
        </div>
      </div>
    
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "radial-gradient(circle at 20% 30%, rgba(70,0,0,0.2) 0%, transparent 40%)",
        zIndex: 1
      }}></div>
      <div style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: "100%",
        height: "100%",
        background: "radial-gradient(circle at 80% 70%, rgba(0,30,70,0.2) 0%, transparent 40%)",
        zIndex: 1
      }}></div>
    </div>
  );
};

export default Trend;