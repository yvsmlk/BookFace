import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    const results = await axios.get(`/search?query=${searchTerm}`);
    setSearchResults(results.data);
  };

  return (
    <div className="  w-96   md:w-4/5 lg:w-4/5 xl:w-4/5 mx-auto rounded-md overflow-hidden shadow-md bg-white">
    <div>
      <input
        type="text"
        placeholder="Search users or posts..."
        value={searchTerm}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border-2 rounded-md shadow-inner  mt-1 mr-2"
      />
      <button
        type="button"
        onClick={handleSearch}
        className=" bg-green-700 text-white ml-2 px-4 py-2 border-2 rounded-md hover:bg-green-900 mt-1"
      >
        Search
      </button>
      
      <div className=" mt-4 h-4 ">
        {searchResults.map((result) => (
          <div key={result.id}>
            <div className="font-bold">{result.username}</div>
            <div>{result.bio}</div>
            <button>{result.isFollowing ? 'Unfollow' : 'Follow'}</button>
            <hr />
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default SearchBar;
