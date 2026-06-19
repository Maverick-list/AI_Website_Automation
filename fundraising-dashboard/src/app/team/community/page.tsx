"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const mockPosts = [
  {
    id: 1,
    author: "MaveCode Admin",
    role: "CEO",
    avatar: "MA",
    content: "Selamat pagi tim! Hari ini kita berhasil menyelesaikan perombakan besar-besaran untuk UI dan UX platform kita. Jangan lupa untuk mengecek Theme Settings yang baru ya! ✨🚀",
    likes: 12,
    comments: 3,
    time: "2 jam yang lalu",
  },
  {
    id: 2,
    author: "Budi Santoso",
    role: "Marketing Manager",
    avatar: "BS",
    content: "Campaign Q3 sudah siap dieksekusi. Tolong tim Sales bersiap untuk lonjakan lead dari AI scraper kita minggu ini.",
    likes: 8,
    comments: 5,
    time: "5 jam yang lalu",
  },
  {
    id: 3,
    author: "Siti Rahma",
    role: "Customer Success",
    avatar: "SR",
    content: "Ada feedback bagus dari klien Enterprise kita tentang fitur Google Workspace Automation. Mereka sangat suka sinkronisasi otomatis ke Google Sheets!",
    likes: 15,
    comments: 1,
    time: "Kemarin",
  }
];

export default function EmployeeCommunity() {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState(mockPosts);

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post = {
      id: Date.now(),
      author: "You",
      role: "Employee",
      avatar: "YO",
      content: newPost,
      likes: 0,
      comments: 0,
      time: "Baru saja",
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Team Community
        </h1>
        <p className="text-foreground/60 mt-2">Internal hub for announcements, ideas, and team discussions.</p>
      </motion.div>

      {/* Create Post */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-sidebar border border-sidebar-border p-6 rounded-xl shadow-lg"
      >
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind? Share with the team..."
          className="w-full bg-background border border-sidebar-border rounded-lg p-4 text-white focus:outline-none focus:border-cyan-500 min-h-[100px] resize-none"
        />
        <div className="mt-4 flex justify-end">
          <button 
            onClick={handlePost}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-2 rounded-lg font-medium shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            Post Update
          </button>
        </div>
      </motion.div>

      {/* Feed */}
      <motion.div 
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
          }
        }}
        className="space-y-6"
      >
        {posts.map((post) => (
          <motion.div 
            key={post.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
            }}
            className="bg-sidebar border border-sidebar-border p-6 rounded-xl shadow-lg group hover:border-cyan-500/30 transition-colors"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                {post.avatar}
              </div>
              <div>
                <h3 className="font-semibold text-white">{post.author}</h3>
                <div className="flex items-center text-xs text-foreground/50 space-x-2">
                  <span>{post.role}</span>
                  <span>•</span>
                  <span>{post.time}</span>
                </div>
              </div>
            </div>
            
            <p className="text-foreground/90 leading-relaxed mb-6">
              {post.content}
            </p>

            <div className="pt-4 border-t border-sidebar-border flex items-center space-x-6 text-foreground/60 text-sm">
              <button className="flex items-center space-x-2 hover:text-cyan-400 transition-colors group-hover:text-cyan-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                <span>{post.likes} Likes</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                <span>{post.comments} Comments</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-green-400 transition-colors ml-auto">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                <span>Share</span>
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
