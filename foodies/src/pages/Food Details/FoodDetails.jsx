import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchFoodById } from "../../Service/FoodService";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

const FoodDetails = () => {
  const { id } = useParams();
  const { token } = useContext(StoreContext); // ✅ get token from context
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFoodDetails = async () => {
      try {
        if (!token) {
          toast.error("You must be logged in to view food details");
          return;
        }
        const foodData = await fetchFoodById(id, token); // ✅ correct API call
        setData(foodData);
      } catch (error) {
        toast.error("Error displaying food details");
        console.error("error", error);
      } finally {
        setLoading(false);
      }
    };
    loadFoodDetails();
  }, [id, token]);

  if (loading) return <p>Loading...</p>;

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <img
              className="card-img-top mb-5 mb-md-0"
              src={data.imageUrl}
              alt={data.name}
              height={400}
              width={350}
            />
          </div>
          <div className="col-md-6">
            <div className="fs-5 mb-1">
              Category :
              <span className="badge text-bg-warning">{data.category}</span>
            </div>
            <h1 className="display-5 fw-bolder">{data.name}</h1>
            <div className="fs-5 mb-2">
              <span>&#8377;{data.price}</span>
            </div>
            <p className="lead">{data.description}</p>
            <div className="d-flex">
              <button className="btn btn-outline-dark flex-shrink-0" type="button">
                <i className="bi-cart-fill me-1"></i>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodDetails;
