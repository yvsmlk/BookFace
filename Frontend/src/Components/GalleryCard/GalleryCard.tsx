import { useState, useEffect } from 'react';
import axios from 'axios';

type Photo = {
  id: string;
  urls: {
    regular: string;
  };
};

const fetchPhotos = async () => {
  const response = await axios.get<Photo[]>('https://api.unsplash.com/photos/random', {
    params: {
      query: 'nature',
      count: 6,
      client_id: 'J344RJO6jc3fRHVQvRtSxZWBzokxuxIqyOWIn7twIe0',
    },
  });
  return response.data;
};

const NatureCard = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const getPhotos = async () => {
      const newPhotos = await fetchPhotos();
      setPhotos(newPhotos);
    };
    getPhotos();
    const interval = setInterval(() => {
      getPhotos();
    }, 160000000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="  w-96   md:w-4/5 lg:w-4/5 xl:w-4/5 mx-auto rounded-md overflow-hidden shadow-md bg-white">
      <div className="grid grid-cols-3 gap-1">
        {photos.map((photo) => (
          <img key={photo.id} src={photo.urls.regular} alt="" className="object-cover w-full h-28 " />
        ))}
      </div>
    </div>
  );
};

export default NatureCard;

