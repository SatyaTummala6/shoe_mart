import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import userServices from "../features/userServices";

const { getEmployeeData } = userServices;

const Employees = () => {
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
      name: "Firm Name",
      selector: (row) => row.firm_name || "Not Available",
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.city || "Not Available",
      sortable: true,
    },
    {
      name: "Mobile No",
      selector: (row) => row.mobile || "Not Available",

      sortable: true,
    },
    {
      name: "Category",
      selector: (row) =>
        row.category_id.name || "Unknown",
      sortable: true,
    },
    {
      name: "Remarks",
      selector: (row) => row.remarks || "N/A", // Default if remarks are missing
    },
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
        const employees = await getEmployeeData();
        setData(employees);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employees data:", error);
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
 


        <h2 className="text-xl font-semibold mb-4">Employees</h2>
        <DataTable
          columns={columns}
          data={data}
          progressPending={loading}
          pagination
        />
      </section>
    </div>

  );
};

export default Employees;
