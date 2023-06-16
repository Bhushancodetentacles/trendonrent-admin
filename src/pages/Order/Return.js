import React, { useState } from "react"
import { Button } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"

const AddCustomers = () => {
  //meta title
  document.title = "Add Product | Skote - React Admin & Dashboard Template"

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title="Dashboard"
            breadcrumbItem="Return"
            path={"/dashboard"}
            path1={"/Order"}
            title1={"Order"}
          />

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
                          <label htmlFor="gender">Product Received</label>
                          <div className="w-100">
                            <span className="p-1">
                              <input type="radio" name="yes_no" />
                              <span className="p-1">Yes</span>
                            </span>
                            <span className="p-1">
                              <input type="radio" name="yes_no" />
                              <span className="p-1">No</span>
                            </span>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="rent">Total Rent</label>
                          <input
                            id="rent"
                            name="rent"
                            type="text"
                            className="form-control"
                            placeholder="Total Rent"
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="amt">Amount Deposit</label>
                          <input
                            id="amtdep"
                            name="amtdep"
                            type="text"
                            className="form-control"
                            placeholder="Amount Deposit"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="charges">Additional Charges</label>
                          <input
                            id="charges"
                            name="charges"
                            type="text"
                            className="form-control"
                            placeholder="Additional Charges"
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="totalamt">Total Amount</label>
                          <input
                            id="totalamt"
                            name="totalamt"
                            type="text"
                            className="form-control"
                            placeholder="Total Amount"
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="totalamt">Payment Method</label>
                          <select className="form-control select2 mb-3 mb-xxl-0">
                            <option>Select</option>
                            <option value="1">Debit Card</option>
                            <option value="2">Credit Card</option>
                            <option value="3">Internet Banking</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="totalamt">Payment Status</label>
                          <select className="form-control select2 mb-3 mb-xxl-0">
                            <option>Select</option>
                            <option value="1">Yes</option>
                            <option value="2">No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      <Button type="submit" color="primary" className="btn ">
                        Submit
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

export default AddCustomers
