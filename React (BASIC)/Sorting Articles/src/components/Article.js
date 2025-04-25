// src/components/Articles.js
import React from 'react';

function Articles({ articles }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Upvotes</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {articles.map((article) => (
          <tr key={article.date} data-testid="article">
            <td data-testid="article-title">{article.title}</td>
            <td data-testid="article-upvotes">{article.upvotes}</td>
            <td data-testid="article-date">{article.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Articles;
