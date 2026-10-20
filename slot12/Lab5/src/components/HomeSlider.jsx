import React from 'react';
import { Carousel } from 'react-bootstrap';
import { banners } from '../data/banners';

const HomeSlider = () => {
  return (
    <div className="home-slider-wrapper mb-4 rounded-3 overflow-hidden shadow-sm">
      <Carousel interval={4000} indicators={true} controls={true} pause="hover">
        {banners.map((item) => (
          <Carousel.Item key={item.id}>
            <img
              className="d-block w-100 carousel-slide-img"
              src={item.image}
              alt={item.alt || item.title}
              onError={(e) => {
                if (item.fallbackImage && e.target.src !== item.fallbackImage) {
                  e.target.src = item.fallbackImage;
                }
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HomeSlider;
