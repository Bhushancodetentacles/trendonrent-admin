import React, { useState } from "react"
import { Button } from "reactstrap"

// Import Editor
import { Link } from "react-router-dom"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const AddLoyalty = () => {
  //meta title
  document.title = "Create Task | Skote - React Admin & Dashboard Template"

  const inpRow = [{ name: "", file: "" }]

  // Function for Create Input Fields
  function handleAddFields() {
    const item1 = { name: "", file: "" }
    setinputFields([...inputFields, item1])
  }

  // Function for Remove Input Fields
  function handleRemoveFields(idx) {
    document.getElementById("nested" + idx).style.display = "none"
  }

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Loyalty" breadcrumbItem="Add Loyalty" />

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="mb-4 card-title">New Loyalty</div>
                  <form className="outer-repeater">
                    <div data-repeater-list="outer-group" className="outer">
                      <div data-repeater-item className="outer">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-4 form-group">
                              <label
                                htmlFor="taskname"
                                className="col-form-label"
                              >
                                Customer Name
                              </label>

                              <input
                                id="name"
                                name="name"
                                type="text"
                                className="form-control"
                                placeholder=" Customer Name"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group mb-4">
                              <label className="col-form-label">Loyalty</label>
                              <input
                                id="loyalty"
                                name="loyalty"
                                type="text"
                                className="form-control"
                                placeholder="Loyalty "
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-4 form-group">
                              <label
                                htmlFor="taskname"
                                className="col-form-label"
                              >
                                Expire Date
                              </label>

                              <input
                                id="date"
                                name="date"
                                type="date"
                                className="form-control"
                                placeholder=" Expire Date"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-lg-10">
                      <Button type="submit" className="mx-1" color="primary">
                        Submit
                      </Button>
                      <Link
                        type="submit"
                        to="/summary"
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
      </div>
    </>
  )
}

export default AddLoyalty
