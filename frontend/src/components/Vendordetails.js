import React, { useState, useEffect } from "react";
import "./Vendordetails.css";
import Form from "./Form";
import Tabledata from "./Tabledata";
import axios from "axios";

const Vendordetails = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [isEditMode, setEditMode] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  // const [searchQuery, setSearchQuery] = useState("");

  const handleToggleForm = () => {
    setFormVisible(!isFormVisible);
    setEditMode(false); // Disable edit mode when opening the form
    setSelectedVendor(null); // Clear selected vendor data
  };

  const handleCloseForm = () => {
    setFormVisible(false);
    setEditMode(false); // Disable edit mode when closing the form
    setSelectedVendor(null); // Clear selected vendor data
  };

  const handleEdit = (vendorData) => {
    setFormVisible(true); // Show the form
    setEditMode(true); // Enable edit mode
    setSelectedVendor(vendorData); // Set the selected vendor data
  };

  //Get the data
  const getFetchData = async () => {
    try {
      const data = await axios.get(
        "https://bank-passbook-details.onrender.com/"
      );
      console.log(data);
      if (data.data.success) {
        setDataList(data.data.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getFetchData();
  }, []);

  console.log(dataList);

  //Delete Data

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (shouldDelete) {
      try {
        const data = await axios.delete(
          "https://bank-passbook-details.onrender.com/delete/" + id
        );
        if (data.data.success) {
          alert(data.data.message);
          getFetchData();
        } else {
          alert("Deletion failed. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while deleting the data.");
      }
    } else {
      alert("Deletion canceled.");
    }
  };

  //update the data
  const handleUpdate = async (id, formData) => {
    try {
      const data = await axios.put(
        `https://bank-passbook-details.onrender.com/update/${id}`,
        formData
      );
      if (data.data.success) {
        alert(data.data.message);
        getFetchData();
        setEditMode(false); // Disable edit mode
        setSelectedVendor(null); // Clear selected vendor data
        setFormVisible(false); // Close the form
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // //Search function
  // const handleSearch = () => {
  //   // Filter the dataList based on the searchQuery
  //   const filteredData = dataList.filter((vendor) =>
  //     vendor.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  //   setDataList(filteredData);
  // };

  return (
    <div>
      <h1>Vendor Details</h1>
      <div className="container">
        {isFormVisible ? (
          <>
            <div className="vendor-container">
              <Form
                onClose={handleCloseForm}
                dataList={dataList}
                getFetchData={getFetchData}
                isEditMode={isEditMode}
                selectedVendor={selectedVendor}
                handleUpdate={handleUpdate}
              />
            </div>
          </>
        ) : (
          <>
            <button className="btn" onClick={handleToggleForm}>
              ADD
            </button>
            {/* <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn" onClick={handleSearch}>
              Search
            </button> */}
          </>
        )}
      </div>
      {!isFormVisible && (
        <Tabledata
          dataList={dataList}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default Vendordetails;
