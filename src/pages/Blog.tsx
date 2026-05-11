import React, { useState } from 'react';
import './Blog.css';

const Blog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const posts = [
        {
            id: 1,
            title: 'First Blog Post',
            summary: 'This is a summary of the first blog post.',
            image: 'path/to/image1.jpg',
            date: '2026-01-01',
            content: 'Full content of the first blog post...'
        },
        {
            id: 2,
            title: 'Second Blog Post',
            summary: 'This is a summary of the second blog post.',
            image: 'path/to/image2.jpg',
            date: '2026-01-15',
            content: 'Full content of the second blog post...'
        },
        // Add more posts as needed
    ];

    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="blog-container">
            <h1>Blog</h1>
            <input 
                type="text" 
                placeholder="Search posts..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <div className="posts">
                {filteredPosts.map(post => (
                    <div key={post.id} className="post">
                        <img src={post.image} alt={post.title} />
                        <h2>{post.title}</h2>
                        <p>{post.summary}</p>
                        <p><em>Published on: {post.date}</em></p>
                        <a href={`/blog/${post.id}`}>Read more</a>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {/* Pagination logic goes here */}
            </div>
            <aside className="sidebar">
                <h3>Categories</h3>
                <ul>
                    <li>Category 1</li>
                    <li>Category 2</li>
                    <li>Category 3</li>
                </ul>
                <h3>Recent Posts</h3>
                <ul>
                    <li>Recent Post 1</li>
                    <li>Recent Post 2</li>
                </ul>
                <h3>Popular Posts</h3>
                <ul>
                    <li>Popular Post 1</li>
                    <li>Popular Post 2</li>
                </ul>
            </aside>
        </div>
    );
};

export default Blog;