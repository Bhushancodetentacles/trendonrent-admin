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

const EcommerceAddProduct = () => {
  
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
          <Breadcrumbs title="Dashboard" breadcrumbItem="Add Packages" />

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
                          <label htmlFor="code">Id</label>
                          <input
                            id="code"
                            name="code"
                            type="text"
                            className="form-control"
                            placeholder="Id"
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="dresstype">
                           Packages
                          </label>
                          <input
                            id="code"
                            name="code"
                            type="text"
                            className="form-control"
                            placeholder="Packages"
                          />
                        </div>
                       
                      </div>

                      <div className="col-sm-6">
                      <div className="mb-3">
                          <label htmlFor="price">Description</label>
                          <textarea
                            id="price"
                            name="price"
                            type="number"
                            className="form-control"
                            placeholder="Description"
                          ></textarea>
                        </div>
                   
                        
                        
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

export default EcommerceAddProduct
