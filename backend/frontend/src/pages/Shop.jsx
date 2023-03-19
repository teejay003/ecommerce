import React, {useState, useEffect} from 'react'
import { Link, useSearchParams} from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux'
import Product from '../components/Product';
import { fetchShopProducts } from '../slices/ProductSlice';
import Spinner from '../components/Spinner'
import SearchBar from '../components/SearchBar';
import { fetchProducts } from "../slices/ProductSlice.js";

function Shop() {
  const dispatch = useDispatch();
  const { shopProducts, loading, paginator } = useSelector(
    (state) => state.products
  );
  const [page, setPage] = useState(1);
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("search") || "";

  useEffect(() => {
    // Fecth products for shop
    dispatch(fetchShopProducts({ keyword, page }));
    dispatch(fetchProducts());
  }, [page, keyword, dispatch]);



  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
          <>
          <SearchBar />
        <div className="container-fluid mt-4">
          <div className="row px-xl-5">
            <div className="col-lg-3 col-md-4">
              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-pri pr-3">Filter by price</span>
              </h5>
              <div className="bg-white p-4 mb-3 mb-30">
                <form>
                  <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="price-all"
                    />
                    <label className="custom-control-label" htmlFor="price-all">
                      All Price
                    </label>
                    <span className="badge border font-weight-normal">
                      1000
                    </span>
                  </div>
                  <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="price-1"
                    />
                    <label className="custom-control-label" htmlFor="price-1">
                      $0 - $100
                    </label>
                    <span className="badge border font-weight-normal">150</span>
                  </div>
                  <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="price-2"
                    />
                    <label className="custom-control-label" htmlFor="price-2">
                      $100 - $200
                    </label>
                    <span className="badge border font-weight-normal">295</span>
                  </div>
                  <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="price-3"
                    />
                    <label className="custom-control-label" htmlFor="price-3">
                      $200 - $300
                    </label>
                    <span className="badge border font-weight-normal">246</span>
                  </div>
                  <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="price-4"
                    />
                    <label className="custom-control-label" htmlFor="price-4">
                      $300 - $400
                    </label>
                    <span className="badge border font-weight-normal">145</span>
                  </div>
                  <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="price-5"
                    />
                    <label className="custom-control-label" htmlFor="price-5">
                      $400 - $500
                    </label>
                    <span className="badge border font-weight-normal">168</span>
                  </div>
                </form>
              </div>

              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-pri pr-3">Filter by color</span>
              </h5>
              <div className="bg-white p-4 mb-30">
                <form>
                  <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="color-all"
                    />
                    <label className="custom-control-label" htmlFor="price-all">
                      All Color
                    </label>
                    <span className="badge border font-weight-normal">
                      1000
                    </span>
                  </div>
                  <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="color-1"
                    />
                    <label className="custom-control-label" htmlFor="color-1">
                      Black
                    </label>
                    <span className="badge border font-weight-normal">150</span>
                  </div>
                  <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="color-2"
                    />
                    <label className="custom-control-label" htmlFor="color-2">
                      White
                    </label>
                    <span className="badge border font-weight-normal">295</span>
                  </div>
                  <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="color-3"
                    />
                    <label className="custom-control-label" htmlFor="color-3">
                      Red
                    </label>
                    <span className="badge border font-weight-normal">246</span>
                  </div>
                  <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="color-4"
                    />
                    <label className="custom-control-label" htmlFor="color-4">
                      Blue
                    </label>
                    <span className="badge border font-weight-normal">145</span>
                  </div>
                  <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="color-5"
                    />
                    <label className="custom-control-label" htmlFor="color-5">
                      Green
                    </label>
                    <span className="badge border font-weight-normal">168</span>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-9 col-md-8">
              <div className="row pb-3">
                <div className="col-12 pb-1"></div>
                {shopProducts.map((product, i) => (
                  <div className="col-lg-4 col-md-6 col-sm-6 pb-1" key={i}>
                    <Product product={product} />
                  </div>
                ))}
                <div className="col-12">
                  <nav>
                    <ul className="pagination justify-content-center">
                      {paginator.has_prev && (
                        <>
                          <li className="page-item">
                            <Link
                              to={`/shop/?${
                                keyword ? `search=${keyword}&` : ""
                              }page=${page - 1}`}
                              className="page-link text-dark"
                              onClick={() => setPage(page - 1)}
                            >
                              Previous
                            </Link>
                          </li>
                        </>
                      )}

                      {[...Array(paginator.num_pages).keys()].map(
                        (pageNum, i) => (
                          <li
                            className={`page-item ${
                              pageNum + 1 === page && "active"
                            }`}
                            key={i}
                          >
                            <Link
                              to={`/shop/?${
                                keyword ? `search=${keyword}&` : ""
                              }page=${pageNum + 1}`}
                              className="page-link text-dark"
                              onClick={() => setPage(pageNum + 1)}
                            >
                              {pageNum + 1}{" "}
                            </Link>
                          </li>
                        )
                      )}
                      {paginator.has_next && (
                        <>
                          <li className="page-item">
                            <Link
                              to={`/shop/?${
                                keyword ? `search=${keyword}&` : ""
                              }page=${page + 1}`}
                              className="page-link text-dark"
                              onClick={() => setPage(page + 1)}
                            >
                              Next
                            </Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
          
          </>
      )}
    </div>
  );
}

export default Shop 
