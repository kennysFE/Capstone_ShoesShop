import React from "react";

export default function Carousel() {
  return (
    <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to={0}
          className
          aria-label="Slide 1"
        />
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to={1}
          aria-label="Slide 2"
          className
        />
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to={2}
          aria-label="Slide 3"
          className="active"
          aria-current="true"
        />
      </div>
      <div className="carousel-inner">
        <div className="carousel-item  active">
          <div>
            <img
              src="https://www.glab.vn/storage/uploads/advert/5ee88f140efd4.jpg"
              width="100%"
              height="500px"
              alt="..."
            />
          </div>
        </div>
        <div className="carousel-item">
          <div>
            <img
              src="https://thesneakerhouse.com/wp-content/uploads/2019/12/clearance1.jpg"
              width="100%"
              height="500px"
              alt="..."
            />
          </div>
        </div>
        <div className="carousel-item">
          <div>
            <img
              src="https://www.glab.vn/storage/uploads/advert/5f47b8a34de8f.jpg"
              width="100%"
              height="500px"
              alt="..."
            />
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
