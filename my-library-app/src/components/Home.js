import React from 'react';
import './Home.css';
import img1 from '../assets/img/home-book-1.png';
import img2 from '../assets/img/home-book-2.png';
import img3 from '../assets/img/home-book-3.png';
import img4 from '../assets/img/home-book-4.png';
import img5 from '../assets/img/home-book-1.png';



function Home() {
  return (
    <section className="home section" id="home">
      <div className="home__container container grid">
        <div className="home__data">
          <h1 className="home__title">
            Browse & <br />
            select E-Books
          </h1>
          <p className="home__description">
            Find the best e-books from your favorite writers.
          </p>
          <a href="#" className="button">Explore Now</a>
        </div>
        <div className="home__images">
          <div className="home__swiper swiper">
            <div className="swiper-wrapper">
              <article className="home__article swiper-slide">
                <img src={img1} alt="image" className="home__img" />
              </article>
              <article className="home__article swiper-slide">
                <img src={img2} alt="image" className="home__img" />
              </article>
              <article className="home__article swiper-slide">
                <img src={img3} alt="image" className="home__img" />
              </article>
              <article className="home__article swiper-slide">
                <img src={img4} alt="image" className="home__img" />
              </article>
              <article className="home__article swiper-slide">
                <img src={img5} alt="image" className="home__img" />
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
