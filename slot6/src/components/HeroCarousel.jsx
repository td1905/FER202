import React from 'react';

import pizza1 from '../assets/pizza1.jpg';

export default function HeroCarousel() {
  return (
    <div id="pizzaCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#pizzaCarousel" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#pizzaCarousel" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#pizzaCarousel" data-bs-slide-to="2"></button>
      </div>

      <div className="carousel-inner">
        <div className="carousel-item active" style={{ maxHeight: '450px' }}>
          <img
            src={pizza1}
            className="d-block w-100 object-fit-cover"
            style={{ height: '450px', filter: 'brightness(0.8)' }}
            alt="Neapolitan Pizza"
          />
          <div className="carousel-caption d-block pb-4">
            <h2 className="fw-bold display-6">Neapolitan Pizza</h2>
            <p className="fs-6">
              If you are looking for a traditional Italian pizza, the Neapolitan is the best option!
            </p>
          </div>
        </div>

        <div className="carousel-item" style={{ maxHeight: '450px' }}>
          <img
            src={pizza1}
            className="d-block w-100 object-fit-cover"
            style={{ height: '450px', filter: 'brightness(0.8)' }}
            alt="Delicious Crust"
          />
          <div className="carousel-caption d-block pb-4">
            <h2 className="fw-bold display-6">Delicious Crust</h2>
            <p className="fs-6">
              Crispy on the outside, soft and chewy on the inside!
            </p>
          </div>
        </div>

        <div className="carousel-item" style={{ maxHeight: '450px' }}>
          <img
            src={pizza1}
            className="d-block w-100 object-fit-cover"
            style={{ height: '450px', filter: 'brightness(0.8)' }}
            alt="Fresh Ingredients"
          />
          <div className="carousel-caption d-block pb-4">
            <h2 className="fw-bold display-6">Fresh Ingredients</h2>
            <p className="fs-6">
              100% fresh tomato sauce, mozzarella cheese, and fresh basil daily.
            </p>
          </div>
        </div>
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#pizzaCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#pizzaCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}