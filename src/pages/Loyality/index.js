import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import "../../assets/css/style.css"
import { Pagination } from "@mui/material"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { loyaltyValidationSchema } from "pages/validationSchema/loyaltyValidationSchema"
import { get, post } from "../../helpers/api_helper"
import { useFormik } from "formik/dist"
import { useSelector, useDispatch } from "react-redux"

import {
  addLoyaltyFail,
  addLoyaltySuccess,
  getLoyaltyFail,
  getLoyaltySuccess,
} from "../../store/actions"
import { toast } from "react-toastify"

const Rentorder = () => {

  const dispatch = useDispatch()
  const [loader, setLoader] = useState(false)
  const [loyaltyList, setLoyaltyList] = useState([])
  console.log("loyaltyList", loyaltyList)
  const initialValues = {
    pointsInRup: "",
    reason: "",
    mobileNo: 90876566789,
  }
  useEffect(() => {
   
    // While add customer page is active, the customer tab must also activated
    let element = document.getElementById("loyality_tab")
    if (element) {
      element.classList.add("mm-active") // Add the 'active' class to the element
    }
    return () => {
      if (element) {
        element.classList.remove("mm-active") // remove the 'active' class to the element when change to another page
      }
    }
  }, [])

  // handling form data using formik
  const { handleChange, handleBlur, handleSubmit, errors, touched ,values } = useFormik(
    {
    enableReinitialize: true,
      initialValues: initialValues,
      validationSchema: loyaltyValidationSchema,
      onSubmit: async data => {
        try {
          const res = await post("admin/AddLoyaltyPoint", data)
          const result = await res.data
          console.log("loyalty result", result)
          toast.success("Loyalty added successfully")
          dispatch(addLoyaltySuccess(result))
        } catch (error) {
          dispatch(addLoyaltyFail(error))
          toast.error("Something went wrong...!")
        }
      },
    }
  )
   // pagination
   const [currentPage, setCurrentPage] = useState(1)
   const [totalPagesCount, setTotalPagesCount] = useState(null)
   const [postsPerPage] = useState(5)
 
   const handlePagination = (event, value) => {
     setCurrentPage(value)
   }

  // fetching loyalty list
  const getLoyalty = async () => {
    try {
      setLoader(true)
      const res = await get(
        `/Admin/LoyaltyPointList?FromDate=20/05/2023&Todate=31/05/2023&pageNumber=${currentPage}&pageSize=${postsPerPage}`
      )
      const result = await res.data.result
      setLoader(false)
      setLoyaltyList(result)
      setTotalPagesCount(res.totalPagesCount)
      dispatch(getLoyaltySuccess(result))
    } catch (error) {
      setLoader(false)
      dispatch(getLoyaltyFail(error))
      throw error
    }
  }

  useEffect(() => {
    getLoyalty()
  }, [currentPage,postsPerPage])

  useEffect(() => {
    let element = document.getElementById("loyality_tab")
    if (element) {
      element.classList.add("mm-active")
    }
    return () => {
      if (element) {
        element.classList.remove("mm-active")
      }
    }
  }, [])

  //meta title
  document.title = "Trends on Rent"

  return (
    <React.Fragment>
      {/* <div id="layout-wrapper">
                <Header></Header>
                <Sidebar></Sidebar>

                <div className="main-content"> */}
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs
            title="Dashboard"
            breadcrumbItem="Loyalty"
            path={"/dashboard"}
          />
          {/* <Breadcrumbs
            title="Dashboard"
            breadcrumbItem="Summary"
            path={"/dashboard"}
           
            title1={"Loyalty"}
          /> */}

          <div className="row">
            <div className="col" style={{ padding: "0" }}>
            <form onSubmit={handleSubmit}>
              <div className="card">
                <div className="card-body">
                
                 
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="Loyalty">Loyalty In Rs</label>
                          <input
                            id="Loyalty"
                            name="pointsInRup"
                            type="text"
                            className="form-control"
                            placeholder="Loyalty In Rs"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.pointsInRup && touched.pointsInRup && (
                            <span style={{ color: "red" }}>
                              {" "}
                              {errors.pointsInRup}{" "}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-8">
                        <div className="mb-3">
                          <label htmlFor="reason">Reason</label>
                          <input
                            id="reason"
                            name="reason"
                            type="text"
                            className="form-control"
                            placeholder="Reason"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.reason && touched.reason && (
                            <span style={{ color: "red" }}>
                              {" "}
                              {errors.reason}{" "}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mb-2 row">
                      <div className="col-lg-6 col-xl-3 mb-3">
                       <label className="form-label form-label">Mobile Number</label> 
                        <input
                          type="text"
                          name="mobileNo"
                          value={values.mobileNo}
                          className="form-control"
                          placeholder="Mobile Number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.mobileNo && touched.mobileNo && (
                          <span style={{ color: "red" }}>
                            {" "}
                            {errors.mobileNo}{" "}
                          </span>
                        )}
                      </div>

                      <div className="col-lg-4 col-xl-2">
                        <div className=" mb-xxl-0">
                          <button
                            type="button"
                            className="btn mt-lg-4 mt-0 mt-sm-4 mt-xs-4 btn-filter w-100"
                          >
                            <i className="mdi mdi-filter-outline align-middle"></i>{" "}
                            Filter
                          </button>
                        </div>
                      </div>
                    </div>
</div>
</div>
<div className="card">
    <div className="card-body">
                    <div className="table-rep-plugin mt-3 mb-3">
                      <div
                        className="table-responsive mb-0"
                        data-pattern="priority-columns"
                      >
                        <table
                          id="tech-companies-1"className="custom-header-css table table-striped table-hover">
                          <thead className="table-light table-nowrap">
                            <tr>
                              <th>
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                />{" "}
                              </th>
                              <th>Customer Name</th>
                              <th className="text-center">Mobile Number</th>
                              <th>Reason</th>
                              <th className="text-center">Loyalty in Rs</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              loader ? (<div> Loading...!</div>) : loyaltyList?.map(data => {
                                return (
                                  <tr key={data.loyaltyPointId}>
                                    <td> <input
                                  type="checkbox"
                                  className="form-check-input"
                                /> </td>
                                    <td>{data.customerName} </td>
                                    <td className="text-center">{data.mobileNo} </td>
                                    <td>{data.reason} </td>
                                    <td className="text-center">{data.pointsInRup} </td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </table>
                      </div>
                      {loyaltyList?.length ? (
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Pagination
                          count={totalPagesCount}
                          page={currentPage}
                          onChange={handlePagination}
                          color="primary"
                          shape="rounded"
                        />
                      </div>
                    ) : (
                      ""
                    )}

                      <div className="d-flex flex-wrap mt-3 gap-2">
                        <button
                          type="submit"
                          color="primary"
                          className="btn btn-primary "
                        >
                          Submit
                        </button>
                        <Link
                        to="/summary"
                          type="submit"
                          color="secondary"
                          className="btn btn-secondary"
                        >
                          Back
                        </Link>
                      </div>
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

export default Rentorder
