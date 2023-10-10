import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MdClose } from "react-icons/md";
import "./Form.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Form = (props) => {
  const {
    onClose,
    dataList,
    getFetchData,
    isEditMode,
    selectedVendor,
    handleUpdate,
  } = props;

  useEffect(() => {
    if (isEditMode && selectedVendor) {
      setFormData(selectedVendor);
    }
  }, [isEditMode, selectedVendor]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    bankname: "",
    accountNumber: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  // State variables for error messages
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [accountNumberError, setAccountNumberError] = useState("");

  const handleOnChange = (e) => {
    const { value, name } = e.target;

    // Validation for mobile number
    if (name === "mobileNumber" && !/^\d+$/.test(value)) {
      setMobileNumberError("Mobile number must contain only digits");
    } else {
      setMobileNumberError("");
    }

    // Validation for account number
    if (name === "accountNumber" && !/^\d+$/.test(value)) {
      setAccountNumberError("Account number must contain only digits");
    } else {
      setAccountNumberError("");
    }

    setFormData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  //Submit the data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      // If in edit mode, call handleUpdate to update the data
      await handleUpdate(selectedVendor._id, formData);
      getFetchData();
    } else {
      try {
        const data = await axios.post(
          "https://bank-passbook-details.onrender.com/create",
          formData
        );
        console.log(data);
        if (data.data.success) {
          onClose();
          alert(data.data.message);
          getFetchData();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      bankname: "",
      accountNumber: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    });
    onClose();
  };

  //Close the form
  const handleClose = () => {
    onClose(); // Call the onClose function passed from the parent component
  };
  console.log(dataList);

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="close-btn" onClick={handleClose}>
          <MdClose />
        </div>
        <React.Fragment>
          <Typography variant="h5" gutterBottom className="title">
            Vendor Management System
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                onChange={handleOnChange}
                value={formData.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                onChange={handleOnChange}
                value={formData.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                onChange={handleOnChange}
                value={formData.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="mobileNumber"
                name="mobileNumber"
                label="Mobile Number"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                onChange={handleOnChange}
                value={formData.mobileNumber}
                error={mobileNumberError !== ""}
                helperText={mobileNumberError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="bankname"
                name="bankname"
                label="Bank name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                onChange={handleOnChange}
                value={formData.bankname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="accountNumber"
                name="accountNumber"
                label="Account Number"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                onChange={handleOnChange}
                value={formData.accountNumber}
                error={accountNumberError !== ""}
                helperText={accountNumberError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address1"
                name="address1"
                label="Address line 1"
                fullWidth
                autoComplete="shipping address-line1"
                variant="standard"
                onChange={handleOnChange}
                value={formData.address1}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address2"
                name="address2"
                label="Address line 2"
                fullWidth
                autoComplete="shipping address-line2"
                variant="standard"
                onChange={handleOnChange}
                value={formData.address2}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="shipping address-level2"
                variant="standard"
                onChange={handleOnChange}
                value={formData.city}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                name="state"
                label="State/Province/Region"
                fullWidth
                variant="standard"
                onChange={handleOnChange}
                value={formData.state}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="zip"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="shipping postal-code"
                variant="standard"
                onChange={handleOnChange}
                value={formData.zip}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="shipping country"
                variant="standard"
                sx={{ mb: 5 }}
                onChange={handleOnChange}
                value={formData.country}
              />
            </Grid>

            <Button
              type="submit"
              variant="contained"
              style={{ margin: "auto" }}
            >
              {isEditMode ? "Update" : "Submit"}
            </Button>
          </Grid>
        </React.Fragment>
      </form>
    </div>
  );
};

export default Form;
