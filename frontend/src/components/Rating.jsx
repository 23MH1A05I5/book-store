import React from 'react';

const Rating = ({ value, text, color = '#f59e0b' }) => {
  return (
    <div className="d-flex align-items-center rating">
      <span className="me-1">
        <i
          style={{ color }}
          className={
            value >= 1
              ? 'bi bi-star-fill rating-star'
              : value >= 0.5
              ? 'bi bi-star-half rating-star'
              : 'bi bi-star rating-star'
          }
        ></i>
        <i
          style={{ color }}
          className={
            value >= 2
              ? 'bi bi-star-fill rating-star'
              : value >= 1.5
              ? 'bi bi-star-half rating-star'
              : 'bi bi-star rating-star'
          }
        ></i>
        <i
          style={{ color }}
          className={
            value >= 3
              ? 'bi bi-star-fill rating-star'
              : value >= 2.5
              ? 'bi bi-star-half rating-star'
              : 'bi bi-star rating-star'
          }
        ></i>
        <i
          style={{ color }}
          className={
            value >= 4
              ? 'bi bi-star-fill rating-star'
              : value >= 3.5
              ? 'bi bi-star-half rating-star'
              : 'bi bi-star rating-star'
          }
        ></i>
        <i
          style={{ color }}
          className={
            value >= 5
              ? 'bi bi-star-fill rating-star'
              : value >= 4.5
              ? 'bi bi-star-half rating-star'
              : 'bi bi-star rating-star'
          }
        ></i>
      </span>
      {text && <span className="text-secondary small ms-1">{text}</span>}
    </div>
  );
};

export default Rating;
