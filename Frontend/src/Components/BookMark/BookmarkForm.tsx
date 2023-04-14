import React, { useState } from 'react';

// Composant pour le formulaire d'ajout de bookmark
const BookmarkForm: React.FC = ({ addBookmark }: any) => {
  // États pour stocker les valeurs du formulaire
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Vérification des champs obligatoires
    if (title && url) {
      // Création de l'objet bookmark
      const bookmark = {
        id: Date.now(),
        title,
        description,
        url
      };
      // Appel de la fonction pour ajouter le bookmark
      addBookmark(bookmark);
      // Réinitialisation des champs du formulaire
      setTitle('');
      setDescription('');
      setUrl('');
    }
  };

  return (
    <form className="mb-8" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <input
        type="url"
        className="border border-gray-300 rounded-lg px-4 py-2 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
      >
        Ajouter le bookmark
      </button>
    </form>
  );
};

export default BookmarkForm;
