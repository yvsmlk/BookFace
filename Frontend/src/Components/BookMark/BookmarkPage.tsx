import React, { useState } from 'react';
import BookmarkCard from './BookmarkCard';
import BookmarkForm from './BookmarkForm';

// Interface pour le type de bookmark
interface Bookmark {
  id: number;
  title: string;
  description: string;
  url: string;
}

// Composant principal pour la page de bookmark
const BookmarkPage: React.FC = () => {
  // État pour stocker les bookmarks
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // Fonction pour ajouter un nouveau bookmark
  const addBookmark = (bookmark: Bookmark) => {
    setBookmarks([...bookmarks, bookmark]);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
      <h1 className="text-3xl font-semibold mb-4">Mes bookmarks</h1>
      <BookmarkForm addBookmark={addBookmark} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bookmarks.map((bookmark: Bookmark) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
    </div>
  );
};

export default BookmarkPage;
