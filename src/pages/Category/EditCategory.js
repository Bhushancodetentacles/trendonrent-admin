import React, { useState } from "react";
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
          <Breadcrumbs title="Dashboard" breadcrumbItem="Edit Category" />

          <div className="row">
            <div className="col-xs-12">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">Edit Information</div>
                

                  <form>
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
                      <div className="col-sm-6">

                        <div className="mb-3">
                          <label htmlFor="dress">
                            NO. of Dress
                          </label>
                          <input
                            id="dress"
                            name="dress"
                            type="text"
                            className="form-control"
                            placeholder="No. of Dress"
                          />
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

    </React.Fragment>
  )
}

export default EditCategory
