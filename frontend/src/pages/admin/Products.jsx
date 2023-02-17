import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../slices/ProductSlice";
import Spinner from "../../components/Spinner";
import { useNavigate, Link } from "react-router-dom";
import { deleteProduct } from "../../slices/ProductSlice";

function Products() {
  const { user } = useSelector((state) => state.auth);
  const { loading, products } = useSelector((state) => state.products);
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);



  useEffect(() => {
    if (!user.is_admin) {
      redirect("/");
    } else {
      
      // Fetch Products on load/mounted
      dispatch(fetchProducts());
    }
  }, [dispatch, user, redirect]);

  // Delete Product on click
  const handleDeleteProduct = (id) => {
    setModal(false);
    dispatch(deleteProduct({ id, token: user.access }));
  };

  // Handle Product Update
  const handleProductUpdate = (id) => {
    redirect(`/admin/product/update/${id}`)
  }

  return (
    <div className="container">
      {user.is_admin && (
        <>
          {loading ? (
            <Spinner />
          ) : (
            <div>
              {modal && (
                <div className="delete-modal fixed-top">
                  <div>
                    <h2 className="text-center mb-4">Delete Product?</h2>
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleDeleteProduct(id);
                          setModal(false);
                        }}
                      >
                        Yes
                      </button>
                      <button
                        className="btn btn-warning ml-3"
                        onClick={() => setModal(false)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="d-flex mt-2 mb-4 justify-content-between">
                <h1>Products</h1>
                <Link to="/admin/product/create/">
                  <button className="btn btn-dark"> Add Product <i className="fa fa-plus"></i></button>
                </Link>
              </div>
              <div className="responsive-table">
                <table className="table table-hover table-bordered">
                  <caption>List of Products</caption>
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">NAME</th>
                      <th scope="col">PRICE</th>
                      <th scope="col">CATEGORY</th>
                      <th scope="col">STOCK</th>
                      <th scope="col">OPTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, i) => (
                      <tr key={product.id}>
                        <th scope="row">{i + 1}</th>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.count_in_stock}</td>
                        <td className="">
                          <button
                            className="btn btn-danger fa fa-trash m-1"
                            onClick={() => {
                              setId(product.id);
                              setModal(true);
                            }}
                          ></button>
                          <button
                            className="btn btn-info fa fa-edit m-1"
                            onClick={() => handleProductUpdate(product.id)}
                          ></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Products;
