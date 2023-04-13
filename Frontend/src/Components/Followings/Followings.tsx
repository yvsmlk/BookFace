import React, { useState } from "react";
import { Person } from "./people"; // importation de notre type Person

interface Props {
  suggestions: Person[];
}

const FollowSuggestions: React.FC<Props> = ({ suggestions }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedSuggestions = showAll ? suggestions : suggestions.slice(0, 4);

  const handleShowAll = () => {
    setShowAll(true);
  };

  return (
    <div className="  w-96   md:w-4/5 lg:w-4/5 xl:w-4/5 mx-auto rounded-md overflow-hidden shadow-md bg-white">
      <div className="bg- h-16 flex justify-center items-center">
        <h2 className="text-lg font-medium text-green-700">You may follow</h2>
      </div>
      {displayedSuggestions.map((person) => (
        <div key={person.id} className="flex items-center mb-4 border-b-2 border-gray-300 pb-4 ml-2">
          <img
            src={person.image}
            alt={`${person.name}'s profile picture`}
            className="rounded-full w-10 h-10 mr-4"
          />
          <div className="flex-grow">
            <div className="font-medium">{person.name}</div>
            <div className="text-gray-600">@{person.username}</div>
          </div>
          <button className="bg-green-700 hover:bg-green-900 text-white py-1 px-4 rounded-lg mr-2">
      +follow
          </button>
        </div>
      ))}
      {!showAll && (
        <button onClick={handleShowAll} className="text-green-900 hover:underline mt-2 mx-4">
          See more
        </button>
      )}
    </div>
  );
};

export default FollowSuggestions;


