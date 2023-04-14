import React from 'react';

// Composant pour afficher un bookmark sous forme de carte
const BookmarkCard: React.FC = ({ bookmark }: any) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-2">{bookmark.title}</h2>
      <p className="text-gray-600">{bookmark.description}</p>
      <a
        href={bookmark.url}
        className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        Visiter
      </a>
    </div>
  );
};

export default BookmarkCard;
