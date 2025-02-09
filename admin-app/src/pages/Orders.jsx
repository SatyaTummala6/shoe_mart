import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import adminServices from "../features/adminServices";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { getAllOrders, updateOrderStatus } = adminServices;

const Orders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await updateOrderStatus({ id, status: newStatus });
    
      if (response.status == 200) {
        alert("Status updated successfully!");
      } else {
        alert("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("An error occurred while updating the status.");
    }
  };
  

  // Define columns for the DataTable
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "5%",
    },
    {
      name: "Retailer Details",
      selector: (row) => (
        <>
          <div className="justify-between">Firm Name: {row.client_id.firm_name}</div>
          <div className="justify-between">City: {row.client_id.city}</div>
          <div className="justify-between">Mobile: {row.client_id.mobile || ""}</div>
        </>
      ),
      sortable: true,
    },
    {
      name: "Requested Quantity",
      selector: (row) => row.requested_total_quantity || "",
      sortable: true,
    },
    {
      name: "Accepted Quantity",
      selector: (row) => row.accepted_total_quantity || "",
      sortable: true,
    },
    {
      name: "Requested Total",
      selector: (row) => row.requested_grand_total || "",
      sortable: true,
    },
    {
      name: "Accepted Total",
      selector: (row) => row.accepted_grand_total || "",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <>
          <select
            value={row.status}
            onChange={(e) => handleStatusChange(row._id, e.target.value)}
            disabled={row.status === "Completed"} // Disable the select if the status is "Completed"
          >
            <option value="Pending" disabled={row.status === "Cancelled" || row.status === "Completed" || row.status === "Accepted"}>
              Pending
            </option>
            <option value="Accepted" disabled={row.status === "Cancelled" || row.status === "Completed"}>
            Accepted
            </option>
            <option value="Cancelled" disabled={row.status === "Completed" || row.status === "Accepted"}>
              Cancelled
            </option>
            <option value="Completed" disabled={row.status === "Pending" || row.status === "Cancelled"}>
              Completed
            </option>
          </select>
        </>
      ) || "N/A",
    },

    {
      name: "Order Date",
      selector: (row) => row.order_date,
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => {
        return (
          <div className="flex space-x-2">
            {row.status !== 'Completed' && row.status !== 'Cancelled' && (
              <>
                <Link to={`/edit-order/${row._id}`} className="text-blue-500 hover:underline">
                  Edit
                </Link>
               
              </>
            )}
          </div>
        );
      }
      
    },
  ];

  // Fetch dynamic data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderdat = await getAllOrders();
        console.log(orderdat);

        setData(orderdat);


      } catch (error) {
        console.error("Error fetching categories data:", error);
        setData([]); // Set to an empty array to avoid errors
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);



  const handleDelete = (row) => {
    alert(`Delete clicked for ${row.name}`);
  };

  return (
    <div
      className="ml-[200px] mt-14 p-4 bg-white min-h-full flex items-center justify-center"
    >
      <section className="bg-gray-200 shadow-md rounded-lg p-4 w-full min-h-full min-w-fit">


        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Orders</h2>

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


export default Orders;
