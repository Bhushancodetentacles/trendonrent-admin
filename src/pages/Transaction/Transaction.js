import React, { useState } from "react"
// import { Button, Label, } from "reactstrap";
// import Header from "components/VerticalLayout/Header";
// import Footer from "components/VerticalLayout/Footer";
// import Sidebar from "components/VerticalLayout/Sidebar";
import { Link } from "react-router-dom"
// import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import "../../assets/css/style.css"
import img from "../../assets/images/dress/adharcard.jpg"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import DeleteModal from "../../components/Common/DeleteModal"
const Transaction = () => {
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = () => {
    setDeleteModal(true)
  }

  const handleDeleteOrder = () => {
    setDeleteModal(false)
  }
  const toggleMenuCallback = () => {
    if (leftSideBarType === "default") {
      dispatch(changeSidebarType("condensed", isMobile))
    } else if (leftSideBarType === "condensed") {
      dispatch(changeSidebarType("default", isMobile))
    }
  }
  //meta title
  document.title = "Trends on Rent"
  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs
            title="Dashboard"
            breadcrumbItem="Transaction"
            path={"/dashboard"}
          />

          <div className="row">
            <div className="col" style={{ padding: "0" }}>
              <div className="card">
                <div className="card-body">

                  <div className="mb-2 row" style={{ justifyContent: "flex-end" }}>

                    <div className="col-lg-6 col-xl-3 mb-3">

                      <label className="form-label">Mobile Number</label>
                      <input type="tel" className="form-control" placeholder="Mobile Number" />
                    </div>


                    <div className="col-lg-4 col-xl-2">
                      <div className="mb-3 mb-xxl-0">
                        <button type="button" className="mt-0 mt-lg-4 mt-md-4   btn btn-secondary w-100">
                          <i className="mdi mdi-filter-outline align-middle"></i> Filter</button>
                      </div>
                    </div>
                  </div>
                  <div className="table-rep-plugin">
                    <div
                      className="table-responsive mb-0"
                      data-pattern="priority-columns"
                    >
                      <table
                        id="tech-companies-1"
                        className="custom-header-css table table-bordered table-hover"
                      >
                        <thead className="table-light table-nowrap">
                          <tr>
                            <th>Sr.No</th>
                            <th>
                              Customer Name
                            </th>
                            <th>Mobile Number</th>
                            <th>
                              Total Amount
                            </th>
                            <th>Action</th>


                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Ruchita</td>
                            <td>9178625676</td>
                            <td>16,000/-</td>
                            <td>
                              <Link to="/Viewtransaction" className="p-1">
                                <i className="mdi mdi-file font-size-18 text-info me-1"></i></Link>

                              <button className="p-1 btn-delete" onClick={() => { onClickDelete(); }} ><i className="mdi mdi-trash-can font-size-18 text-danger me-1"></i></button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="justify-content-md-end my-2 justify-content-center align-items-center row">
                      <div className="col-md-auto col">
                        <div className="d-flex gap-1">
                          <button type="button" disabled="" className="btn btn-primary disabled">&lt;&lt;</button>
                          <button type="button" disabled="" className="btn btn-primary disabled">&lt;</button>
                        </div></div>
                      <div className="col-md-auto d-none d-md-block col">Page <strong>1 of 2</strong></div><div className="col-md-auto col">
                        <input min="1" max="2" type="number" className="form-control" value="1" style={{ width: "70px;" }} /></div>
                      <div className="col-md-auto col"><div className="d-flex gap-1">
                        <button type="button" className="btn btn-primary">&gt;</button>
                        <button type="button" className="btn btn-primary">&gt;&gt;</button>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-xl-2">
            <div className="mb-3 mb-xxl-0">
              <button
                type="button"
                className="mt-0 mt-lg-4 mt-md-4   btn btn-secondary w-100"
              >
                <i className="mdi mdi-filter-outline align-middle"></i>{" "}
                Filter
              </button>
            </div>
          </div>
        </div>
        <div className="table-rep-plugin">
          <div
            className="table-responsive mb-0"
            data-pattern="priority-columns"
          >
            <table
              id="tech-companies-1"
              className="custom-header-css table table-bordered table-hover"
            >
              <thead className="table-light table-nowrap">
                <tr>
                  <th>Sr.No</th>
                  <th>Customer Name</th>
                  <th>Mobile Number</th>
                  <th>Total Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Ruchita</td>
                  <td>9178625676</td>
                  <td>16,000/-</td>
                  <td>
                    <Link to="/Viewtransaction" className="p-1">
                      <i className="mdi mdi-file font-size-18 text-info me-1"></i>
                    </Link>

                    <button
                      className="p-1 btn-delete"
                      onClick={() => {
                        onClickDelete()
                      }}
                    >
                      <i className="mdi mdi-trash-can font-size-18 text-danger me-1"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="justify-content-md-end my-2 justify-content-center align-items-center row">
            <div className="col-md-auto col">
              <div className="d-flex gap-1">
                <button
                  type="button"
                  disabled=""
                  className="btn btn-primary disabled"
                >
                  &lt;&lt;
                </button>
                <button
                  type="button"
                  disabled=""
                  className="btn btn-primary disabled"
                >
                  &lt;
                </button>
              </div>
            </div>
            <div className="col-md-auto d-none d-md-block col">
              Page <strong>1 of 2</strong>
            </div>
            <div className="col-md-auto col">
              <input
                min="1"
                max="2"
                type="number"
                className="form-control"
                value="1"
                style={{ width: "70px;" }}
              />
            </div>
            <div className="col-md-auto col">
              <div className="d-flex gap-1">
                <button type="button" className="btn btn-primary">
                  &gt;
                </button>
                <button type="button" className="btn btn-primary">
                  &gt;&gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
   
    
    
    </React.Fragment >
  )
}

export default Transaction
