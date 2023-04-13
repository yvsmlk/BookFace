import React, { useState } from "react";
import { FiCamera, FiVideo, FiCalendar, FiMoreHorizontal } from "react-icons/fi";

interface Props {
  profilePictureUrl: string;
}

const PostCard: React.FC<Props> = ({ profilePictureUrl }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [schedule, setSchedule] = useState(new Date());

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result as string);
      };
    }
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setVideo(reader.result as string);
      };
    }
  };

  const handleScheduleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setSchedule(date);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({
      text,
      image,
      video,
      schedule,
    });
  };

  const handlePhotoUpload = () => {
    // handle photo upload logic here
  };

  const handleVideoUpload = () => {
    // handle video upload logic here
  };

  const handleSchedule = () => {
    // handle schedule logic here
  };

  const handleMore = () => {
    // handle more logic here
  };

  return (
    <div className="  w-96   md:w-auto lg:w-auto xl:w-auto mx-auto rounded-md overflow-hidden shadow-md bg-white">
      <img className="h-12 w-12 rounded-full" src={profilePictureUrl} alt="Profile" />
      <div className="flex-1 ml-4 mr-4">
        <form onSubmit={handleSubmit}>
          <textarea
            className="block w-full border-green-900 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500"
            placeholder="What's happening?"
            value={text}
            onChange={handleTextChange}
          />
          <div className="flex justify-between items-center mt-2 ml-2 mr-2">
            <div className="flex space-x-2">
              <label className="flex items-center  border-green-900 text-green-800 hover:text-green-900">
                <FiCamera className="w-5 h-5" />
                <span className="ml-2 ">Photo</span>
                <input type="file" accept="image/*" hidden onChange={handleImageChange} />
              </label>
              <label className="flex items-center  border-green-900 text-green-800 hover:text-green-900">
                <FiVideo className="w-5 h-5" />
                <span className="ml-2">Video</span>
                <input type="file" accept="video/*" hidden onChange={handleVideoChange} />
              </label>
              <label className="flex items-center  border-green-900 text-green-800 hover:text-green-900">
                <FiCalendar className="w-5 h-5" />
                <span className="ml-2">Schedule</span>
                <input type="datetime-local" onChange={handleScheduleChange} />
              </label>
            </div>
            <button type="submit" className="flex items-center  border-green-900 text-green-800 hover:text-green-900">
              <FiMoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostCard;  
