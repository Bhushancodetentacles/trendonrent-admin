import React, { useState, useEffect } from "react"
// import Header from "components/VerticalLayout/Header";
// import Footer from "components/VerticalLayout/Footer";
// import Sidebar from "components/VerticalLayout/Sidebar";

import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useDispatch } from "react-redux"
import { useFormik } from "formik/dist"
import { customerValidationSchema } from "pages/validationSchema/customerValidationSchema"
import { get, post } from "helpers/api_helper"

import { useParams } from "react-router-dom"
import { Errorhandler } from "Error/ErrorHandler"
import { toast } from "react-toastify"
import axios from "axios"

// loader import
import { RotatingTriangles } from "react-loader-spinner"

const AddCustomers = () => {
  const [loader, setLoader] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const id = searchParams.get("id")
  let initialValues = {
    firstName: "",
    lastName: "",
    mobileNo: "",
    gender: "",
    age: "",
    secondaryMobileNo: "",
    referalMobileNo: "",
    adharCardNo: "",
    panCardNo: "",
    primaryAddress: "",
    dateOfBirth: new Date(),
    marriageAnniversary: "05-04-2023",
  }

  const initialMeasurement = {
    height: 0,
    suitDressSize: 0,
    shirtBlouseSize: 0,
    hat: 0,
    shoulder: 0,
    chestBust: 0,
    sleeve: 0,
    waist: 0,
    inseam: 0,
    hips: 0,
  }

  const [data, setData] = useState({ ...initialValues, ...initialMeasurement })
  const [validationError, setValidationError] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    age: "",
    secondaryMobileNo: "",
    adharCardNo: "",
    referalMobileNo: "",
  })

  const validate = () => {
    let result = true
    if (
      data.firstName.trim().length < 2 ||
      data.firstName.trim().length > 100 ||
      !/^[A-Za-z]+$/.test(data.firstName)
    ) {
      setValidationError(prevData => ({
        ...prevData,
        firstName: "Enter valid name",
      }))
      result = false
    } else {
      setValidationError(prevData => ({
        ...prevData,
        firstName: "",
      }))
    }

    if (
      data.lastName.trim().length < 2 ||
      data.lastName.trim().length > 100 ||
      !/^[A-Za-z]+$/.test(data.lastName)
    ) {
      result = false
      setValidationError(prevData => ({
        ...prevData,
        lastName: "Enter valid name",
      }))
    } else {
      setValidationError(prevData => ({
        ...prevData,
        lastName: "",
      }))
    }

    if (
      !/^\d*$/.test(data.mobileNo) ||
      data.mobileNo.length < 10 ||
      data.mobileNo.length > 10
    ) {
      result = false
      setValidationError(prevData => ({
        ...prevData,
        mobileNo: "Enter valid mobile number",
      }))
    } else {
      setValidationError(prevData => ({
        ...prevData,
        mobileNo: "",
      }))
    }

    if (
      (data.secondaryMobileNo.length != 0 &&
        !/^\d*$/.test(data.secondaryMobileNo)) ||
      data.secondaryMobileNo.length < 10 ||
      data.secondaryMobileNo.length > 10
    ) {
      result = false
      setValidationError(prevData => ({
        ...prevData,
        secondaryMobileNo: "Enter valid secondary mobile number",
      }))
    } else {
      setValidationError(prevData => ({
        ...prevData,
        secondaryMobileNo: "",
      }))
    }

    if (
      (data.referalMobileNo.length != 0 &&
        !/^\d*$/.test(data.referalMobileNo)) ||
      data.referalMobileNo.length < 10 ||
      data.referalMobileNo.length > 10
    ) {
      result = false
      setValidationError(prevData => ({
        ...prevData,
        referalMobileNo: "Enter valid referral mobile number",
      }))
    } else {
      setValidationError(prevData => ({
        ...prevData,
        referalMobileNo: "",
      }))
    }

    if (
      (data.adharCardNo.length != 0 && !/^\d*$/.test(data.adharCardNo)) ||
      data.adharCardNo.length < 12 ||
      data.adharCardNo.length > 12
    ) {
      result = false
      setValidationError(prevData => ({
        ...prevData,
        adharCardNo: "Enter valid aadhar number",
      }))
    } else {
      setValidationError(prevData => ({
        ...prevData,
        adharCardNo: "",
      }))
    }

    if (data.age.length < 2 || data.age.length > 100) {
      result = false
      setValidationError(prevData => ({ ...prevData, age: "Enter valid age" }))
    } else {
      setValidationError(prevData => ({
        ...prevData,
        age: "",
      }))
    }
    return validate
  }

  const handleSubmit = async () => {
    try {
      // debugger
      if (!validate()) return
      setLoader(true)
      setIsLoading(true)
      const res = await post("/Customer/update", data)
      const result = await res.data
      console.log("Customer update response : ", result)
      console.log("Data : ", data)
      data["customerId"] = result.getResult.customerId
      const measurementResp = await post("/Customer/updateMeasure", data)
      setIsLoading(false)
      setLoader(false)
      toast.success("Customer data updated successfully!")
      navigate("/Customers")
    } catch (error) {
      setLoader(false)
      toast.error("Something went wrong...")
      console.log("Add customer error : ", error)
    }
  }

  const handleChange = e => {
    if (
      e.target.type != "number" ||
      (e.target.type == "number" && e.target.value >= 0)
    ) {
      setData(prevData => ({ ...prevData, [e.target.id]: e.target.value }))
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  // const handleAdharCardImage = async e => {
  //   try {
  //     const formData = new FormData()
  //     formData.append("file", e.target.files[0])
  //     formData.append("type", 3)

  //     const res = await axios.post(
  //       `${process.env.REACT_APP_BASE_URL}Common/UploadImage`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     )
  //     const result = res.data.data.model.filePath
  //     setData(prevData => ({ ...prevData, aadharCardPhoto: result }))
  //   } catch (error) {
  //     console.log("Image upload error : ", error)
  //     Errorhandler(error)
  //   }
  // }

  const getCustomerData = async () => {
    // debugger
    try {
      if (id && id.length) {
        const res = await get(`/Customer/view?id=${id}`)
        const result = res?.data?.result ? await res.data.result : initialValues
        const measurementResp = await get(
          `/Customer/getMeasureByCustomerId?id=${id}`
        )
        const measurementData = measurementResp?.data?.result
          ? await measurementResp.data.result
          : initialMeasurement
        setData({ ...result, ...measurementData })
      } else {
        navigate("/Customers")
      }
    } catch (error) {
      setData(initialValues)
      console.log("Customer view error : ", error)
      Errorhandler(error)
      // dispatch(deleteCustomerFail(error))
    }
  }

  // const { handleChange, handleBlur, handleSubmit, errors, touched, values } =
  //   useFormik({
  //     initialValues: initialValues,
  //     onSubmit: async data => {
  //       try {
  //         if (id && id.length) {
  //           setLoader(true)
  //           data["customerId"] = id
  //           data["password"] = "123"
  //           // data["panCardNo"] = "2343423423424"
  //           data["aadharCardPhoto"] = "test"
  //           const res = await post("/Customer/add", data)
  //           const result = await res.data
  //           console.log("add cat", result)
  //           setLoader(false)
  //           toast.success("Customer data updated successfully!")
  //           return
  //         }
  //         navigate("/Customers")
  //       } catch (error) {
  //         setLoader(false)
  //         // dispatch(addCustomerFail(error))
  //         Errorhandler(error)
  //         console.log("Edit customer error : ", error)
  //       }
  //     },
  //   })

  useEffect(() => {
    // While add customer page is active, the customer tab must also activated
    let element = document.getElementById("customer_tab")
    if (element) {
      element.classList.add("mm-active") // Add the 'active' class to the element
    }
    return () => {
      if (element) {
        element.classList.remove("mm-active") // remove the 'active' class to the element
      }
    }
  }, [])

  useEffect(() => {
    getCustomerData()
  }, [])

  return (
    <React.Fragment>
      {
        isLoading ? 
        <RotatingTriangles
        visible={true}
        height="80"
        width="80"
        ariaLabel="rotating-triangels-loading"
        wrapperStyle={{}}
        wrapperClass="rotating-triangels-wrapper"
      /> : 
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs
            title="Dashboard"
            breadcrumbItem="Edit Customer"
            path={"/dashboard"}
            path1={"/Customers"}
            title1={"Customer"}
          />

          <div className="row">
            <div className="col-xs-12">
              <div className="card">
                <div className="card-body">
                  <div className="card-title card-title_h3">Edit Information</div>
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
                          value={data.firstName}
                        />
                        <span style={{ color: "red" }}>
                          {validationError.firstName}
                        </span>
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
                          value={data.lastName}
                        />
                        <span style={{ color: "red" }}>
                          {validationError.lastName}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label htmlFor="gender">Gender</label>
                        <div className="w-100" onClick={handleChange}>
                          <span className="p-1">
                            <input
                              id="gender"
                              type="radio"
                              name="gender"
                              value="female"
                              checked={data.gender === "female"}
                            />
                            <span className="p-1">Female</span>
                          </span>
                          <span className="p-1">
                            <input
                              id="gender"
                              type="radio"
                              name="gender"
                              value="male"
                              checked={data.gender === "male"}
                            />
                            <span className="p-1">Male</span>
                          </span>
                        </div>
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
                          max={new Date().toISOString().substring(0, 10)}
                          value={new Date(data.dateOfBirth)
                            .toISOString()
                            .substring(0, 10)}
                        />
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
                          onChange={handleChange}
                          value={data.age}
                          max={4}
                        />
                        <span style={{ color: "red" }}>
                          {validationError.age}
                        </span>
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
                          value={data.mobileNo}
                          maxLength={10}
                        />
                        <span style={{ color: "red" }}>
                          {validationError.mobileNo}
                        </span>
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
                          value={data.secondaryMobileNo}
                          maxLength={10}
                        />
                        <span style={{ color: "red" }}>
                          {validationError.secondaryMobileNo}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label htmlFor="referenceno">
                          Referral Mobile Number
                        </label>
                        <input
                          id="referalMobileNo"
                          name="referalMobileNo"
                          type="tel"
                          className="form-control"
                          placeholder="Reference Mobile Number"
                          onChange={handleChange}
                          value={data.referalMobileNo}
                          maxLength={10}
                        />
                        <span style={{ color: "red" }}>
                          {validationError.referalMobileNo}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label htmlFor="adharCardNo">Aadhar Card Number</label>
                        <input
                          id="adharCardNo"
                          name="adharCardNo"
                          type="text"
                          className="form-control"
                          placeholder="Aadhar Number"
                          onChange={handleChange}
                          value={data.adharCardNo}
                          maxLength={12}
                        />
                        <span style={{ color: "red" }}>
                          {validationError.adharCardNo}
                        </span>
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
                          max={new Date().toISOString().substring(0, 10)}
                          value={new Date(data.marriageAnniversary)
                            .toISOString()
                            .substring(0, 10)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="row mb-3 mt-3">
                    <div className="card-title card-title_h3 mb-3">Customer measurement</div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="height">Height</label>
                        <input
                          id="height"
                          name="height"
                          type="number"
                          className="form-control"
                          placeholder="Height"
                          value={data.height}
                          onChange={handleChange}
                          min={0}
                          step=".01"
                        />
                        <small className="smalllabel">
                          Measure from the top to the head to the floor.Be sure
                          to stand straight
                        </small>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="dresssize">Suit/Dress Size</label>
                        <input
                          id="suitDressSize"
                          name="suitDressSize"
                          type="number"
                          className="form-control"
                          placeholder="Suit/Dress Size"
                          value={data.suitDressSize}
                          onChange={handleChange}
                          min={0}
                          step=".01"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="blousesize">Shirt/Blouse Size</label>
                        <input
                          id="shirtBlouseSize"
                          name="shirtBlouseSize"
                          type="number"
                          className="form-control"
                          placeholder="Shirt/Blouse Size"
                          value={data.shirtBlouseSize}
                          onChange={handleChange}
                          min={0}
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
                          value={data.hat}
                          onChange={handleChange}
                          min={0}
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
                          value={data.shoulder}
                          onChange={handleChange}
                          min={0}
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
                          value={data.chestBust}
                          onChange={handleChange}
                          min={0}
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
                          placeholder="Sleeve(D)"
                          value={data.sleeve}
                          onChange={handleChange}
                          min={0}
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
                          value={data.waist}
                          onChange={handleChange}
                          min={0}
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
                          value={data.inseam}
                          onChange={handleChange}
                          min={0}
                          step=".01"
                        />
                        <small className="smalllabel">
                          Measure from the crotch to the desired trouser length
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
                          value={data.hips}
                          onChange={handleChange}
                          min={0}
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
                      onClick={handleSubmit}
                    >
                      Save Changes
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
            </div>
          </div>
        </div>
      </div>
      }
    </React.Fragment>
  )
}

export default AddCustomers
