import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import Header from "components/VerticalLayout/Header";
// import Footer from "components/VerticalLayout/Footer";
// import Sidebar from "components/VerticalLayout/Sidebar";


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const EditCategory = () => {

  //meta title
  document.title = "Trend on Rent";
  useEffect(() => {
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
              <form>
                <div className="card">
                  <div className="card-body">
                    <div className="card-title card-title_h3">Edit Information</div>

                    <div className="row">
                      <div className="col-sm-6">

                        <div className="mb-3">
                          <label htmlFor="dresstype">
                            Category Name
                          </label>
                          <input
                            id="code"
                            name="code"
                            type="text"
                            className="form-control"
                            placeholder="Category Name"
                          />
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                  <div className="mb-3 mt-3">
                      <label className=" mb-3">Images</label>
                      <div className="Neon Neon-category Neon-theme-dragdropbox" >
                        <input
                          className="file_upload"
                          name="fileUrl"
                          accept="image/png,image/jpeg"
                          id="filer_input2"
                          multiple="multiple"
                          type="file"/>

                        <div className="Neon-input-dragDrop">
                        
                            <div className="Neon-input-inner">
                              <div className="Neon-input-text">
                                <i className="display-4 text-muted bx bxs-cloud-upload"></i>
                              </div>
                              <a className="Neon-input-choose-btn blue">
                                Drop files here or click to upload.
                              </a>
                            </div>
                        
                        </div>
                      </div>
                    
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      <button type="submit" color="primary" className="btn btn-primary ">
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
