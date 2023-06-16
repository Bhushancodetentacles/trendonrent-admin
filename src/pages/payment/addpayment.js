import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Header from "components/VerticalLayout/Header";
// import Footer from "components/VerticalLayout/Footer";
// import Sidebar from "components/VerticalLayout/Sidebar";

import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import Select from "react-select";
import Dropzone from "react-dropzone";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const Orderform = () => {
  
  //meta title
  document.title = "Add Product | Skote - React Admin & Dashboard Template";

  const [selectedFiles, setselectedFiles] = useState([])

  const options = [
    { value: "AK", label: "Alaska" },
    { value: "HI", label: "Hawaii" },
    { value: "CA", label: "California" },
    { value: "NV", label: "Nevada" },
    { value: "OR", label: "Oregon" },
    { value: "WA", label: "Washington" },
  ]

  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    setselectedFiles(files)
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  return (
    <React.Fragment>
          {/* <div id="layout-wrapper">
                <Header></Header>
                <Sidebar></Sidebar>

                <div className="main-content"> */}
      <div className="page-content">
        <div className="container-fluid">
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Dashboard" breadcrumbItem="Add Product" />

          <div className="row">
            <div className="col-xs-12">
              <div className="card">
              <div className="card-body">
                  <div className="card-title">Basic Information</div>
                  <p className="card-title-desc mb-4">
                    Fill all information below
                  </p>

                  <form>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="code">Unique Code</label>
                          <input
                            id="code"
                            name="code"
                            type="text"
                            className="form-control"
                            placeholder="Unique Code"
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="code">Customer Name</label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            className="form-control"
                            placeholder="Customer Name"
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="dresstype">
                            Dress Type
                          </label>
                          <select className="form-control select2">
                            <option>Select</option>
                            <option value="0">Maternity Gowns</option>
                            <option value="1">Prewedding Gowns</option>
                            <option value="2">Lehenga</option>
                            <option value="3">Party Wear Gowns</option>
                            <options value="4">Party Wear Western Dresses</options>
                            <options value="5">Sarees</options>
                            <option values="6">Others..</option>
                          </select>
                        </div>
                        
                        <div className="mb-3">
                          <label htmlFor="pdate">PickUp Date</label>
                          <input
                            id="pdate"
                            name="pdate"
                            type="date"
                            className="form-control"
                            placeholder="PickUp Date"
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="Rdate">Return Date</label>
                          <input
                            id="Rdate"
                            name="Rdate"
                            type="date"
                            className="form-control"
                            placeholder="Return Date"
                          />
                        </div>
                        
                        <div className="mb-3">
                          <label htmlFor="Rdate">Totals Day</label>
                          <select className="form-control select2">
                            <option>Select</option>
                            <option value="0">3 Days</option>
                            <option value="1">7 Days</option>
                            <option value="2">10 days</option>
                              </select>
                        </div>
                      </div>

                      <div className="col-sm-6">
                    
                        <div className="mb-3">
                          <label  htmlFor="amount">Total Rent Amount</label>
                          <input
                            id="amount"
                            name="amount"
                            type="number"
                            className="form-control"
                            placeholder="Total Rent Amount"
                          />
                        </div>
                        <div className="mb-3">
                          <label  htmlFor="loyality">Loyalty points to redeem</label>
                          <select className="form-control select2">
                            <option>Select</option>
                            <option value="0">10%</option>
                            <option value="1">20%</option>
                            <option value="2">30%</option>
                            <option value="3">40%</option>
                            <option value="5">50%</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label  htmlFor="mobile">Customer Mobile Number</label>
                          <input
                            id="mobile"
                            name="mobile"
                            type="number"
                            className="form-control"
                            placeholder="Customer Mobile Number"
                          />
                        </div>
                        <div className="mb-3">
                          <label  htmlFor="deposit">Deposit Amount Received</label>
                          <input
                            id="deposit"
                            name="deposit"
                            type="number"
                            className="form-control"
                            placeholder="Deposit Amount Received"
                          />
                        </div>
                        <div className="mb-3">
                          <label  htmlFor="invoice">Unique Invoice Number</label>
                          <input
                            id="invoice"
                            name="invoice"
                            type="text"
                            className="form-control"
                            placeholder="Invoice Number"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card">
                <div className="card-body">
                  <div  className="card-title mb-3">Product Images</div>
                  <form>
                    <Dropzone
                      onDrop={acceptedFiles => {
                        handleAcceptedFiles(acceptedFiles)
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="dropzone">
                          <div
                            className="dz-message needsclick"
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <div className="dz-message needsclick">
                              <div className="mb-3">
                                <i className="display-4 text-muted bx bxs-cloud-upload" />
                              </div>
                              <h4>Drop files here or click to upload.</h4>
                            </div>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    <div className="dropzone-previews mt-3" id="file-previews">
                      {selectedFiles.map((f, i) => {
                        return (
                          <div
                            className="card mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            key={i + "-file"}
                          >
                            <div className="p-2">
                              <div className="row align-items-center">
                                <div className="col col-auto">
                                  <img
                                    data-dz-thumbnail=""
                                    height="80"
                                    className="avatar-sm rounded bg-light"
                                    alt={f.name}
                                    src={f.preview}
                                  />
                                </div>
                                <div className="col">
                                  <Link
                                    to="#"
                                    className="text-muted font-weight-bold"
                                  >
                                    {f.name}
                                  </Link>
                                  <p className="mb-0">
                                    <strong>{f.formattedSize}</strong>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </form>
                </div>
              </div>

                    <div className="d-flex flex-wrap gap-2">
                      <button type="submit" color="primary" className="btn btn-primary ">
                        Save Changes
                      </button>
                      <button type="submit" color="secondary" className="btn btn-secondary">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>

            
              
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

export default Orderform
