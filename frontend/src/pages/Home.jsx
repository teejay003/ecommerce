import React, { useEffect } from "react";
import Product from "../components/Product.jsx";
import Spinner from "../components/Spinner.jsx";
import SearchBar from "../components/SearchBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/swiper.min.css";

// Reudx
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../slices/ProductSlice.js";
import { Link } from "react-router-dom";

function Home() {
  const { loading, products } = useSelector((state) => state.products);
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
              loop = {"true"}
            
        >
          {
            banners.map((banner, i) => (
              <SwiperSlide key={i}>
            <div className={`banner banner-${i}`}>
                  <div className="content text-center text-white">
                    <div className="w-50">
                    <h1 className="font-weight-bold display-4">{banner.heading}</h1>
                    <h3 className="lead"> { banner.subheading }</h3>

                    <Link to="/shop" className="btn btn-light font-weight-bold btn-lg mt-3">GO SHOPPING</Link>
                    </div>
              </div>
            </div>
              </SwiperSlide>
            ))
          }
  
            </Swiper>
      </div>

      <div className="container">
        <h1 className="my-2">Latest Products</h1>
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
