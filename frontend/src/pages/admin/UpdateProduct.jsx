import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct, fetchProduct } from "../../slices/ProductSlice";
import { useSelector, useDispatch } from "react-redux";
import { Rating } from "../../components/Product";
import Spinner from "../../components/Spinner";

function UpdateProduct() {
  const params = useParams()
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading, product } = useSelector((state) => state.products);
  const [credential, setCredential] = useState({
    name: "",
    brand: "",
    image: "",
    category: "",
    count_in_stock: "",
    description: "",
    price: "",
  });

  
  const { name, brand, category, image, count_in_stock, description, price } = credential;
  const [pics, setPics] = useState("")

  // ====== Fetch product by ID on load ======
   useEffect(() => {
    if (!user.is_admin) {
      redirect("/");
    } else {
      dispatch(fetchProduct(params.id))
    }
    // eslint-disable-next-line
  }, []);
  // ====================================
 useEffect(() => {
   setCredential(product);
   setPics(product.image)
 }, [product]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(); 
      
    
    data.append("name", name);
    data.append("brand", brand);
    data.append("image", image);
    data.append("category", category);
    data.append("stock", count_in_stock);
    data.append("price", price);
    data.append("description", description);

    dispatch(updateProduct({ credential: data, token: user.access, id: product.id }));
  };

  const handleChange = (e) => {
    if (e.target.files) {
      setCredential((prev) => ({
        ...prev,
        image: e.target.files[0],
      }));

      let [file] = e.target.files;
      let img = document.querySelector("img");
      img.src = URL.createObjectURL(file);
      setPics(img.src)
      img.onload = () => URL.revokeObjectURL(file);
    }
    if (!e.target.files) {
      setCredential((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    }
  };

 

  return (
    <div className="container">
      {user && (
        <>
          {
            loading ?
              <Spinner />
            :
          <div className="row justify-content-around">
            <div className="col-sm-7">
              <h2 className="mt-2 mb-3">Update "{name}" Product</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="brand">Brand</label>
                  <input
                    type="text"
                    id="brand"
                    className="form-control"
                    value={brand}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="custom-file mb-3">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="image"
                    onChange={handleChange}
                    accept=".jpg,.png.jpeg "
                  />
                  <label className="custom-file-label" htmlFor="image">
                    Choose file
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    className="form-control"
                    id="category"
                    value={category}
                    onChange={handleChange}
                    required
                  >
                    <option></option>
                    <option>ELECTRONICS</option>
                    <option>WATCHES</option>
                    <option>BAGS</option>
                    <option>SHOES</option>
                    <option>CLOTHS</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="stock">No. in stock</label>
                  <input
                    type="number"
                    min={0}
                    id="count_in_stock"
                    className="form-control"
                    value={count_in_stock}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    min={0}
                    id="price"
                    className="form-control"
                    value={price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="5"
                    value={description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-dark btn-block mb-4">
                  Add
                </button>
              </form>
            </div>

            <div className="col-sm-4">
              <div className="card  new-product">
                <img src={pics} alt="" className="img-fluid" />
                <div className="card-body text-center">
                  <h5 className="title font-weight-bold">{name}</h5>
                  <Rating value={0} />
                  <div className="card-text text-left">
                    {price && <p className="my-1">Price : ${price}</p>}
                    {brand && <p className="my-1">Brand : {brand}</p>}
                    {category && (
                      <p className="my-1">Category : {category.toLowerCase()}</p>
                    )}
                    {count_in_stock && <p className="my-1">Stock No : {count_in_stock}</p>}
                    {description && (
                      <p className="my-1">Description : {description}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          }
        </>
      )}
    </div>
  );
}

export default UpdateProduct;
