import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

const Orders = () => {
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
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
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

  // Fetch data (mock example)
  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setData([
        { id: 1, name: "John Doe", email: "john.doe@example.com", contact: "123-456-7890" },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com", contact: "987-654-3210" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Action Handlers
  const handleEdit = (row) => {
    alert(`Edit clicked for ${row.name}`);
  };

  const handleDelete = (row) => {
    alert(`Delete clicked for ${row.name}`);
  };

  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Orders</h2>
        <DataTable
          columns={columns}
          data={data}
          progressPending={loading}
          pagination
        />
      </div>
    </section>
  );
};

export default Orders;
