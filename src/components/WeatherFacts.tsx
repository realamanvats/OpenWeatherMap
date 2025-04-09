// import React, { useState, useEffect } from 'react';
// import { BookOpen } from 'lucide-react';

// interface WeatherFactsProps {
//   darkMode: boolean;
// }

// const WeatherFacts: React.FC<WeatherFactsProps> = ({ darkMode }) => {
//   const facts = [
//     "Lightning strikes the Earth about 100 times every second",
//     "A hurricane can release energy equivalent to 10 atomic bombs",
//     "The fastest recorded wind speed was 253 mph at Barrow Island, Australia",
//     "Snow isn't actually white - it's transparent",
//     "Raindrops aren't tear-shaped - they're round"
//   ];

//   return (
//     <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//       <div className="flex items-center gap-2 mb-4">
//         <BookOpen className="text-blue-500" />
//         <h3 className="text-lg font-semibold">Weather Facts</h3>
//       </div>
//       <ul className="space-y-4">
//         {facts.map((fact, index) => (
//           <li key={index} className="flex items-start gap-2">
//             <span className="text-blue-500 font-bold">•</span>
//             <span>{fact}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default WeatherFacts;











import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WeatherFactsProps {
  darkMode: boolean;
}

interface WeatherFact {
  text: string;
  imageUrl: string;
}

const WeatherFacts: React.FC<WeatherFactsProps> = ({ darkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  // Using more reliable image sources
  const facts: WeatherFact[] = [
    {
      text: "Lightning strikes the Earth about 100 times every second",
      imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      text: "A hurricane can release energy equivalent to 10 atomic bombs",
      imageUrl: "https://images.unsplash.com/photo-1561484930-974554019ade?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      text: "The fastest recorded wind speed was 253 mph at Barrow Island, Australia",
      imageUrl: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      text: "Snow isn't actually white - it's transparent",
      imageUrl: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      text: "Raindrops aren't tear-shaped - they're round",
      imageUrl: "https://images.unsplash.com/photo-1433863448220-78aaa064ff47?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Handle image loading errors
  const handleImageError = () => {
    setImageError(true);
  };

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = facts.map(fact => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = fact.imageUrl;
          img.onload = resolve;
          img.onerror = () => {
            console.error(`Failed to load image: ${fact.imageUrl}`);
            reject();
          };
        });
      });

      try {
        await Promise.all(imagePromises);
        setIsLoading(false);
      } catch (error) {
        console.error("Some images failed to load", error);
        setIsLoading(false);
        setImageError(true);
      }
    };

    preloadImages();
  }, []);

  // Change fact every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % facts.length);
      setImageError(false); // Reset error state on change
    }, 10000);

    return () => clearInterval(interval);
  }, [facts.length]);

  if (isLoading) {
    return (
      <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="text-blue-500" />
          <h3 className="text-lg font-semibold">Weather Facts</h3>
        </div>
        <p>Loading weather facts...</p>
      </div>
    );
  }

  const currentFact = facts[currentIndex];

  return (
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="text-blue-500" />
          <h3 className="text-lg font-semibold">Weather Facts</h3>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative h-48 rounded-lg overflow-hidden mb-4 bg-gray-200 flex items-center justify-center"
            >
              {imageError ? (
                <div className="text-center p-4">
                  <p className="text-gray-500">Image not available</p>
                  <p className="text-sm text-gray-400">Showing weather fact instead</p>
                </div>
              ) : (
                <img 
                  src={currentFact.imageUrl} 
                  alt="Weather illustration"
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </motion.div>
            
            <div className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span>{currentFact.text}</span>
            </div>
            
            <div className="flex justify-center space-x-2 mt-4">
              {facts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setImageError(false);
                  }}
                  className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                  aria-label={`Go to fact ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WeatherFacts;