import React from 'react';

export default function BookingForm() {
  return (
    <section className="container my-5 py-4">
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
    </section>
  );
}