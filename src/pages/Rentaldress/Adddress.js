import React, { useEffect, useState, useRef } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import TextEditor from "../../components/Common/textEditor"
import { useFormik } from "formik/dist"
import { productValidationSchema } from "pages/validationSchema/validationSchema"
import { get, post } from "helpers/api_helper"
import { addProductSuccess, getProductsSuccess } from "store/actions"
import { useDispatch } from "react-redux"
import axios from "axios"
import { toast } from "react-toastify"

const Adddress = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [categoryData, setCategoryData] = useState([])
  const [frontImg, setFrontImg] = useState("")
  const [backImg, setBackImg] = useState("")
  const [imgLoader, setImgLoader] = useState({
    frontImg: false,
    backImg: false,
  })
  // product Add Form Initial Values
  const initialValues = {
    categoryId: "",
    name: "",
    supplierName: "",
    store: "",
    description: " ",
    dressFabric: "",
    topFabric: "",
    bottomFabric: "",
    purchasePrice: "",
    frontImage: "",
    backImage: "",
    rentPriceFor3Days: "",
    rentPriceFor7Days: "",
    rentPriceFor10Days: "",
    discountAmount: "",
    discountStartValidityDate: "",
    discountValidityDate: "",
    depositAmount: "",
    preprationDays: "",
  }

  // handling form data using formik

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormik({
    initialValues: initialValues,
    validateOnMount: true,
    validationSchema: productValidationSchema,
    onSubmit: async data => {
      console.log(data)
      // debugger
      try {
        const res = await post("product/add", data)
        const result = await res.data.product
        toast.success("Product added successfully")
        setIsButtonDisabled(true)
        dispatch(addProductSuccess(result))
        navigate("/Rentdress")
      } catch (error) {
        dispatch(addProductFail(error))
        toast.error("Something went wrong...!")
      }
    },
  })
  console.log("values", values)
  console.log("error", errors)
  // handling discount validity start and end date
  const discStartDate = event => {
    // const date = new Date(event.target.value).toLocaleDateString()
    // const parts = date.split("/").map(part => part.padStart(2, "0"))
    // const formattedDate = `${parts[2]}-${parts[0]}-${parts[1]}`
    // setFieldValue("discountStartValidityDate", formattedDate)
    setFieldValue("discountStartValidityDate", event.target.value)
  }
  const discEndDate = event => {
    // const date = new Date(event.target.value).toLocaleDateString()
    // const parts = date.split("/").map(part => part.padStart(2, "0"))
    // const formattedDate = `${parts[2]}-${parts[0]}-${parts[1]}`
    // setFieldValue("discountValidityDate", formattedDate)
    setFieldValue("discountValidityDate", event.target.value)
  }
  // file upload

  const frontFileInputRef = useRef(null)
  const backFileInputRef = useRef(null)
  const handleFrontImgClick = () => {
    console.log("Hiii")
    frontFileInputRef.current.click()
  }

  const handleBackImgClick = () => {
    backFileInputRef.current.click()
  }
  //handle front image
  const handleFrontImage = async e => {
    try {
      // debugger
      setImgLoader({ ...imgLoader, frontImg: true })
      const formData = new FormData()
      formData.append("file", e.target.files[0])
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}Common/UploadImage?type=3`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      const result = res.data.data.model.filePath
      const displayImage = URL.createObjectURL(e.target.files[0])
      console.log(displayImage)
      setFrontImg(displayImage)
      setImgLoader({ ...imgLoader, frontImg: false })
      setFieldValue("frontImage", result)
      // Reset file input value
      frontFileInputRef.current.value = ""
    } catch (error) {
      console.log("error")
      console.log(error)
      setImgLoader({ ...imgLoader, frontImg: false })
      toast.error(error.response.data.Error[0])
      frontFileInputRef.current.value = ""
      throw error
    }
  }

  //handle back image
  const handleBackImage = async e => {
    try {
      setImgLoader({ ...imgLoader, backImg: true })
      const formData = new FormData()
      formData.append("file", e.target.files[0])
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}Common/UploadImage?type=3`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      const result = res.data.data.model.filePath
      const displayImage = URL.createObjectURL(e.target.files[0])
      setBackImg(displayImage)
      setImgLoader({ ...imgLoader, backImg: false })

      setFieldValue("backImage", result)
      backFileInputRef.current.value = ""
    } catch (error) {
      setImgLoader({ ...imgLoader, backImg: false })
      toast.error(error.response.statusText)
      backFileInputRef.current.value = ""
      throw error
    }
  }
  // getting category
  const getCategory = async () => {
    try {
      const res = await get("Product/CategorySelectList")
      const result = await res.data.list
      setCategoryData(result)
    } catch (error) {
      throw error
    }
  }
  useEffect(() => {
    getCategory()
    let element = document.getElementById("product_tab")
    if (element) {
      element.classList.add("mm-active")
    }
    return () => {
      if (element) {
        element.classList.remove("mm-active")
      }
    }
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs
            title="Dashboard"
            breadcrumbItem="Add Product"
            path={"/dashboard"}
            path1={"/Rentdress"}
            title1={"Product"}
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
                          <label htmlFor="code" className="header">
                            Store
                          </label>
                          <select
                            className="form-control select2"
                            name="store"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option> select</option>
                            <option>Pune MG Road</option>
                          </select>
                          {errors.store && touched.store && (
                            <span style={{ color: "red" }}>
                              {" "}
                              {errors.store}{" "}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="dresstype" className="header">
                            Category
                          </label>
                          <select
                            className="form-control select2"
                            name="categoryId"
                            onChange={e => {
                              setFieldValue(
                                "categoryId",
                                parseInt(e.target.value)
                              )
                            }}
                            onBlur={handleBlur}
                          >
                            <option value={""}>Select</option>
                            {categoryData?.map(item => {
                              return (
                                <option
                                  value={item.categoryId}
                                  key={item.categoryId}
                                >
                                  {item.name}{" "}
                                </option>
                              )
                            })}
                          </select>
                          {errors.categoryId && touched.categoryId && (
                            <span style={{ color: "red" }}>
                              {" "}
                              {errors.categoryId}{" "}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="uniquecode" className="header">
                            Product Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Product Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.name && touched.name && (
                            <span style={{ color: "red" }}>
                              {" "}
                              {errors.name}{" "}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="10days" className="header">
                            Supplier Name
                          </label>
                          <input
                            type="text"
                            name="supplierName "
                            className="form-control"
                            placeholder="Supplier Name"
                            onChange={e =>
                              setFieldValue("supplierName", e.target.value)
                            }
                            onBlur={handleBlur}
                          />
                          {errors.supplierName && touched.supplierName && (
                            <span style={{ color: "red" }}>
                              {" "}
                              {errors.supplierName}{" "}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="price" className="header">
                            Purchase Price
                          </label>
                          <input
                            id="price"
                            name="purchasePrice"
                            type="number"
                            className="form-control"
                            placeholder="Price"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.purchasePrice && touched.purchasePrice && (
                            <span style={{ color: "red" }}>
                              {" "}
                              {errors.purchasePrice}{" "}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="amt" className="header">
                            Deposit Amount
                          </label>
                          <input
                            type="number"
                            name="depositAmount"
                            className="form-control"
                            placeholder="Deposit Amount"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.depositAmount && touched.depositAmount && (
                            <span style={{ color: "red" }}>
                              {" "}
                              {errors.depositAmount}{" "}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="amt" className="header">
                            Preparation Days
                          </label>
                          <input
                            type="number"
                            name="preprationDays"
                            className="form-control"
                            placeholder="Enter Preparation Days"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.preprationDays && touched.preprationDays && (
                            <span style={{ color: "red" }}>
                              {" "}
                              {errors.preprationDays}{" "}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="card-title card-title_h3 mb-3">
                        Fabric
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="dressFabric" className="header">
                            Fabric
                          </label>
                          <input
                            type="text"
                            name="dressFabric"
                            className="form-control"
                            placeholder="Dress Fabric"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.dressFabric && touched.dressFabric && (
                            <span style={{ color: "red" }}>
                              {" "}
                              {errors.dressFabric}{" "}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="dressfabric" className="header">
                            Bottom Fabric
                          </label>

                          <input
                            type="text"
                            name="bottomFabric"
                            className="form-control"
                            placeholder="Bottom Fabric"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.bottomFabric && touched.bottomFabric && (
                            <span style={{ color: "red" }}>
                              {" "}
                              {errors.bottomFabric}{" "}
                            </span>
                          )}
                        </div>
                      </div> */}
                      <div className="mb-3 row">
                        <div className="card-title  card-title_h3 mb-3">
                          Packages
                        </div>
                        <div className="col-sm-4">
                          <div className="mb-3">
                            <label htmlFor="3days" className="header">
                              Rent price 3 days
                            </label>
                            <input
                              id="3days"
                              name="rentPriceFor3Days"
                              type="number"
                              className="form-control"
                              placeholder="Price"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors?.rentPriceFor3Days &&
                              touched.rentPriceFor3Days && (
                                <span style={{ color: "red" }}>
                                  {" "}
                                  {errors.rentPriceFor3Days}{" "}
                                </span>
                              )}
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="mb-3">
                            <label htmlFor="7days" className="header">
                              Rent price for 7 days
                            </label>
                            <input
                              id="7days"
                              name="rentPriceFor7Days"
                              type="number"
                              className="form-control"
                              placeholder="Price"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.rentPriceFor7Days &&
                              touched.rentPriceFor7Days && (
                                <span style={{ color: "red" }}>
                                  {" "}
                                  {errors.rentPriceFor7Days}{" "}
                                </span>
                              )}
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="mb-3">
                            <label htmlFor="10days" className="header">
                              Rent price for 10 days
                            </label>
                            <input
                              id="10days"
                              name="rentPriceFor10Days"
                              type="number"
                              className="form-control"
                              placeholder="price"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.rentPriceFor10Days &&
                              touched.rentPriceFor10Days && (
                                <span style={{ color: "red" }}>
                                  {" "}
                                  {errors.rentPriceFor10Days}{" "}
                                </span>
                              )}
                          </div>
                        </div>
                        <div className="card-title  card-title_h3">
                          Discount{" "}
                        </div>
                        <div className="col-sm-4">
                          <div className="mb-3">
                            <label htmlFor="10days" className="header">
                              Discount Amount
                            </label>
                            <input
                              type="number"
                              name="discountAmount "
                              className="form-control"
                              placeholder="Discount"
                              onChange={e =>
                                setFieldValue("discountAmount", e.target.value)
                              }
                              onBlur={handleBlur}
                            />
                            {errors.discountAmount &&
                              touched.discountAmount && (
                                <span style={{ color: "red" }}>
                                  {" "}
                                  {errors.discountAmount}{" "}
                                </span>
                              )}
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="mb-3">
                            <label htmlFor="fromdate" className="header">
                              Validity Date
                            </label>
                            <input
                              id="discountStartValidityDate"
                              type="date"
                              name="discountStartValidityDate "
                              value={values.discountStartValidityDate}
                              className="form-control"
                              placeholder="Validity start Date"
                              onChange={event => discStartDate(event)}
                              onBlur={handleBlur}
                            />
                            {errors.discountStartValidityDate &&
                              touched.discountStartValidityDate && (
                                <span style={{ color: "red" }}>
                                  {" "}
                                  {errors.discountStartValidityDate}{" "}
                                </span>
                              )}
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="mb-3">
                            <label htmlFor="fromdate" className="header">
                              Till Date
                            </label>
                            <input
                              id="discountValidityDate"
                              type="date"
                              name="discountValidityDate "
                              value={values.discountValidityDate}
                              className="form-control"
                              placeholder="Validity End Date"
                              onChange={event => discEndDate(event)}
                              onBlur={handleBlur}
                            />
                            {errors.discountValidityDate &&
                              touched.discountValidityDate && (
                                <span style={{ color: "red" }}>
                                  {" "}
                                  {errors.discountValidityDate}{" "}
                                </span>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="mb-3  header">
                            Product Description
                          </label>
                          <TextEditor setFieldValue={setFieldValue} />
                          {errors.description && touched.description && (
                            <span style={{ color: "red" }}>
                              {errors.description}{" "}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="mb-3 mt-3 col-md-6">
                        <label className="mb-3 header ">
                          {" "}
                          Product Front Images
                        </label>
                        <div
                          className="Neon Neon-theme-dragdropbox"
                          onClick={handleFrontImgClick}
                        >
                          <input
                            className="file_upload"
                            name="frontImage"
                            ref={frontFileInputRef}
                            accept="image/png, image/jpeg, image/gif"
                            id="filer_input2"
                            multiple="multiple"
                            type="file"
                            onChange={handleFrontImage}
                            onBlur={handleBlur}
                          />

                          <div className="Neon-input-dragDrop">
                            {frontImg && !errors.frontImage ? (
                              <img
                                src={`${frontImg}`}
                                alt="frontImage"
                                width={"250px"}
                                height={"250px"}
                              />
                            ) : imgLoader.frontImg ? (
                              <div>Uploading...! </div>
                            ) : (
                              <div className="Neon-input-inner">
                                <div className="Neon-input-text">
                                  <i className="display-4 text-muted bx bxs-cloud-upload"></i>
                                </div>
                                <a className="Neon-input-choose-btn blue">
                                  Drop files here or click to upload.
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                        {errors.frontImage && touched.frontImage && (
                          <span style={{ color: "red" }}>
                            {" "}
                            {errors.frontImage}{" "}
                          </span>
                        )}
                      </div>
                      <div className="mb-3 mt-3 col-md-6">
                        <label className=" mb-3 header">
                          Product Back Images
                        </label>
                        <div
                          className="Neon Neon-theme-dragdropbox"
                          onClick={handleBackImgClick}
                        >
                          <input
                            className="file_upload"
                            name="backImage"
                            ref={backFileInputRef}
                            accept="image/*"
                            id="filer_input2"
                            multiple="multiple"
                            type="file"
                            onChange={e => handleBackImage(e)}
                            onBlur={handleBlur}
                          />

                          <div className="Neon-input-dragDrop">
                            {backImg && !errors.backImage ? (
                              <img
                                src={`${backImg}`}
                                alt="frontImage"
                                width={"250px"}
                                height={"250px"}
                              />
                            ) : imgLoader.backImg ? (
                              <div>Uploading...! </div>
                            ) : (
                              <div className="Neon-input-inner">
                                <div className="Neon-input-text">
                                  <i className="display-4 text-muted bx bxs-cloud-upload"></i>
                                </div>
                                <a className="Neon-input-choose-btn blue">
                                  Drop files here or click to upload.
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                        {errors.backImage && touched.backImage && (
                          <span style={{ color: "red" }}>
                            {" "}
                            {errors.backImage}{" "}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      <button
                        type="submit"
                        color="primary"
                        className="btn btn-primary "
                        disabled={isButtonDisabled}
                      >
                        Submit
                      </button>
                      <Link
                        type="submit"
                        to="/Rentdress"
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
    </React.Fragment>
  )
}

export default Adddress
