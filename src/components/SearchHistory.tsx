import React, { useState } from 'react';
import { History, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchHistoryProps {
  history: string[];
  onSelect: (city: string) => void;
  onClear?: () => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onSelect, onClear }) => {
  
  const [localHistory, setLocalHistory] = useState<string[]>(history);


  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    }),
    exit: { opacity: 0, x: -20 }
  };


  const handleClearAll = () => {
  
    if (onClear) {
      onClear();
    }
    setLocalHistory([]);
  };


  React.useEffect(() => {
    setLocalHistory(history);
  }, [history]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <History className="text-blue-600 w-5 h-5" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Recent Searches</h3>
        </div>
        
        {localHistory.length > 0 && (
          <button 
            onClick={handleClearAll}
            className="text-sm flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
          >
            <X className="w-4 h-4" />
            Clear all
          </button>
        )}
      </div>

      {localHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="p-4 bg-gray-100 rounded-full mb-3">
            <MapPin className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-500">No recent searches yet</p>
          <p className="text-sm text-gray-400 mt-1">Your search history will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {localHistory.map((city, index) => (
              <motion.div
                key={city}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative"
              >
                <button
                  onClick={() => onSelect(city)}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md border border-gray-100"
                >
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="text-gray-700 font-medium">{city}</span>
                  {index === 0 && (
                    <span className="ml-auto px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">Latest</span>
                  )}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default SearchHistory;