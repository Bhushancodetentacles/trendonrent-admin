

import React, { useState } from "react";
// import Header from "components/VerticalLayout/Header";
// import Footer from "components/VerticalLayout/Footer";
// import Sidebar from "components/VerticalLayout/Sidebar";


import { Button } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const viewloyality = () => {
  
  //meta title
  document.title = "Trends on Rent";

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
          <Breadcrumbs title="Dashboard" breadcrumbItem="Customer History" />
          <div className="row">
            <div className="col-xs-12">
              <div className="card">
                <div className="card-body">
                  
                  <form>
                    <div className="row">
                       
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                     
                        <div className="mb-3 row">
                          <label htmlFor="gender" className="col-md-6">First Name</label>
                          <div className="col-md-6">
                          <p className="text-muted">Ruchita</p>
                         </div>
                         </div>
                         <div className="mb-3 row">
                          <label htmlFor="gender" className="col-md-6">Last Name</label>
                          <div className="col-md-6">
                          <p className="text-muted">Sonar</p>
                         </div>
                         </div>
                        <div className="mb-3 row">
                          <label htmlFor="gender" className="col-md-6">
                            Gender
                          </label>
                          <div className="col-md-6">
                         <p className="text-muted" >Female</p>
                        </div>
                        </div>
                        <div className="mb-3 row">
                          <label htmlFor="age" className="col-md-6">
                            Age
                          </label>
                          <div className="col-md-6">
                       <p className="text-muted">28</p>
                        </div>
                        </div>
                       
                        <div className="mb-3 row">
                          <label htmlFor="alternativemobileno" className="col-md-6">Alternative Mobile Number</label>
                          <div className="col-md-6">
                         <p className="text-muted" >8767564325</p>
                         </div>
                       </div>
                       <div className="mb-3 row">
                          <label htmlFor="referalmobileno" className="col-md-6">Referal Mobile Number</label>
                          <div className="col-md-6">
                         <p className="text-muted" >8767564325</p>
                         </div>
                       </div>
                        <div className="mb-3 row">
                          <label htmlFor="adharcard" className="col-md-6">Adhar Card Number</label>
                          <div className="col-md-6">
                         <p className="text-muted">6890 6754 6789</p>
                         </div>
                        </div>
                        <div className="mb-3 row">
                            
                            <label htmlFor="address" className="col-md-6">
                              Primary address
                            </label>
                            <div className="col-md-6">
                            <p className="text-muted">Ff udhja hksak ajnd</p>
                            </div>
                            </div>
                            <div className="mb-3 row">
                              
                              <label htmlFor="address" className="col-md-6">
                               Dress Unique Code
                              </label>
                              <div className="col-md-6">
                              <p className="text-muted">3000</p>
                              </div>
                              </div>
                            
                      </div>

                      <div className="col-sm-6 ">
                      <div className="mb-3 row">
                              
                              <label htmlFor="address" className="col-md-6">
                               From Date
                              </label>
                              <div className="col-md-6">
                              <p className="text-muted">23-06-2022</p>
                              </div>
                              </div>
                              <div className="mb-3 row">
                              
                              <label htmlFor="address" className="col-md-6">
                                To Date
                              </label>
                              <div className="col-md-6">
                              <p className="text-muted">27-06-2022</p>
                              </div>
                              </div>
                             
                      <div className="mb-3 row">
                              
                              <label htmlFor="address" className="col-md-6">
                                Rent Amount
                              </label>
                              <div className="col-md-6">
                              <p className="text-muted">3000/-</p>
                              </div>
                              </div>
                            <div className="mb-3 row">
                            
                            <label htmlFor="address" className="col-md-6">
                              Deposit Amount
                            </label>
                            <div className="col-md-6">
                            <p className="text-muted">1000/-</p>
                            </div>
                            </div>
                            <div className="mb-3 row">
                            
                            <label htmlFor="address" className="col-md-6">
                              Deposit Amount Reimubursement
                            </label>
                            <div className="col-md-6">
                            <p className="text-muted">1000/-</p>
                            </div>
                            </div>
             
                            <div className="mb-3 row">
                            
                            <label htmlFor="address" className="col-md-6">
                             Loyality Point earned iin
                            </label>
                            <div className="col-md-6">
                            <p className="text-muted">20 points</p>
                            </div>
                            </div>
                            
                            <div className="mb-3 row">
                            
                            <label htmlFor="address" className="col-md-6">
                         Current Total Loyality Point
                            </label>
                            <div className="col-md-6">
                            <p className="text-muted">10 points</p>
                            </div>
                            </div>
                            <div className="mb-3 row">
                            
                            <label htmlFor="address" className="col-md-6">
                        Total Loyality Point redeemed
                            </label>
                            <div className="col-md-6">
                            <p className="text-muted">10 points</p>
                            </div>
                            </div>
                            <div className="mb-3 row">
                            
                            <label htmlFor="address" className="col-md-6">
                            Total Loyality Point redeemed till now
                            </label>
                            <div className="col-md-6">
                            <p className="text-muted">10 points</p>
                            </div>
                            </div>
                    
                      
                      </div>
                    </div>
                    <div className="d-none flex-wrap gap-2">
                      <Button type="submit" color="primary" className="btn ">
                        Save Changes
                      </Button>
                      <Button type="submit" color="secondary" className=" ">
                        Cancel
                      </Button>
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

export default viewloyality
