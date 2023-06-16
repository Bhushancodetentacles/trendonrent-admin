import React, { useState, useEffect } from "react"
// import { Button, Label, } from "reactstrap";
// import Header from "components/VerticalLayout/Header";
// import Footer from "components/VerticalLayout/Footer";
// import Sidebar from "components/VerticalLayout/Sidebar";
import { Link, useNavigate } from "react-router-dom"
// import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import "../../assets/css/style.css"
import img from "../../assets/images/dress/adharcard.jpg"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import DeleteModal from "../../components/Common/DeleteModal"
import { result } from "lodash"
import { get } from "helpers/api_helper"
import { Pagination } from "@mui/material"
import { deleteCustomerFail, deleteCustomerSuccess } from "store/actions"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { Errorhandler } from "Error/ErrorHandler"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
const Customers = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedItem, setSelectedItem] = useState(null)
  const open = Boolean(anchorEl);
  const handleClick = (event,item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item)
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedItem(null)
  };
  const dispatch = useDispatch()
  const [deleteId, setDeleteId] = useState(0)
  const [customerData, setCustomerData] = useState([])
  const [loader, setLoader] = useState(1)

  // filter order
  const [filter, setFilter] = useState({
    mobNo: "",
    gender: ""
  })

  const setFilterValue = (e) => {
    setFilter(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }
  console.log("filter--------", filter);
  // pagination
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const [perPageItem, setperPageItem] = useState(10);
  const handleChange = (event, value) => {
    setPage(value)
  }

  // delete Order
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteLoader, setDeleteLoader] = useState(false)
  const onClickDelete = customer_id => {
    setDeleteModal(true)
    setDeleteId(customer_id)
  }
  const handleDeleteOrder = async () => {
    try {
      setDeleteLoader(true)
      const res = await get(`/Customer/delete?Id=${deleteId}`)
      const result = res?.data && await res.data
      console.log("Delete customer : ", result)
      dispatch(deleteCustomerSuccess(result))
      setDeleteLoader(false)
      setDeleteModal(false)
      toast.success("Customer deleted successfully!")
    } catch (error) {
      console.log("Delete error : ", error)
      setDeleteLoader(false)
      setDeleteModal(false)
      dispatch(deleteCustomerFail(error))
      Errorhandler(error)
    }
  }


  const getCustomerList = async () => {
    try {
      setLoader(true)
      const res = await get(`Customer/List?mobileNo=${filter.mobNo}&gender=${filter.gender}&pageNumber=${page}&pageSize=${perPageItem}`)
      const customer_data = res?.data?.result ? await res.data.result : []
      let totalPages = res?.totalPagesCount ? res.totalPagesCount : 0
      setCustomerData(customer_data)
      setCount(totalPages)
      setLoader(false)
    } catch (error) {
      setLoader(false)
      setCustomerData([])
      Errorhandler(error)
      console.log("Customer view error : ", error)
    }
  }

  useEffect(() => {
    if (!deleteLoader) getCustomerList()
  }, [page, deleteLoader])

  useEffect(() => {
    let element = document.getElementById("customer_tab")
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
      <DeleteModal
        show={deleteModal}
        onDeleteClick={() => handleDeleteOrder()}
        onCloseClick={() => setDeleteModal(false)}
        loader={deleteLoader}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs
            title="Dashboard"
            breadcrumbItem="Customer"
            path={"/dashboard"}
          />

          <div className="row">
            <div className="col" style={{ padding: "0" }}>
              <div className="card">
                <div className="card-body">
                  {/* <div className="row" style={{ justifyContent: "flex-end" }}>
                    <div className="col-md-7"></div>
                    <div
                      className="col-md-2 mb-3"
                      style={{ textAlign: "right" }}
                    >
                      <Link
                        className="btn-rounded mb-2 me-2  me-xxl-2 my-3 my-xxl-0 btn btn-success"
                        to="/AddCustomers"
                      >
                        <i className="mdi mdi-plus me-1"></i>Add Customer
                      </Link>
                    </div>
                  </div> */}
                  <div className="mb-2 row">
                    <div className="col-lg-3   col-md-3  col-xl-3">
                      <label className="form-label">Mobile Number</label>
                      <input
                        type="tel"
                        name="mobNo"
                        className="form-control"
                        placeholder="Mobile Number"
                        onChange={(e) => setFilterValue(e)}
                        maxLength={10}
                      />
                    </div>
                    <div className="col-lg-3 col-md-3   col-xl-3">
                      <label className="form-label">Gender</label>
                      <select className="form-control select2  mb-3" name="gender" onChange={(e) => setFilterValue(e)}>
                        <option value="">Select</option>
                        <option >Female</option>
                        <option>Male</option>
                      </select>
                    </div>

                    <div className="col-lg-3 col-md-3   col-xl-3" onClick={getCustomerList}>
                      <div className="mb-3 mb-xxl-0">
                        <button
                          type="button"
                          className="mt-0 mt-lg-4 mt-md-4  mb-xxl-0 btn btn-filter w-100"
                        >
                          <i className="mdi mdi-filter-outline align-middle"></i>{" "}
                          Filter
                        </button>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3  col-xl-3">
                      <Link
                        className="btn-add mt-lg-4 mb-xxl-0 mt-sm-0 mt-xs-4 btn"
                        to="/AddCustomers">
                        <i className="mdi mdi-plus me-1"></i>Add Customer
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="table-rep-plugin">
                    <div
                      className="table-responsive mb-0"
                      data-pattern="priority-columns" >
                      <table
                        id="tech-companies-1"
                        className="custom-header-css table table-striped table-hover"
                      >
                        <thead className="table-light table-nowrap" >
                          <tr>
                            <th >Sr.No</th>
                            <th>Full Name</th>
                            <th >Gender</th>
                            <th>Age</th>
                            <th>Mobile No. </th>
                            <th className="text-center">Total Rent Amount</th>
                            <th className="text-center">Total Deposit Amount</th>
                            <th className="text-center">Total Loyalty point earned</th>
                            <th className="text-center">Total Loyalty points redeemed</th>
                            <th className="text-center">Total Loyalty points available</th>
                            <th className="text-center" >Total Amount</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loader ? (
                            <tr className="text-center">
                              <td colSpan={13} className="loader"><p className="text-center">Loading...</p></td>
                            </tr>
                          ) : customerData && customerData.length > 0 ? (
                            customerData.map((data, idx) => (
                              <tr key={idx}>
                                <td className="text-center">{page * perPageItem - perPageItem + idx + 1}</td>
                                <td style={{ width: "160px" }}>{data.fullName}</td>
                                <td className="text-center">{data.gender}</td>
                                <td className="text-center">{data.age}</td>
                                <td className="text-center">{data.mobileNo}</td>
                                <td className="text-center">2000/-</td>
                                <td className="text-center">3000/-</td>
                                <td className="text-center">1</td>
                                <td className="text-center">2</td>
                                <td className="text-center">3</td>
                                <td className="text-center">6000/-</td>
                                <td className="d-flex text-center">

                                  <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    // onClick={handleClick}
                                    onClick={event =>
                                      handleClick(event, data)
                                    }
                                  >
                                     <i className="bx bx-dots-horizontal-rounded font-size-24 text-info"></i>
                                  </Button>
                                  <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    // open={open}
                                    open={
                                      Boolean(anchorEl) &&
                                      selectedItem?.customerId ===
                                        data.customerId
                                    }
                                    onClose={handleClose}
                                    MenuListProps={{
                                      'aria-labelledby': 'basic-button',
                                    }}
                                  >
                                    <MenuItem onClick={handleClose}>
                                      <Link to={`/ViewCustomer?id=${data.customerId}`} className="p-1">
                                        <i className="mdi mdi-file font-size-18 text-info me-1"></i><span className="text-info">View</span>
                                      </Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}><Link to={`/EditCustomer?id=${data.customerId}`} className="p-1">
                                      <i className="mdi mdi-pencil font-size-18 text-success me-1"></i><span className="text-success">Edit</span>
                                    </Link></MenuItem>
                                    <MenuItem onClick={handleClose}>
                                      <button
                                        className="p-1 btn-delete"
                                        onClick={() => {
                                          onClickDelete(data.customerId)
                                        }}
                                      >
                                        <i className="mdi mdi-trash-can font-size-18 text-danger me-1"></i><span className="text-danger">Delete</span>
                                      </button></MenuItem>
                                  </Menu>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr className="text-center">
                              <td colSpan={13}>No data found!</td>
                            </tr>
                          )}
                        </tbody>
                      </table>

                    </div>
                    {/* <div className="justify-content-md-end my-2 justify-content-center align-items-center row">
                      <div className="col-md-auto col">
                        <div className="d-flex gap-1">
                          <button
                            type="button"
                            disabled=""
                            className="btn btn-primary"
                          >
                            &lt;&lt;
                          </button>
                          <button
                            type="button"
                            disabled=""
                            className="btn btn-primary"
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
                    </div> */}
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Pagination
                      count={count}
                      page={page}
                      onChange={handleChange}
                      color="primary"
                      shape="rounded"
                    />
                  </div>
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

export default Customers
