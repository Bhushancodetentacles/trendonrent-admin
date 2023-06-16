import React, { useState, useEffect } from "react"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Link, useParams } from "react-router-dom"
import { getOrderDetailFail, getOrderDetailSuccess } from "store/actions"
import { get } from "helpers/api_helper"
import { useSelector, useDispatch } from "react-redux"

const Vieworder = () => {
  const { id } = useParams()
  console.log(id)
  const dispatch = useDispatch()
  //meta title
  document.title = "Trends on Rent"

  //  getting single product by ID
  const [orderData, setOrderData] = useState({})
  const getOrderById = async () => {
    try {
      const res = await get(`Order/view?id=${id}`)
      console.log(res)
      const result = await res.data.result
      console.log("orderData", result)
      setOrderData(result)
      dispatch(getOrderDetailSuccess(result))
    } catch (error) {
      console.log("view err", error)
      dispatch(getOrderDetailFail(error))
      throw error
    }
  }

  useEffect(() => {
    getOrderById()
  }, [])
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
      <div className="page-content">
        <div className="container-fluid">
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title="Dashboard"
            breadcrumbItem="Order Details"
            path={"/dashboard"}
            path1={"/Order"}
            title1={"Order"}
          />

          <div className="row">
            <div className="col-xs-12">
              <div className="card">
                <div className="card-body">
                  <form>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="d-block mb-sm-3 mb-lg-0 mb-md-0 mb-3">
                          <h6 className="header">Customer Name</h6>

                          <p className="text-muted mb-0">
                            {orderData?.customerName}
                          </p>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="d-block mb-sm-3 mb-lg-0 mb-md-0 mb-3">
                          <h6 className="header">Dress Category</h6>

                          <p className="text-muted mb-0">
                            {orderData?.dressCategory}
                          </p>
                        </div>
                      </div>

                      <div className="col-sm-4">
                        <div className="d-block mb-sm-3 mb-lg-0 mb-md-0 mb-3">
                          <h6 className="header">Mobile Number</h6>

                          <p className="text-muted mb-0">
                            {orderData?.mobileNo}
                          </p>
                        </div>
                      </div>
                      {/* <div className="col-sm-4">
                        <div className="d-flex">
                          <h6>
                            Total Day
                          </h6>
                          <span className="px-2">:</span>
                            <p className="text-muted">{orderData.totalDays}</p>
                          
                        </div>
                      </div> */}
                      {/* <div className="col-sm-4">
                        <div className="d-flex">
                          <h6>
                            PickUp Date
                          </h6>
                          <span className="px-2">:</span>
                            <p className="text-muted">
                              {new Date(
                                orderData?.pickUpDate
                              ).toLocaleDateString("en-GB")}
                            </p>
                          
                        </div>
                      </div> */}
                      {/* <div className="col-sm-4">
                        <div className="d-flex">
                          <h6>
                            Return Date
                          </h6>
                          <span className="px-2">:</span>
                            <p className="text-muted">
                              {new Date(
                                orderData?.returnDate
                              ).toLocaleDateString("en-GB")}
                            </p>
                          
                        </div>
                      </div> */}
                    </div>
                  </form>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <form>
                    <div className="row mt-3 mb-5">
                      <div className="col-lg-12">
                        <div className="table-responsive">
                          <table className="table  table-nowrap  mb-0 no-footer">
                            <thead className="table-light table-nowrap">
                              <tr>
                                <th>Unique code</th>
                                <th>Package</th>
                                <th>Pickup date</th>
                                <th>Return Date</th>

                                <th>Rent Amount</th>
                                <th>Deposit amount</th>
                                <th>Discount</th>
                                <th>Overall Status</th>
                                <th>Remark</th>
                              </tr>
                            </thead>
                            <tbody>
                              {orderData?.products?.map(item => {
                                return (
                                  <tr key={item.uniqueCode}>
                                    <td className="text-center">
                                      {item?.uniqueCode}
                                    </td>
                                    <td className="text-center">
                                      {item?.package}
                                    </td>
                                    <td className="text-center">
                                      {new Date(
                                        item?.pickupDate
                                      ).toLocaleDateString("en-GB")}
                                    </td>
                                    <td className="text-center">
                                      {new Date(
                                        item?.returnDate
                                      ).toLocaleDateString("en-GB")}
                                    </td>

                                    <td className="text-center">
                                      {item?.rentAmount}
                                    </td>
                                    <td className="text-center">
                                      {item?.depositAmount}
                                    </td>
                                    <td className="text-center">
                                      {item?.discountAmount}
                                    </td>
                                    <th>{item?.overallStatus}</th>
                                    <th>{item?.remark}</th>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <form>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="d-block mb-sm-3 mb-lg-0 mb-md-0 mb-3">
                          <h6>Total Rent Amount</h6>

                          <p className="text-muted">
                            {orderData?.totalRentAmount}
                          </p>
                        </div>
                      </div>

                      <div className="col-sm-4">
                        <div className="d-block mb-sm-3 mb-lg-0 mb-md-0 mb-3">
                          <h6 className="header">Total Amount Deposit</h6>

                          <p className="text-muted">
                            {orderData?.totalDepositAmount}
                          </p>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="d-block mb-sm-3 mb-lg-0 mb-md-0 mb-3">
                          <h6 className="header">Total Discount</h6>

                          <p className="text-muted">
                            {orderData?.totalDiscount}
                          </p>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="d-block mb-sm-3 mb-lg-0 mb-md-0 mb-3">
                          <h6 className="header">Total Loyalty Point</h6>

                          <p className="text-muted">
                            {orderData?.totalLoyaltyPoint}
                          </p>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="d-block mb-sm-3 mb-lg-0 mb-md-0 mb-3">
                          <h6 className="header">
                            Total Redeem Loyalty points
                          </h6>

                          <p className="text-muted">
                            {orderData?.totalRedeemLoyaltyPoint
                              ? orderData?.totalRedeemLoyaltyPoint
                              : 0}
                          </p>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="d-block mb-sm-3 mb-lg-0 mb-md-0 mb-3">
                          <h6 className="header">Total Amount</h6>
                          <p className="text-muted ">
                            {orderData?.totalAmount}
                          </p>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="d-block mb-sm-3 mb-lg-0 mb-md-0 mb-3">
                          <h6 className="header">Payment Method</h6>

                          <p className="text-muted">
                            {orderData?.paymentMethod}
                          </p>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="d-block mb-sm-3 mb-lg-0 mb-md-0 mb-3">
                          <h6 className="header">Payment Status</h6>

                          <p className="text-muted mb-0">
                            {orderData?.paymentStatus}
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="d-flex flex-wrap mt-3 gap-2">
                <Link
                  type="submit"
                  to="/Order"
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
    </React.Fragment>
  )
}

export default Vieworder
