import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Meta from "../../components/retailer/Meta";
import BreadCrumb from "../../components/retailer/Breadcrumb";
import userServices from "../../features/userServices";
import { ROLES } from "../../utils/constants";
const { getAllProducts } = userServices;

const Shop = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getAllProducts(ROLES.RETAILER);

        if (Array.isArray(products)) {
          setData(products);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching categories data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (

    <>
      <Meta title="Shop" />
      <BreadCrumb title="Shop" />
      <div className="flex items-center justify-center">
        <section className="relative bg-white w-full flex items-center justify-center py-10 px-20">
          <div className="grid grid-cols-3 gap-4">
            {data.map((item) => (
              <div className="bg-gray-200 p-4 rounded-lg shadow-lg" key={item.id || item._id}>
                {/* Image */}
                <Link to={`/retailer/get-product/${item._id}`}>
                  <img
                    src={item.primary_image}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-t-lg cursor-pointer"
                  />
                </Link>
                {/* Content */}
                <div className="mt-4">
                  <h2 className="text-lg font-bold mt-1">{item.title}</h2>
                  <p className="text-gray-600 mt-1">{item.description.split(" ").slice(0, 10).join(" ")}...</p>
                  <div className="mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">CATEGORY:</span>
                      <span>{item.category_id.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">BRAND:</span>
                      <span>{item.brand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">MODEL:</span>
                      <span>{item.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">COLOR:</span>
                      <span>{item.color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">MRP:</span>
                      <span>{item.mrp}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">RATE:</span>
                      <span>{item.rate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  )
}

export default Shop