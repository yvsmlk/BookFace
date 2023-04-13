import React, { useEffect, useState } from "react";
import axios from "axios";

const NatureTrendsCard = () => {
  const [trends, setTrends] = useState<string[]>([]);

  useEffect(() => {
    const getTrends = async () => {
      const response = await axios.get(
        'https://naturaldisaster2.p.rapidapi.com/',
        {
            headers: {
                'X-RapidAPI-Key': '325a7d1da8msh3ab021574148a9dp120784jsn6047bac0408e',
                'X-RapidAPI-Host': 'naturaldisaster2.p.rapidapi.com'
              }
        }
      );
      const trendsData = response.data[0].trends.filter((trend: any) =>
        trend.name.toLowerCase().includes("nature")
      );
      const trendsNames = trendsData.map((trend: any) => trend.name);
      setTrends(trendsNames);
    };

    getTrends();
  }, []);

  return (
    <div className="  w-96  sm:w-2/5 md:w-4/5 lg:w-4/5 xl:w-4/5 mx-auto rounded-md overflow-hidden shadow-md bg-white">

       <div className="h-16 flex justify-center items-center text-green-700">
      
         <h2 className="text-xl font-semibold mb-4">Trending Topics</h2>
        </div>
        
     <ul>
        {trends.map((trend) => (
          <li key={trend} className="text-gray-600 mb-2">
            {trend}
          </li>
          
        ))}
      </ul>
      
    </div>
  );
};

export default NatureTrendsCard;
