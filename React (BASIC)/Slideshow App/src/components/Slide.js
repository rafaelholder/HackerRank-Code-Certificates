import React, { useState } from 'react';

function Slides({ slides }) {
  // current slide index
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastIndex = slides.length - 1;

  // event handlers
  const handleRestart = () => {
    setCurrentIndex(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, lastIndex));
  };

  // button disabled states
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === lastIndex;

  const { title, text } = slides[currentIndex];

  return (
    <div>
      <div id="navigation" className="text-center">
        <button
          data-testid="button-restart"
          className="small outlined"
          onClick={handleRestart}
          disabled={isFirst}
        >
          Restart
        </button>
        <button
          data-testid="button-prev"
          className="small"
          onClick={handlePrev}
          disabled={isFirst}
        >
          Prev
        </button>
        <button
          data-testid="button-next"
          className="small"
          onClick={handleNext}
          disabled={isLast}
        >
          Next
        </button>
      </div>
      <div id="slide" className="card text-center">
        <h1 data-testid="title">{title}</h1>
        <p data-testid="text">{text}</p>
      </div>
    </div>
  );
}

export default Slides;
