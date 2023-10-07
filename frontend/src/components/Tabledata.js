import React from "react";
import "./Tabledata.css";

const Tabledata = (props) => {
  const { dataList, handleEdit, handleDelete } = props;
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>AccountNumber</th>
            <th>MobileNumber</th>
            <th>Bank Name</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        {dataList[0] ? (
          <tbody>
            {dataList.map((userData, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{userData.firstName}</td>
                  <td>{userData.lastName}</td>
                  <td>{userData.accountNumber}</td>
                  <td>{userData.mobileNumber}</td>
                  <td>{userData.bankname}</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => {
                        handleEdit(userData);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(userData._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <p className="info">No data</p>
        )}
      </table>
    </div>
  );
};

export default Tabledata;
