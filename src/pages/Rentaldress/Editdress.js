import React, { useState, useEffect, useRef } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useFormik } from "formik/dist"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { productValidationSchema } from "pages/validationSchema/validationSchema"
import { get, post } from "helpers/api_helper"
import axios from "axios"
import TextEditor from "components/Common/textEditor"
import { toast } from "react-toastify"
import {
  getProductDetailFail,
  updateProductFail,
  updateProductSuccess,
} from "store/actions"

const EcommerceAddProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { state } = useLocation()
  const [data] = useState(state?.item)
  const [frontImg, setFrontImg] = useState(data?.frontImage)
  const [backImg, setBackImg] = useState(data?.backImage)
  // product UPDATE Form Initial Values
  console.log(data.discountValidityDate)
  const initialValues = {
    productId: data?.productId,
    categoryId: data?.categoryId,
    name: data?.name,
    store: 0,
    supplierName: data?.supplierName,
    description: data?.description,
    dressFabric: data?.dressFabric,
    purchasePrice: data?.purchasePrice,
    frontImage: data?.frontImage,
    backImage: data?.backImage,
    rentPriceFor3Days: data?.rentPriceFor3Days,
    rentPriceFor7Days: data?.rentPriceFor7Days,
    rentPriceFor10Days: data?.rentPriceFor10Days,
    topFabric: data?.topFabric,
    bottomFabric: data?.bottomFabric,
    depositAmount: data?.depositAmount,
    discountAmount: data?.discountAmount,
    discountStartValidityDate: data?.discountStartValidityDate.substring(0, 10),
    discountValidityDate : data?.discountValidityDate.substring(0, 10),
    preprationDays: data?.preprationDays,
  }

  // handling form data using formik
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
    validationSchema: productValidationSchema,
    onSubmit: async val => {
      try {
        const res = await post("Product/update", val)
        const result = await res.data
        toast.success("Updated successful")
        dispatch(updateProductSuccess(result))
        navigate("/Rentdress")
      } catch (error) {
        toast.error("Something went wrong...!")
        dispatch(updateProductFail(error))
        throw error
      }
    },
  })

  // handling discount validity start and end date
  const discStartDate = event => {
    const date = new Date(event.target.value).toLocaleDateString()
    const parts = date.split("/").map(part => part.padStart(2, "0"))
    const formattedDate = `${parts[2]}-${parts[0]}-${parts[1]}`
    setFieldValue("discountStartValidityDate",formattedDate )
  }
  const discEndDate = event => {
    const date = new Date(event.target.value).toLocaleDateString()
    const parts = date.split("/").map(part => part.padStart(2, "0"))
    const formattedDate = `${parts[2]}-${parts[0]}-${parts[1]}`
    setFieldValue("discountValidityDate", formattedDate)
  }

   // file upload
  const frontFileInputRef = useRef(null)
  const backFileInputRef = useRef(null)
  const handleFrontImgClick = () => {
    frontFileInputRef.current.click()
  }

  const handleBackImgClick = () => {
    backFileInputRef.current.click()
  }
  //handle front image
  const handleFrontImage = async e => {
    try {
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
      setFrontImg(displayImage)
      setFieldValue("frontImage", result)
      frontFileInputRef.current.value = "";
    } catch (error) {
      toast.error(error.response.statusText)
      frontFileInputRef.current.value = "";
      throw error
    }
  }

  //handle back image
  const handleBackImage = async e => {
    try {
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
      setFieldValue("backImage", result)
      backFileInputRef.current.value = "";
    } catch (error) {
      toast.error(error.response.statusText)
      backFileInputRef.current.value = "";
      throw error
    }
  }

  console.log("values", values)
  console.log("errors", errors)

  //meta title
  document.title = "Trend on Rent"
  const [categoryData, setCategoryData] = useState([])

  useEffect(() => {
    if (!id) {
      navigate("/Rentdress")
      return
    }
  }, [id])

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
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title="Dashboard"
            breadcrumbItem="Edit Product"
            path={"/dashboard"}
            path1={"/Rentdress"}
            title1={"Product"}
          />
          <div className="row">
            <div className="col-xs-12">
            <form onSubmit={handleSubmit}>
              <div className="card">
                <div className="card-body">
                  <div className="card-title card-title_h3">Edit Information</div>

                 
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="code" className="header">Store</label>
                          <select
                            className="form-control select2"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.store}
                            name="store"
                          >
                            <option>Select</option>
                            <option value="0">Pune MG Road</option>
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
                          <label htmlFor="dresstype" className="header">Category</label>
                          <select
                            className="form-control select2"
                            name="categoryId"
                            value={values.categoryId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option>Select</option>
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
                          <label htmlFor="uniquecode" className="header">Product Name</label>
                          <input
                            type="text"
                            name="name"
                            value={values.name}
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
                          <label htmlFor="10days" className="header">Supplier Name</label>
                          <input
                            type="text"
                            name="supplierName"
                            value={values.supplierName}
                            className="form-control"
                            placeholder="Supplier Name"
                            onChange={handleChange}
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
                          <label htmlFor="price" className="header">Purchase Price</label>
                          <input
                            id="price"
                            name="purchasePrice"
                            value={values.purchasePrice}
                            type="text"
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
                          <label htmlFor="amt" className="header">Deposit Amount</label>
                          <input
                            type="text"
                            name="depositAmount"
                            value={values.depositAmount}
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
                          <label htmlFor="amt" className="header">Preparation Days</label>
                          <input
                            type="number"
                            name="preprationDays"
                            className="form-control"
                            value={values.preprationDays}
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


                      <div className="card-title  card-title_h3 mb-3">Fabric</div>
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="dressfabric" className="header">Top Fabric</label>

                          <input
                            type="text"
                            className="form-control"
                            name="topFabric"
                            placeholder="Top Fabric"
                            value={values.topFabric}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.topFabric && touched.topFabric && (
                            <span style={{ color: "red" }}>
                              {" "}
                              {errors.topFabric}{" "}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="dressfabric" className="header">Bottom Fabric</label>

                          <input
                            type="text"
                            name="bottomFabric"
                            className="form-control"
                            placeholder="Bottom Fabric"
                            value={values.bottomFabric}
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
                      </div>

                      <div className="card-title  card-title_h3 mb-3">Packages</div>

                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="3days" className="header">Rent price 3 days</label>
                          <input
                            id="3days"
                            name="rentPriceFor3Days"
                            value={values.rentPriceFor3Days}
                            type="text"
                            className="form-control"
                            placeholder="Price"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.rentPriceFor3Days &&
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
                          <label htmlFor="7days" className="header">Rent price for 7 days</label>
                          <input
                            id="7days"
                            name="rentPriceFor7Days"
                            value={values.rentPriceFor7Days}
                            type="text"
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
                          <label htmlFor="10days" className="header">Rent price for 10 days</label>
                          <input
                            id="10days"
                            name="rentPriceFor10Days"
                            value={values.rentPriceFor10Days}
                            type="text"
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
                      <div className="card-title  card-title_h3 mb-3">Discount</div>
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="10days" className="header">Discount</label>
                          <input
                            type="text"
                            name="discountAmount"
                            value={values.discountAmount}
                            className="form-control"
                            placeholder="Discount"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.discountAmount && touched.discountAmount && (
                            <span style={{ color: "red" }}>
                              {" "}
                              {errors.discountAmount}{" "}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="fromdate" className="header">Validity Date</label>
                          <input
                            id="discountStartValidityDate"
                            type="date"
                            name="discountStartValidityDate "
                            value={values.discountStartValidityDate}
                            className="form-control"
                            placeholder="Validity Date"
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
                          <label htmlFor="fromdate" className="header">Till Date</label>
                          <input
                            id="discountValidityDate"
                            type="date"
                            name="discountValidityDate "
                            value={values.discountValidityDate}
                            className="form-control"
                            placeholder="Validity Date"
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
                    <div className="card">
                      <div className="card-body">
                      
                                                      <div className="row">
                     <div className="mb-3 mt-3 col-md-12">
                      <label className="mb-3 header">Product Description</label>
                      <TextEditor
                        setFieldValue={setFieldValue}
                        data={initialValues.description}
                      />
                    </div>
                    </div>
                  
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body">
                      
                    <div className="row">
                      <div className="mb-3 mt-3 col-md-6">
                        <label className=" mb-3 header">Product Front Images</label>
                        <div
                          className="Neon Neon-theme-dragdropbox"
                          onClick={handleFrontImgClick}
                        >
                          <input
                            className="file_upload"
                            name="frontImage"
                            accept="image/*"
                            ref={frontFileInputRef}
                            id="filer_input2"
                            multiple="multiple"
                            type="file"
                            onChange={e => handleFrontImage(e)}
                            onBlur={handleBlur}
                          />

                          <div className="Neon-input-dragDrop">
                            {frontImg && !errors.frontImage ? (
                              <img
                                src={`${frontImg}`}
                                alt="Front Image"
                                width={"250px"}
                                height={"250px"}
                              />
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
                        <label className=" mb-3 header">Product Back Images</label>
                        <div
                          className="Neon Neon-theme-dragdropbox"
                          onClick={handleBackImgClick}
                        >
                          <input
                            className="file_upload"
                            name="backImage"
                            accept="image/*"
                            ref={backFileInputRef}
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
                                alt="Back Image"
                                width={"250px"}
                                height={"250px"}
                              />
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
                      >
                        Save Changes
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
      {/* </div>
            <Footer></Footer>
            </div> */}
    </React.Fragment>
  )
}

export default EcommerceAddProduct
