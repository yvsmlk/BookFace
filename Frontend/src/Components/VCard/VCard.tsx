import React from 'react';

type VCardProps = {
  name: string;
  username: string;
  followers: number;
  following: number;
};

const VCard: React.FC<VCardProps> = ({ name, username, followers, following }) => {
  return (
    <div className="  w-96   md:w-4/5 lg:w-4/5 xl:w-4/5 mx-auto rounded-md overflow-hidden shadow-md bg-white">
      <div className="bg-green-700 h-28 flex justify-center items-center">
        <div className="h-28 flex items-center mt-12 z-30">
          <img
            src="https://randomuser.me/api/portraits/women/8.jpg"
            alt="Profile Picture"
            width={150}
            height={150}
            className="bg-black border-2 border-white rounded-full "
          />
        </div>
      </div>
      <div className="text-center py-6 mt-5">
        <h2 className="text-2xl font-bold text-green-800">{name}</h2>
        <p className="text-gray-500">@{username}</p>
      </div>
      <div className="flex justify-between px-6 py-4 border-t border-gray-200">
        <div>
          <p className="text-gray-600 font-medium">{followers}</p>
          <p className="text-gray-400">Followers</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">{following}</p>
          <p className="text-gray-400">Following</p>
        </div>
      </div>
    </div>
  );
};

export default VCard;

