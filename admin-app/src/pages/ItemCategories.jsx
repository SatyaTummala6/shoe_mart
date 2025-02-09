import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import adminServices from '../features/adminServices';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { getItemCatgories } = adminServices;

const ItemCategories = () => {
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
      name: "Name",
      selector: (row) => row.name || "Not Available",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (row.status ? "Active" : "Inactive"),
      sortable: true,
    },
    {
        name: "Description",
        selector: (row) => row.description || "Not Available",
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
        const itemcatgories = await getItemCatgories();
     
        if (Array.isArray(itemcatgories)) {
          setData(itemcatgories);
        } else {
          setData([]); // or transform to an array if necessary
        }
      } catch (error) {
        console.error("Error fetching categories data:", error);
        setData([]); // Set to an empty array to avoid errors
      } finally {
        setLoading(false);
      }
    };
    

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
    <h2 className="text-xl font-semibold">Item Categories</h2>
    <Link to="/add-item-category" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add Item Category
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

export default ItemCategories;
