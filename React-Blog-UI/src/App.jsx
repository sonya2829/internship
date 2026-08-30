import{useState} from "react";
import posts from "./posts.json";
//import { useState } from "react";
import "./App.css";


function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || post.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">
      <header className="header">
        <h1>React Blog UI</h1>
        <p>Learn, Explore and Build with React</p>
      </header>

      <main className="container">
        <div className="controls">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="CSS">CSS</option>
          </select>
        </div>

        <div className="posts">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <article className="card" key={post.id}>
                <span className="category">{post.category}</span>

                <h2>{post.title}</h2>

                <p>{post.description}</p>

                <button>Read More</button>
              </article>
            ))
          ) : (
            <p className="no-results">No posts found.</p>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>© 2026 React Blog UI</p>
      </footer>
    </div>
  );
}

export default App;