import React from 'react';

export default function Navbar() {
  return (
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
  );
}