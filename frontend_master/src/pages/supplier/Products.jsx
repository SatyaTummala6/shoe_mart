import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import userServices from "../../features/userServices";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { getSupplierProducts } = userServices;

const Clients = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define columns for the DataTable
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "5%",
    },
    {
      name: "Title",
      selector: (row) => row.title || "Not Available",
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category_id.name || "Not Available",
      sortable: true,
    },
    {
      name: "Brand",
      selector: (row) => row.brand || "Not Available",
      sortable: true,
    },
    {
      name: "Model",
      selector: (row) => row.model || "Not Available",

      sortable: true,
    },
    {
      name: "Item Group",
      selector: (row) =>
        row.group || "Unknown",
      sortable: true,
    },
    {
      name: "color",
      selector: (row) => row.color || "N/A", // Default if remarks are missing
    },
    {
      name: "Size",
      selector: (row) =>
        row.size || "Unknown",
      sortable: true,
    },
    {
      name: "Customer Size",
      selector: (row) => row.customer_size || "N/A", // Default if remarks are missing
    },
    {
      name: "Color",
      selector: (row) => row.color || "N/A", // Default if remarks are missing
    },
    {
      name: "MRP",
      selector: (row) => row.mrp || "N/A", // Default if remarks are missing
    },
    {
      name: "Rate",
      selector: (row) => row.rate || "N/A", // Default if remarks are missing
    },
    {
      name: "Offer Rate",
      selector: (row) => row.offer_rate || "N/A", // Default if remarks are missing
    },
    {
      name: "Customer Rate",
      selector: (row) => row.customer_rate || "N/A", // Default if remarks are missing
    },
    {
      name: "Description",
      selector: (row) => row.description || "N/A", // Default if remarks are missing
    },
    // {
    //   name: "Primary Image",
    //   selector: (row) => row.description || "N/A", // Default if remarks are missing
    // },
    {
      name: "Status",
      selector: (row) => (row.status ? "Active" : "Inactive"),
      sortable: true,
    },
    
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(row)}
            className="text-blue-500 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // Fetch dynamic data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getSupplierProducts();

        if (Array.isArray(products)) {
          setData(products);
        } else {
          setData([]); // or transform to an array if necessary
        }
      } catch (error) {
        console.error("Error fetching categories data:", error);
        setData([]); // Set to an empty array to avoid errors
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);


  // Action Handlers
  const handleEdit = (row) => {
    alert(`Edit clicked for ${row.name}`);
  };

  const handleDelete = (row) => {
    alert(`Delete clicked for ${row.name}`);
  };

  return (
    <div
      className="ml-[200px] mt-14 p-4 bg-white min-h-full flex items-center justify-center"
    >
      <section className="bg-gray-200 shadow-md rounded-lg p-4 w-full min-h-full min-w-fit">


        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Products</h2>
          <Link to="/supplier/add-product" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add Product
          </Link>
        </div>


        <DataTable
          columns={columns}
          data={data}
          progressPending={loading}
          pagination
        />
      </section>
      <ToastContainer />
    </div>

  );
};


export default Clients;
