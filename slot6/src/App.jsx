import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import pizza1 from './assets/pizza1.jpg';
import menu1 from './assets/menu1.jpg';
import menu2 from './assets/menu2.jpg';
import menu3 from './assets/menu3.jpg';
import menu4 from './assets/menu4.jpg';

function App() {
  const menuList = [
    {
      id: 1,
      name: 'Margherita Pizza',
      oldPrice: '$40.00',
      price: '$24.00',
      badge: 'SALE',
      badgeBg: 'bg-warning text-dark',
      image: menu1,
    },
    {
      id: 2,
      name: 'Mushroom Pizza',
      oldPrice: null,
      price: '$25.00',
      badge: null,
      badgeBg: '',
      image: menu2,
    },
    {
      id: 3,
      name: 'Hawaiian Pizza',
      oldPrice: null,
      price: '$30.00',
      badge: 'NEW',
      badgeBg: 'bg-warning text-dark',
      image: menu3,
    },
    {
      id: 4,
      name: 'Pesto Pizza',
      oldPrice: '$50.00',
      price: '$30.00',
      badge: 'SALE',
      badgeBg: 'bg-warning text-dark',
      image: menu4,
    },
  ];

  return (
    <div className="bg-dark text-white min-vh-100 font-sans">
      {/* 1. NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-2 border-bottom border-secondary">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold fs-4 text-white" href="#home">
            Pizza House
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active text-white" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-secondary" href="#about">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-secondary" href="#contact">
                  Contact
                </a>
              </li>
            </ul>

            <form className="d-flex" role="search">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control form-control-sm bg-white text-dark"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-danger btn-sm px-3" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>

{/* 2. CAROUSEL BANNER */}
<div id="pizzaCarousel" className="carousel slide" data-bs-ride="carousel">
  {/* Nút chỉ số (Indicators) */}
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#pizzaCarousel" data-bs-slide-to="0" className="active"></button>
    <button type="button" data-bs-target="#pizzaCarousel" data-bs-slide-to="1"></button>
    <button type="button" data-bs-target="#pizzaCarousel" data-bs-slide-to="2"></button>
  </div>

  {/* Danh sách các slide ảnh */}
  <div className="carousel-inner">
    {/* Slide 1 */}
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

    {/* Slide 2 */}
    <div className="carousel-item" style={{ maxHeight: '450px' }}>
      <img
        src={pizza1} // Bạn thay bằng pizza2 hoặc ảnh khác
        className="d-block w-100 object-fit-cover"
        style={{ height: '450px', filter: 'brightness(0.8)' }}
        alt="Italian Pizza"
      />
      <div className="carousel-caption d-block pb-4">
        <h2 className="fw-bold display-6">Delicious Crust</h2>
        <p className="fs-6">
          Crispy on the outside, soft and chewy on the inside!
        </p>
      </div>
    </div>

    {/* Slide 3 */}
    <div className="carousel-item" style={{ maxHeight: '450px' }}>
      <img
        src={pizza1} // Bạn thay bằng pizza3 hoặc ảnh khác
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

  {/* Nút bấm Previous / Next (như mũi tên trắng bên trái trong ảnh đề bài) */}
  <button
    className="carousel-control-prev"
    type="button"
    data-bs-target="#pizzaCarousel"
    data-bs-slide="prev"
  >
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button
    className="carousel-control-next"
    type="button"
    data-bs-target="#pizzaCarousel"
    data-bs-slide="next"
  >
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

      {/* 3. OUR MENU */}
      <div className="container my-5">
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
      </div>

      {/* 4. BOOK YOUR TABLE */}
      <div className="container my-5 py-4">
        <h2 className="text-center text-white fw-bold mb-4">Book Your Table</h2>
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <form>
              <div className="row g-3 mb-3">
                <div className="col-12 col-md-4">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    placeholder="Your Name *"
                    required
                  />
                </div>
                <div className="col-12 col-md-4">
                  <input
                    type="email"
                    className="form-control rounded-0"
                    placeholder="Your Email *"
                    required
                  />
                </div>
                <div className="col-12 col-md-4">
                  <select className="form-select rounded-0 text-muted" defaultValue="">
                    <option value="" disabled>
                      Select a Service
                    </option>
                    <option value="1">Dine-in</option>
                    <option value="2">Takeaway</option>
                    <option value="3">Birthday Party</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <textarea
                  className="form-control rounded-0"
                  rows="4"
                  placeholder="Please write your comment"
                ></textarea>
              </div>

              <div className="text-start">
                <button
                  type="submit"
                  className="btn btn-warning text-white fw-semibold rounded-0 px-4 py-2"
                  style={{ backgroundColor: '#e5a024', borderColor: '#e5a024' }}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;