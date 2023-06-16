import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import "../../assets/css/style.css"
import DeleteModal from "../../components/Common/DeleteModal"
import { Pagination } from "@mui/material"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

import {
  deleteOrderFail,
  deleteOrderSuccess,
  getOrdersFail,
  getOrdersSuccess,
} from "store/actions"
import { useNavigate } from "react-router-dom/dist"
import { useSelector, useDispatch } from "react-redux"
import { get } from "helpers/api_helper"
import { toast } from "react-toastify"

const Order = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event, item) => {
    setAnchorEl(event.currentTarget)
    setSelectedItem(item)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setSelectedItem(null)
  }
  const navigate = useNavigate()
  document.title = "Trends on Rent"
  const dispatch = useDispatch()
  const [loader, setLoader] = useState(false)
  const [orderData, setOrderData] = useState([])
  const overAllStatus = [
    {
      id: 1,
      status: "Paid",
    },
    {
      id: 2,
      status: "Pending",
    },
  ]
  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPagesCount, setTotalPagesCount] = useState(null)
  const [postsPerPage] = useState(10)
  const handleChange = (event, value) => {
    setCurrentPage(value)
  }
  //Filter order
  let MonthBefore = new Date()
  MonthBefore.setDate(new Date().getDate() - 31)
  const [filters, setFilters] = useState({
    fromDate: null,
    toDate: null,
    overall_status: "",
  })

  const handleFilterChange = event => {
    console.log("overall stats", event.target.id)
    setFilters(prevData => ({
      ...prevData,
      [event.target.id]: event.target.value,
    }))
  }
  // delete order
  const [deleteModal, setDeleteModal] = useState(false)
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(false)
  const [Id, setId] = useState(null)
  const onClickDelete = id => {
    setId(id)
    setDeleteModal(true)
  }
  const handleDeleteProduct = async () => {
    try {
      setIsDeleteDisabled(true)
      const res = await get(`Order/delete?Id=${Id}`)
      const result = await res.data.getResult.productId
      setIsDeleteDisabled(false)
      dispatch(deleteOrderSuccess(result))
      toast.success("Order deleted successfully")
      getOrders()
      setDeleteModal(false)
    } catch (error) {
      setIsDeleteDisabled(false)
      toast.error("Something went wrong..")
      dispatch(deleteOrderFail(error))
    }
  }

  // fetching Order list
  const getOrders = async () => {
    console.log("getOrders")
    try {
      setLoader(true)
      let from_date = filters.fromDate
        ? new Date(filters.fromDate).toLocaleDateString("en-GB")
        : ""
      let to_date = filters.toDate
        ? new Date(filters.toDate).toLocaleDateString("en-GB")
        : ""
      console.log(from_date)
      const res = await get(
        `Order/List?FromDate=${from_date}&Todate=${to_date}&overallStatus=${filters.overall_status}&pageNumber=${currentPage}&pageSize=${postsPerPage}`
      )
      const result = await res.data.result
      console.log("order res", result)
      setLoader(false)
      setOrderData(result)
      setTotalPagesCount(res.totalPagesCount)
      dispatch(getOrdersSuccess(result))
    } catch (error) {
      setLoader(false)
      setOrderData([])
      dispatch(getOrdersFail(error))
      throw error
    }
  }

  useEffect(() => {
    getOrders()
  }, [currentPage])

  useEffect(() => {
    let element = document.getElementById("order_tab")
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
      <DeleteModal
        show={deleteModal}
        isDisabled={isDeleteDisabled}
        onDeleteClick={handleDeleteProduct}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs
            title="Dashboard"
            breadcrumbItem="Order"
            path={"/dashboard"}
          />

          <div className="row">
            <div className="col" style={{ padding: "0" }}>
              <div className="card">
                <div className="card-body">
                  <div className="mb-2 row">
                    <div className="col-md-10">
                      <div
                        className="row"
                        style={{ justifyContent: "flex-end" }}
                      >
                        <div className=" col-xl-3 col-md-3 col-sm-3">
                          <label>From Date</label>
                          <input
                            type="date"
                            className="form-control"
                            placeholder="To Date"
                            id="fromDate"
                            // value={new Date(filters.fromDate)
                            //   .toISOString()
                            //   .substring(0, 10)}
                            onChange={handleFilterChange}
                          />
                        </div>
                        <div className="col-xl-3 col-md-3 col-sm-3">
                          <label>To Date</label>
                          <input
                            type="date"
                            id="toDate"
                            className="form-control"
                            placeholder="To Date"
                            // value={new Date(filters.toDate)
                            //   .toISOString()
                            //   .substring(0, 10)}
                            onChange={handleFilterChange}
                          />
                        </div>

                        <div className="col-xl-3 col-md-3 col-sm-3">
                          <label>Overall Status</label>
                          <select
                            className="form-control select2 mb-3 mb-xxl-0"
                            onChange={e => handleFilterChange(e)}
                            id="overall_status"
                          >
                            <option value={""}>Select</option>
                            {overAllStatus?.map(data => {
                              return (
                                <option key={data.id}> {data.status}</option>
                              )
                            })}
                          </select>
                        </div>
                        <div className="col-xl-3 col-md-3 col-sm-3">
                          <div className="mb-3 mb-xxl-0">
                            <button
                              type="button"
                              className="mt-0 mt-lg-4 mt-md-4 mt-sm-4 btn btn-filter w-100"
                              onClick={() => getOrders()}
                            >
                              <i className="mdi mdi-filter-outline align-middle"></i>{" "}
                              Filter
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2   col-sm-3 col-12 mb-3">
                      <Link className="btn-add mt-lg-4 mt-0 mt-sm-4 mt-xs-4 btn" to="/Orderform">
                        <i className="mdi mdi-plus me-1"></i>Add Order
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
                      data-pattern="priority-columns"
                    >
                      <table
                        id="tech-companies-1"
                        className="custom-header-css table table-striped table-hover"
                      >
                        <thead className="table-light table-nowrap">
                          <tr>
                            <th className="text-center">Order Id</th>
                            {/* <th>Unique Code</th> */}
                            {/* <th>Photo</th> */}
                            <th className="text-center">Customer Name</th>
                            <th className="text-center">Mobile Number</th>
                            {/* <th  className="text-center">PickUp Date</th>
                            <th  className="text-center">Return Date</th> */}
                            <th className="text-center">Total Rent Amount</th>
                            <th className="text-center">
                              Total Deposit Amount
                            </th>
                            <th className="text-center">Total Discount</th>
                            <th className="text-center">
                              Total Redeem Loyalty points
                            </th>
                            <th className="text-center">Total Amount</th>
                            <th className="text-center">Overall Status</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loader ? (
                            <tr className="text-center">
                              <td colSpan={11} className="loader text-center ">
                                {" "}
                                <p className="text-center"> Loading...!</p>
                              </td>
                            </tr>
                          ) : orderData.length ? (
                            orderData?.map(data => {
                              return (
                                <tr key={data.orderId}>
                                  <td className="text-center">{data.orderId} </td>
                                  <td>{data.customerName}</td>
                                  <td className="text-center">{data.mobileNo}</td>
                                  {/* <td>
                                    <img
                                      alt="product-img"
                                      title="product-img"
                                      className="avatar-md"
                                      src={`${data?.frontImage}`}
                                    />
                                  </td> */}
                                  <td className="text-center">{data.totalRentAmount}</td>
                                  <td className="text-center">{data.totalDepositAmount}</td>
                                  <td className="text-center">{data.totalDiscount}</td>
                                  <td className="text-center">{data.totalRedeemLoyaltyPoint}</td>
                                  <td className="text-center">{data.totalAmount}</td>

                                  {/* <td className="text-center">
                                    {new Date(
                                      data?.pickUpDate
                                    )?.toLocaleDateString("en-GB")}
                                  </td> */}
                                  {/* <td className="text-center">
                                    {new Date(
                                      data?.returnDate
                                    )?.toLocaleDateString("en-GB")}
                                  </td> */}
                                  {/* <td className="text-center">{data.totalDays}</td>
                                  <td className="text-center">2000/-</td>
                                  <td className="text-center">{data.depositAmount}</td>
                                  <td className="text-center">{data.totalAmount}</td> */}
                                  <td>
                                    {
                                      data.paymentStatus == "Paid" ?  <span className="font-size-12 badge-soft-success badge bg-success">
                                      {data.paymentStatus}
                                    </span> :  data.paymentStatus == "Pending" ? <span className="font-size-12 badge-soft-danger badge bg-danger">
                                      {data.paymentStatus}
                                    </span>  : ''
                                    }
                                   
                                  </td>
                                  <td className="d-flex text-center">
                                    <Button
                                      id="basic-button"
                                      aria-controls={
                                        open ? "basic-menu" : undefined
                                      }
                                      aria-haspopup="true"
                                      aria-expanded={open ? "true" : undefined}
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
                                        selectedItem?.orderId === data.orderId
                                      }
                                      onClose={handleClose}
                                      MenuListProps={{
                                        "aria-labelledby": "basic-button",
                                      }}
                                    >
                                      <MenuItem onClick={handleClose}>
                                        <Link
                                          to={`/ViewOrder/${data.orderId}`}
                                          className="p-1"
                                        >
                                          <i className="mdi mdi-file font-size-18 text-info me-1"></i>
                                          <span className="text-info">
                                            View
                                          </span>
                                        </Link>
                                      </MenuItem>
                                      <MenuItem onClick={handleClose}>
                                        <Link
                                          to={`/Invoice/${data.orderId}`}
                                          className="p-1" >
                                          <i className="mdi mdi-book-search font-size-18 text-info me-1"></i>
                                          <span className="text-info">
                                            View Invoice
                                          </span>
                                        </Link>
                                      </MenuItem>
                                  
                                      <MenuItem onClick={handleClose}>
                                        <button
                                          className="p-1 btn-delete"
                                          onClick={() => {
                                            onClickDelete(data.orderId)
                                          }}
                                        >
                                          <i className="mdi mdi-trash-can font-size-18 text-danger me-1"></i>
                                          <span className="text-danger">
                                            Delete
                                          </span>
                                        </button>
                                      </MenuItem>
                                    </Menu>
                                  </td>
                                </tr>
                              )
                            })
                          ) : (
                            <tr className="text-center">
                              <td colSpan={11}>
                                {" "}
                                <b> No data found...!</b>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    {orderData?.length ? (
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Pagination
                          count={totalPagesCount}
                          page={currentPage}
                          onChange={handleChange}
                          color="primary"
                          shape="rounded"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Order
