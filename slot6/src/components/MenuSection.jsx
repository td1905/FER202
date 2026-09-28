import React from 'react';

import { menuList } from '../data/menuData';

export default function MenuSection() {
  return (
    <section className="container my-5">
      <h2 className="text-white fw-bold mb-4">Our Menu</h2>
      <div className="row g-4">
        {menuList.map((item) => (
          <div key={item.id} className="col-12 col-sm-6 col-lg-3">
            <div className="card h-100 bg-white text-dark rounded-0 border-0 position-relative">
              {item.badge && (
                <span
                  className={`position-absolute top-0 start-0 badge ${item.badgeBg} rounded-0 px-3 py-1 fs-7 fw-bold`}
                  style={{ zIndex: 1 }}
                >
                  {item.badge}
                </span>
              )}

              <img
                src={item.image}
                className="card-img-top rounded-0 menu-card-img"
                alt={item.name}
              />

              <div className="card-body d-flex flex-column text-start p-3">
                <h6 className="card-title fw-bold mb-2">{item.name}</h6>
                <p className="card-text mb-3">
                  {item.oldPrice && (
                    <span className="text-decoration-line-through text-muted me-2 small">
                      {item.oldPrice}
                    </span>
                  )}
                  <span className="fw-semibold text-warning-emphasis">
                    {item.price}
                  </span>
                </p>
                <button className="btn btn-dark w-100 rounded-0 mt-auto py-1">
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}