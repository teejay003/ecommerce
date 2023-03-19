import React, { useEffect } from "react";
import Product from "../components/Product.jsx";
import Spinner from "../components/Spinner.jsx";
import SearchBar from "../components/SearchBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/swiper.min.css";
import cat1 from '../assets/images/categories/cat1.jpg'
import cat2 from '../assets/images/categories/cat2.jpg'
import cat3 from '../assets/images/categories/cat3.jpg'
import cat4 from '../assets/images/categories/cat4.jpg'

// Reudx
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../slices/ProductSlice.js";
import { Link } from "react-router-dom";

function Home() {
  const { loading, products, categories } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  const banners = [
    {
      heading: "ELECTRONICS",
      subheading:
        " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi accusantium voluptates enim, porro unde voluptatibus ipsam! Numquam est nam modi!",
    },
    {
      heading: "WOMEN SHOES",
      subheading:
        " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi accusantium voluptates enim, porro unde voluptatibus ipsam! Numquam est nam modi!",
    },
    {
      heading: "JEAN TROUSERS",
      subheading:
        " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi accusantium voluptates enim, porro unde voluptatibus ipsam! Numquam est nam modi!",
    },
    {
      heading: "UNISEX SUITS",
      subheading:
        " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi accusantium voluptates enim, porro unde voluptatibus ipsam! Numquam est nam modi!",
    },
  ];
  const categoriesImg = [cat1,cat3, cat2, cat4, cat2]


  return (
    <>
      <SearchBar />

      <div className="banner">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={2}
          slidesPerView={"auto"}
          autoplay
          speed={2000}
          loop={"true"}
        >
          {banners.map((banner, i) => (
            <SwiperSlide key={i}>
              <div className={`banner banner-${i}`}>
                <div className="content text-center text-white">
                  <div className="col-sm-7 ">
                    <h1 className="font-weight-bold display-4">
                      {banner.heading}
                    </h1>
                    <h3 className="lead"> {banner.subheading}</h3>

                    <Link
                      to="/shop"
                      className="btn btn-light font-weight-bold btn-lg mt-3"
                    >
                      GO SHOPPING
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="container">
      <div className="pt-5">
        <h2 className="section-title position-relative text-uppercase mb-4">
          <span className="pr-3">Categories</span>
        </h2>
        <div className="row px-xl-5 pb-3">
          {categories.map((category, i) => (
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={i}>
              <Link
                className="text-decoration-none text-dark"
                to={`/shop/?search=${category}`}
              >
                <div className="cat-item d-flex align-items-center mb-4">
                  <div
                    className="overflow-hidden"
                    style={{ width: "100px", height: "100px" }}
                  >
                    <img className="img-fluid" src={categoriesImg[i]} alt="" />
                  </div>
                  <div className="flex-fill pl-3">
                    <h6>{category}</h6>
                    <small className="text-body">
                      {
                        products.filter(
                          (product) => product.category === category
                        ).length
                      }{" "}
                      Products
                    </small>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

        <h1 className="my-5">Latest Products</h1>
        <div className="row">
          {products.map((product, i) => (
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={i}>
              <Product product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
