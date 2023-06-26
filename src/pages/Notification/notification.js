import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import "../../assets/css/style.css"
import { Pagination } from "@mui/material"
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { useSelector, useDispatch } from "react-redux"
import TextEditor from "../../components/Common/textEditor"

import { toast } from "react-toastify"

const Notification = () => {

    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false)

    useEffect(() => {

        // While add customer page is active, the customer tab must also activated
        let element = document.getElementById("notification_tab")
        if (element) {
            element.classList.add("mm-active") // Add the 'active' class to the element
        }
        return () => {
            if (element) {
                element.classList.remove("mm-active") // remove the 'active' class to the element when change to another page
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
                        breadcrumbItem="Notification"
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
                            <form>
                                <div className="card">
                                    <div className="card-body">

                                        {/*                  
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
                    </div> */}
                                        <div className="mb-2 row">
                                            <div className="col-lg-4 col-xl-4 mb-3">
                                                <label className="form-label form-label">Mobile Number</label>
                                                <select
                            className="form-control select2 mb-3 mb-xxl-0">
                                  <option>
                                Select
                                </option>
                                 <option value="1">
                                 91672637389
                                </option>
                                <option  value="2">
                                 91672637389
                                </option>
                                <option  value="3">
                                 91672637389
                                </option>
                                <option value="4">
                                 91672637389
                                </option>

                            </select>

                                            </div>


                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="mb-3  header">Description</label>
                                                    <TextEditor />

                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-wrap mt-3 gap-2">
                                                <button
                                                    type="submit"
                                                    color="primary"
                                                    className="btn btn-primary "
                                                >
                                                    Submit
                                                </button>
                                                {/* <Link
                                                    to="/notification"
                                                    type="submit"
                                                    color="secondary"
                                                    className="btn btn-secondary"
                                                >
                                                    Back
                                                </Link> */}
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
                                                    id="tech-companies-1" className="custom-header-css table table-striped table-hover">
                                                    <thead className="table-light table-nowrap">
                                                        <tr>
                                                              <th className="text-center" style={{width:"10px"}}>Sr.No</th>                                                      
                                                            <th className="text-center" style={{width:"200px"}}>Mobile Number</th>
                                                            <th>Reason</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>


                                                        <tr >
                                                          <td className="text-center">1</td>
                                                            <td className="text-center">7167287365 </td>
                                                            <td>xhxajnjsn </td>
                                                          
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>

                                            <div
                                                style={{ display: "flex", justifyContent: "flex-end" }}
                                            >
                                                <Pagination

                                                    color="primary"
                                                    shape="rounded"
                                                />
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

export default Notification
