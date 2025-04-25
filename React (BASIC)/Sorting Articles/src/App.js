// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import 'h8k-components';

import Articles from './components/Articles';

const title = "Sorting Articles";

function App({ articles }) {
  // State for sorted articles
  const [sortedArticles, setSortedArticles] = useState([]);

  // Initialize default sort by upvotes desc
  useEffect(() => {
    const byUpvotes = [...articles].sort((a, b) => b.upvotes - a.upvotes);
    setSortedArticles(byUpvotes);
  }, [articles]);

  const handleMostUpvoted = () => {
    const byUpvotes = [...articles].sort((a, b) => b.upvotes - a.upvotes);
    setSortedArticles(byUpvotes);
  };

  const handleMostRecent = () => {
    const byDate = [...articles].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setSortedArticles(byDate);
  };

  return (
    <div className="App">
      <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-row align-items-center justify-content-center my-20 navigation">
        <label className="form-hint mb-0 text-uppercase font-weight-light">
          Sort By
        </label>
        <button
          data-testid="most-upvoted-link"
          className="small"
          onClick={handleMostUpvoted}
        >
          Most Upvoted
        </button>
        <button
          data-testid="most-recent-link"
          className="small"
          onClick={handleMostRecent}
        >
          Most Recent
        </button>
      </div>
      <Articles articles={sortedArticles} />
    </div>
  );
}

export default App;
