type PostData = {
    id: number;
    author: {
      name: string;
      username: string;
      avatarUrl: string;
    };
    profileDescription?: string;
    address?: string;
    country?: string;
    content?: string;
    imageUrl?: string;
    videoUrl?: string;
    postedAt: string;
    following: number,
    followedBy?: string,
    followers: number,
    likes: number;
    shares: number;
    comments: number;
  };
  
  const users = [
    { name: "John Doe", username: "johndoe", avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
    { name: "Jane Smith", username: "janesmith", avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg" },
    { name: "Bob Johnson", username: "bobjohnson", avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg" },
    { name: "Mary Brown", username: "marybrown", avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg" },
    { name: "Mike Davis", username: "mikedavis", avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg" },
    { name: "Susan Lee", username: "susanlee", avatarUrl: "https://randomuser.me/api/portraits/women/6.jpg" },
    { name: "David Wilson", username: "davidwilson", avatarUrl: "https://randomuser.me/api/portraits/men/7.jpg" },
    { name: "Amy Taylor", username: "amytaylor", avatarUrl: "https://randomuser.me/api/portraits/women/8.jpg" },
    { name: "Peter Green", username: "petergreen", avatarUrl: "https://randomuser.me/api/portraits/men/9.jpg" },
    { name: "Olivia Brown", username: "oliviabrown", avatarUrl: "https://randomuser.me/api/portraits/women/10.jpg" },
  ];
  
  const generateRandomPostData = (): PostData => {
    const author = users[Math.floor(Math.random() * users.length)];
    const profileDescription = Math.random() > 0.5 ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit." : undefined;
    const address = Math.random() > 0.5 ? "Lorem ipsum dolor sit amet." : undefined;
    const country = Math.random() > 0.5 ? "Lorem ipsum dolor sit amet." : undefined;
    const content = Math.random() > 0.5 ? "Lorem ipsum dolor sit amet." : undefined;
    const imageUrl = Math.random() > 0.5 ? `https://picsum.photos/500/300?random=${Math.floor(Math.random() * 100)}` : undefined;
    const videoUrl = Math.random() > 0.5 ? "https://www.youtube.com/watch?v=dQw4w9WgXcQ" : undefined;
    const postedAt = new Date(new Date().getTime() - Math.random() * 86400000 * 7).toISOString(); // Last 7 days
    const following = Math.floor(Math.random() * 50);
    const followers = Math.floor(Math.random() * 50);
    const followedBy = Math.random() > 0.5 ? "Lorem ipsum dolor sit amet." : undefined;
    const likes = Math.floor(Math.random() * 100);
    const shares = Math.floor(Math.random() * 50);
    const comments = Math.floor(Math.random() * 20);
  
    return {
      id: Math.floor(Math.random() * 100000),
      author,
      profileDescription,
      address,
      country,
      content,
      imageUrl,
      videoUrl,
      postedAt,
      following,
      followers,
      followedBy,
      likes,
      shares,
      comments,
    };
  };
  
  // Usage example
  const postData = Array.from({ length: 10 }, generateRandomPostData);
  console.log(postData);
  export default PostData;
  