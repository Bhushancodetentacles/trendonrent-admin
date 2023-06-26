import React, { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
// import Header from "components/VerticalLayout/Header";
// import Footer from "components/VerticalLayout/Footer";
// import Sidebar from "components/VerticalLayout/Sidebar";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

// import categoryValidationSchema
import { categoryValidationSchema } from "pages/validationSchema/categoryValidationSchema"

// import useformik
import { useFormik } from "formik/dist"

import { toast } from "react-toastify"
import axios from "axios"
import { useDispatch } from "react-redux"
import { get, post } from "helpers/api_helper"

const EditCategory = () => {
  const dispatch = useDispatch()
  //meta title
  document.title = "Trend on Rent"
  const navigate = useNavigate()

  const [img, setImg] = useState("")
  const [imgLoader, setImgLoader] = useState(false)

  const searchParams = new URLSearchParams(location.search)
  const id = searchParams.get("id")

  // get specific category data
  const [categoryData, setCategoryData] = useState("")
  // const [initialValues, setInitialValues] = useState({})
  const getCategoryData = async() =>{
    try {

      const response = await get(`Product/GetCategory?id=${id}`)
      // console.log(response.data.result)
      if(response){
        setCategoryData(response?.data?.result)
        // setValues("name","Testing")
        setValues(response?.data?.result)

        // debugger
        setImg(response?.data?.result.fileUrl)
      // setFieldValue("fileUrl", result)
      // fileInputRef.current.value = ""
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  console.log(categoryData)

  const initialValues = {
    name: categoryData.name,
    fileUrl: categoryData.fileUrl,
  }

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    errors,
    values,
    touched,
    setValues
  } = useFormik({
    initialValues: initialValues,
    validationSchema: categoryValidationSchema,
    onSubmit: async data => {
      console.log(data)
      const newData = {
        categoryId:id,
        name:data.name,
        fileUrl:data.fileUrl
      }
      console.log(newData)
      try {
        const res = await post("/Product/UpdateCateg*ory", newData)
        const result = await res.data
        toast.success("Category Updated successfully...!")
        navigate("/Category")
        dispatch(addCategorySuccess(res))
        dispatch(getCategorySuccess(result))
      } catch (error) {
        console.log(error)
        dispatch(addCategoryFail(error))
        // toast.error(error.response.statusText)
        throw error
      }
    },
  })

  //handle  image
  const fileInputRef = useRef(null)
  const handleImgClick = () => {
    fileInputRef.current.click()
  }

  const handleImage = async e => {
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
      setImg(displayImage)
      setFieldValue("fileUrl", result)
      fileInputRef.current.value = ""
    } catch (error) {
      fileInputRef.current.value = ""
      console.log(error)
      // toast.error(error.response.statusText)
      throw error
    }
  }

  useEffect(() => {

    getCategoryData();

    let element = document.getElementById("category_tab")
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
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title="Dashboard"
            breadcrumbItem="Edit Category"
            path={"/dashboard"}
            path1={"/Category"}
            title1="Category"
          />

          <div className="row">
            <div className="col-xs-12">
              <form onSubmit={handleSubmit}>
                <div className="card">
                  <div className="card-body">
                    <div className="card-title card-title_h3">
                      Edit Information
                    </div>

                    <div className="row">
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="dresstype">Category Name</label>
                          <input
                            name="name"
                            type="text"
                            value={values.name}
                            className="form-control"
                            placeholder="Category Name"
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
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <div className="mb-3 mt-3">
                      <label className=" mb-3">Images</label>
                      <div
                        className="Neon Neon-category Neon-theme-dragdropbox"
                        onClick={handleImgClick}
                      >
                        <input
                          className="file_upload"
                          name="fileUrl"
                          ref={fileInputRef}
                          accept="image/png,image/jpeg"
                          id="filer_input2"
                          multiple="multiple"
                          type="file"
                          onChange={e => handleImage(e)}
                          onBlur={handleBlur}
                        />
                        <div className="Neon-input-dragDrop">
                          {img && !errors.fileUrl ? (
                            <img
                              src={`${img}`}
                              alt="frontImage"
                              width={"250px"}
                              height={"250px"}
                            />
                          ) : imgLoader ? (
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
                      {errors.fileUrl && touched.fileUrl && (
                        <span style={{ color: "red" }}> {errors.fileUrl} </span>
                      )}
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
                        to="/Category"
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

export default EditCategory
