'use client'
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"


const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 3,
    // spaceBetween: 30,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,

    // Navigation
    navigation: {
        nextEl: '.h1n',
        prevEl: '.h1p',
    },

    // Pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    breakpoints: {
        320: {
            slidesPerView: 1,
            // spaceBetween: 30,
        },
        575: {
            slidesPerView: 2,
            // spaceBetween: 30,
        },
        767: {
            slidesPerView: 2,
            // spaceBetween: 30,
        },
        991: {
            slidesPerView: 2,
            // spaceBetween: 30,
        },
        1199: {
            slidesPerView: 3,
            // spaceBetween: 30,
        },
        1350: {
            slidesPerView: 3,
            // spaceBetween: 30,
        },
    }
}


export default function News() {
    return (
        <>
           <section className="news-section sec-pad bg-color-1" id="news">
      <div className="auto-container">
        <div className="sec-title mb_50 centred">
          <span className="sub-title">Our Blog</span>
          <h2>Take a look at our most <br />Brilliant articles</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-4 col-md-6 col-sm-12 news-block">
            <div className="news-block-one wow fadeInUp animated" data-wow-delay="00ms" data-wow-duration="1500ms">
              <div className="inner-box">
                <figure className="image-box"><Link href="blog-details"><img src="assets/images/news/news-1.jpg" alt="" /></Link></figure>
                <div className="lower-content">
                  <ul className="post-info mb_15 clearfix">
                    <li><Link href="blog-details">Admin</Link></li>
                    <li>23 Sep 2023</li>
                    <li>03 Comt</li>
                  </ul>
                  <h3><Link href="blog-details">Your Silence may be deafening to you.</Link></h3>
                  <p>Bottled up shit has higher chances of bubbling out, rather ironically.</p>
                  <div className="link">
                  <Link href="https://medium.com/@devansh.b1234/your-silence-may-be-deafening-to-you-f564826f6f11" target="_blank" rel="noopener noreferrer">
                  <span>Read More</span>
                  </Link>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 news-block">
            <div className="news-block-one wow fadeInUp animated" data-wow-delay="300ms" data-wow-duration="1500ms">
              <div className="inner-box">
                <figure className="image-box"><Link href="blog-details"><img src="assets/images/news/news-2.jpg" alt="" /></Link></figure>
                <div className="lower-content">
                  <ul className="post-info mb_15 clearfix">
                    <li><Link href="blog-details">Admin</Link></li>
                    <li>4 Sep 2023</li>
                    <li>0 Comt</li>
                  </ul>
                  <h3><Link href="blog-details">Family isn’t just a blood-relation.</Link></h3>
                  <p>It’s a relation for which you can shed blood for.</p>
                  <div className="link">
                  <Link href="https://medium.com/@devansh.b1234/family-isnt-just-a-blood-relation-it-s-a-relation-that-can-t-be-realised-in-words-e4e3663864fd" target="_blank" rel="noopener noreferrer">
                  <span>Read More</span>
                  </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 news-block">
            <div className="news-block-one wow fadeInUp animated" data-wow-delay="600ms" data-wow-duration="1500ms">
              <div className="inner-box">
                <figure className="image-box"><Link href="blog-details"><img src="assets/images/news/news-3.jpg" alt="" /></Link></figure>
                <div className="lower-content">
                  <ul className="post-info mb_15 clearfix">
                    <li><Link href="blog-details">Admin</Link></li>
                    <li>11 Jan 2022</li>
                    <li>02 Comt</li>
                  </ul>
                  <h3><Link href="blog-details">Believe me, It’s simple.
                  </Link></h3>
                  <p>Hardest Things are the very brittle when they break.</p>
                  <div className="link">
                  <Link href="https://medium.com/@devansh.b1234/believe-me-its-simple-b7100c41dad5" target="_blank" rel="noopener noreferrer">
                  <span>Read More</span>
                  </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
        </>
    )
}
