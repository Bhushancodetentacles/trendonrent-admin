import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useFormik } from "formik/dist"
import { validationSchema } from "pages/validationSchema/customerValidationSchema"
import { post } from "helpers/api_helper"
import {
  addCustomerFail,
  addCustomerSuccess,
  getCustomersSuccess,
} from "store/actions"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import axios from "axios"
import { Errorhandler } from "Error/ErrorHandler"
import { CleanHands } from "@mui/icons-material"
const AddCustomers = () => {
  const [loader, setLoader] = useState(false)
  const [imagePath, setImagePath] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialValues = {
    firstName: null,
    lastName: "",
    mobileNo: "",
    gender: "",
    age: '',
    secondaryMobileNo: "",
    adharCardNo: "",
    aadharCardPhoto: "",
    panCardNo: "",
    primaryAddress: "",
    dateOfBirth: "",
    marriageAnniversary: new Date(),
    referalMobileNo: "",
  }
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async data => {
      try {
        setLoader(true)
        const res = await post("/Customer/add", data)
        const result = await res.data
        console.log("Customer add response : ", result)
        data["customerId"] = result.getResult.customerId
        // data["age"] = age
        console.log("Data : ", data)
        const measurementResp = await post("/Customer/addMeasure", data)
        console.log("measure add response : ", result)
        setLoader(false)
        toast.success("Customer added successfully!")
        navigate("/Customers")
      } catch (error) {
        setLoader(false)
        toast.error("Something went wrong...")
        dispatch(addCustomerFail(error))
        console.log("Add customer error : ", error)
      }
    },
  })

  const handleAdharCardImage = async e => {
    try {
      const formData = new FormData()
      formData.append("file", e.target.files[0])
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}Common/UploadImage?type=3`,
        formData
      )
      if (res.status === 200) {
        const result = res.data.data.model.filePath
        setFieldValue("aadharCardPhoto", result)
        setImagePath(result)
      } else {
        throw new Error("Unable to upload image!")
      }
    } catch (error) {
      console.log("Image upload error : ", error)
      Errorhandler(error)
    }
  }

  // to calculate age start
  const [age, setAge] = useState("")
  let calculateAge = () => {
    console.log(values.dateOfBirth)
    const date1= new Date(values.dateOfBirth)
    const todaysDate = new Date()
    console.log(todaysDate)
    const year = todaysDate.getFullYear()
    const month = String(todaysDate.getMonth() + 1).padStart(2, "0")
    const day = String(todaysDate.getDate()).padStart(2, "0")
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate)
    const date2= new Date(formattedDate)
    const difference= Math.abs(date1-date2)
    const differenceDays = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
    console.log(differenceDays)
    setAge(differenceDays==NaN ? "" : differenceDays)
  }

  useEffect(() => {
    calculateAge()
  }, [values])

  useEffect(() => {
    // Assign the dynamic value to the 'age' field
    setFieldValue('age', age);
  }, [setFieldValue, age]);
  // to calculate age end

  useEffect(() => {
    // While add customer page is active, the customer tab must also activated
    let element = document.getElementById("customer_tab")
    if (element) {
      element.classList.add("mm-active") // Add the 'active' class to the element
    }
    return () => {
      if (element) {
        element.classList.remove("mm-active") // remove the 'active' class to the element when change to another page
      }
    }
  }, [])

  console.log(values)
  console.log(errors)

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title="Dashboard"
            breadcrumbItem="Add Customer"
            path={"/dashboard"}
            path1={"/Customers"}
            title1={"Customer"}
          />

          <div className="row">
            <div className="col-xs-12">
              <form onSubmit={handleSubmit}>
                <div className="card">
                  <div className="card-body">
                    <div className="card-title mb-3 card-title_h3">
                      Basic Information
                    </div>

                    <div className="row">
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="firstname">First Name</label>
                          <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.firstName && touched.firstName && (
                            <span style={{ color: "red" }}>
                              {errors.firstName}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="gender">Last Name</label>
                          <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.lastName && touched.lastName && (
                            <span style={{ color: "red" }}>
                              {errors.lastName}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="gender">Gender</label>
                          <div
                            className="w-100"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <span className="p-1">
                              <input
                                type="radio"
                                name="gender"
                                value="female"
                              />
                              <span className="p-1">Female</span>
                            </span>
                            <span className="p-1">
                              <input type="radio" name="gender" value="male" />
                              <span className="p-1">Male</span>
                            </span>
                          </div>
                          {errors.gender && touched.gender && (
                            <span style={{ color: "red" }}>
                              {errors.gender}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="birthdate">Birth Date</label>
                          <input
                            className="form-control"
                            id="dateOfBirth"
                            type="date"
                            placeholder="Birth Date"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.dateOfBirth && touched.dateOfBirth && (
                            <span style={{ color: "red" }}>
                              {errors.dateOfBirth}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="age">Age</label>
                          <input
                            id="age"
                            name="age"
                            type="number"
                            className="form-control"
                            placeholder="Age"
                            // value={age}
                            disabled
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={3}
                            value={values.age}
                          />
                          {errors.age && touched.age && (
                            <span style={{ color: "red" }}>{errors.age}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="mobilenumber">Mobile Number</label>
                          <input
                            id="mobileNo"
                            name="mobileNo"
                            type="tel"
                            className="form-control"
                            placeholder="Mobile Number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={10}
                          />
                          {errors.mobileNo && touched.mobileNo && (
                            <span style={{ color: "red" }}>
                              {errors.mobileNo}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="alternativemobileno">
                            Alternative Mobile Number
                          </label>
                          <input
                            id="secondaryMobileNo"
                            name="secondaryMobileNo"
                            type="tel"
                            className="form-control"
                            placeholder="Mobile Number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={10}
                          />
                          {errors.secondaryMobileNo &&
                            touched.secondaryMobileNo && (
                              <span style={{ color: "red" }}>
                                {errors.secondaryMobileNo}
                              </span>
                            )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="referalMobileNo">
                            Referral Mobile Number
                          </label>
                          <input
                            id="referalMobileNo"
                            name="referalMobileNo"
                            type="tel"
                            className="form-control"
                            placeholder="Reference Mobile Number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={10}
                          />
                          {errors.referalMobileNo &&
                            touched.referalMobileNo && (
                              <span style={{ color: "red" }}>
                                {errors.referalMobileNo}
                              </span>
                            )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="adharcard">Aadhar Card Number</label>
                          <input
                            id="adharCardNo"
                            name="adharCardNo"
                            type="text"
                            className="form-control"
                            placeholder="Aadhar Number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={12}
                          />
                          {errors.adharCardNo && touched.adharCardNo && (
                            <span style={{ color: "red" }}>
                              {errors.adharCardNo}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="adharcardphoto">
                            Aadhar Card Photo
                          </label>
                          <input
                            className="form-control"
                            placeholder="Adhar Card Photo"
                            name="adharcardphoto"
                            accept="image/png,image/jpeg"
                            id="adharcardphoto"
                            multiple="multiple"
                            type="file"
                            onChange={e => handleAdharCardImage(e)}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="anniversary">
                            Marriage Anniversary Date
                          </label>
                          <input
                            className="form-control"
                            id="marriageAnniversary"
                            type="date"
                            placeholder="Marriage Anniversary Date"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            // max={new Date().toISOString().substring(0, 10)}
                          />
                          {errors.marriageAnniversary &&
                            touched.marriageAnniversary && (
                              <span style={{ color: "red" }}>
                                {errors.marriageAnniversary}
                              </span>
                            )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="address">Primary address</label>
                          <textarea
                            className="form-control mb-3"
                            id="primaryAddress"
                            rows="4"
                            placeholder="Address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={200}
                          />
                          {errors.primaryAddress && touched.primaryAddress && (
                            <span style={{ color: "red" }}>
                              {errors.primaryAddress}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="row mb-3 mt-3">
                      <div className="card-title card-title_h3 mb-3">
                        Customer measurement
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="height">Height</label>
                          <input
                            id="height"
                            name="height"
                            type="number"
                            className="form-control"
                            placeholder="Height"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={4}
                            step=".01"
                          />
                          <small className="smalllabel">
                            Measure from the top to the head to the floor.Be
                            sure to stand straight
                          </small>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="suitDressSize">Suit/Dress Size</label>
                          <input
                            id="suitDressSize"
                            name="suitDressSize"
                            type="number"
                            className="form-control"
                            placeholder="Suit/Dress Size"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={4}
                            step=".01"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="shirtBlouseSize">
                            Shirt/Blouse Size
                          </label>
                          <input
                            id="shirtBlouseSize"
                            name="shirtBlouseSize"
                            type="number"
                            className="form-control"
                            placeholder="Shirt/Blouse Size"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={4}
                            step=".01"
                          />
                        </div>
                      </div>
                      {/* <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="hata">Hat(A)</label>
                          <input
                            id="hat"
                            name="hat"
                            type="number"
                            className="form-control"
                            placeholder="Hat(A)"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={4}
                            step=".01"
                          />
                          <small className="smalllabel">
                            Measure the circumference of the haed above the ears
                          </small>
                        </div>
                      </div> */}
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="shoulder">Shoulder(B)</label>
                          <input
                            id="shoulder"
                            name="shoulder"
                            type="number"
                            className="form-control"
                            placeholder="Shoulder(B)"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={4}
                            step=".01"
                          />
                          <small className="smalllabel">
                            Measure around the fullest part of the shoulder
                          </small>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="bust">Chest/Bust(C)</label>
                          <input
                            id="chestBust"
                            name="chestBust"
                            type="number"
                            className="form-control"
                            placeholder="Chest/Bust(C)"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={4}
                            step=".01"
                          />
                          <small className="smalllabel">
                            Measure around the fullest part of the chest
                          </small>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="sleeve">Sleeve(D)</label>
                          <input
                            id="sleeve"
                            name="sleeve"
                            type="number"
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={4}
                            step=".01"
                          />
                          <small className="smalllabel">
                            Measure from the shoulder to the waist
                          </small>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="waist">Waist(E)</label>
                          <input
                            id="waist"
                            name="waist"
                            type="number"
                            className="form-control"
                            placeholder="Waist(E)"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={4}
                            step=".01"
                          />
                          <small className="smalllabel">
                            Measure at the natural waist
                          </small>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="inseam">Inseam(F)</label>
                          <input
                            id="inseam"
                            name="inseam"
                            type="number"
                            className="form-control"
                            placeholder="Inseam(F)"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={4}
                            step=".01"
                          />
                          <small className="smalllabel">
                            Measure from the crotch to the desired trouser
                            length
                          </small>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="hips">Hips(G)</label>
                          <input
                            id="hips"
                            name="hips"
                            type="number"
                            className="form-control"
                            placeholder="Hips(G)"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={4}
                            step=".01"
                          />
                          <small className="smalllabel">
                            Measure around the fullest part of the hips
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap gap-2">
                      <Button
                        type="submit"
                        color="primary"
                        className="btn"
                        disabled={loader}
                      >
                        Submit
                      </Button>
                      <Link
                        type="submit"
                        to="/Customers"
                        color="secondary"
                        className="btn btn-secondary"
                      >
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* </div>
        <Footer></Footer>
        </div> */}
    </React.Fragment>
  )
}

export default AddCustomers
