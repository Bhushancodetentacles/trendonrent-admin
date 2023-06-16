import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { get } from "helpers/api_helper"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useParams } from "react-router-dom"
import { Errorhandler } from "Error/ErrorHandler"
import { useLocation } from "react-router-dom"
import { Pagination } from "@mui/material"

// loader import
import { RotatingTriangles } from "react-loader-spinner"

const ViewCustomer = () => {
  //meta title
  document.title = "Trends on Rent"

  const [isLoading, setIsLoading] = useState(false)

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const id = searchParams.get("id")

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPagesCount, setTotalPagesCount] = useState(null)
  const [postsPerPage] = useState(10)
  const handleChange = (event, value) => {
    setCurrentPage(value)
  }

  // const [viewId, setViewId] = useState(id)
  const initialCustomerData = {
    firstName: "-",
    lastName: "-",
    mobileNo: "-",
    gender: "-",
    age: "-",
    secondaryMobileNo: "-",
    adharCardNo: "-",
    panCardNo: "-",
    primaryAddress: "-",
    dateOfBirth: "-",
    marriageAnniversary: "-",
    referalMobileNo: "",
  }
  const [data, setData] = useState(initialCustomerData)

  const getCustomerData = async () => {
    try {
      if (id && id.length) {
        setIsLoading(true)
        const res = await get(`/Customer/view?id=${id}`)
        setIsLoading(false)
        const result = res?.data?.result
          ? await res.data.result
          : initialCustomerData
        setData(result)
      } else {
        navigate("/Customers")
      }
    } catch (error) {
      setData(initialCustomerData)
      console.log("Customer view error : ", error)
      Errorhandler(error)
      // dispatch(deleteCustomerFail(error))
    }
  }

  useEffect(() => {
    getCustomerData()
  }, [])

  useEffect(() => {
    // While add customer page is active, the customer tab must also activated
    let element = document.getElementById("customer_tab")
    if (element) {
      element.classList.add("mm-active") // Add the 'active' class to the element
      console.log(element.firstChild)
    }
    return () => {
      if (element) {
        element.classList.remove("mm-active") // remove the 'active' class to the element
      }
    }
  }, [])

  // to get the transaction history start
  const [transactionHistory, setTransactionHistory] = useState([])
  const [transactionHistoryData, setTransactionHistoryData] = useState([])
  const getTransactionHistory = async () => {
    console.log("object")
    console.log(data?.mobileNo)
    console.log(startDate)
    console.log(endDate)
    try {
      const response = await get(
        // `Order/getTransactionHistory?FromDate=&Todate=&mobileNo=${data?.mobileNo}&pageNumber=1&pageSize=10`
        `Order/getTransactionHistory?FromDate=${startDate}&Todate=${endDate}&mobileNo=${data?.mobileNo}&pageNumber=${currentPage}&pageSize=${postsPerPage}`
      )
      console.log(response)
      if (response) {
        setTransactionHistory(response?.data?.result)
        setTransactionHistoryData(response)
        setTotalPagesCount(response?.totalPagesCount)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTransactionHistory()
  }, [data, currentPage, postsPerPage])

  console.log("transactionHistory")
  console.log(transactionHistory)
  // to get the transaction history end

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  console.log(data)
  console.log(transactionHistory)

  return (
    <React.Fragment>
      {isLoading ? (
        <RotatingTriangles
          visible={true}
          height="80"
          width="80"
          ariaLabel="rotating-triangels-loading"
          wrapperStyle={{}}
          wrapperClass="rotating-triangels-wrapper"
        />
      ) : (
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs
              title="Dashboard"
              breadcrumbItem="Customer"
              path={"/dashboard"}
              path1={"/Customers"}
              title1={"Customer"}
            />
            <div className="row">
              <div className="col-xs-12">
                <div className="card">
                  <div className="card-body">
                    <form>
                      <div className="row"></div>
                      <div className="my-2 row">
                        <div className="col-sm-4">
                          <div className="d-block mb-sm-3 mb-lg-0 mb-md-0 mb-3">
                            <h6 className="header" htmlFor="gender">
                              First Name
                            </h6>

                            <p className="text-muted mb-0">
                              {data.firstName ? data.firstName : "-"}
                            </p>
                          </div>
                        </div>

                        <div className="col-sm-4">
                          <div className=" d-block">
                            <h6 className="header" htmlFor="gender">
                              Last Name
                            </h6>

                            <p className="text-muted mb-0">
                              {data.lastName ? data.lastName : "-"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="my-2 row">
                        <div className="card-title card-title_h3 mb-3">
                          Personal Details
                        </div>
                        <div className="col-sm-4 col-6">
                          <div className=" d-block mb-sm-3 mb-lg-0 mb-md-0 mb-3">
                            <h6 className="header" htmlFor="gender">
                              Gender
                            </h6>

                            <p className="text-muted mb-0 ">
                              {data.gender ? data.gender : "-"}
                            </p>
                          </div>
                        </div>

                        <div className="col-sm-4 col-6">
                          <div className="d-block mb-sm-3 mb-lg-0 mb-md-0 mb-3">
                            <h6 className="header" htmlFor="birth">
                              Birth Date
                            </h6>

                            <p className="text-muted mb-0">
                              {data.dateOfBirth
                                ? new Date(
                                    data.dateOfBirth
                                  ).toLocaleDateString()
                                : "-"}
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-4 col-6">
                          <div className="d-block">
                            <h6 className="header" htmlFor="age">
                              Age
                            </h6>

                            <p className="text-muted mb-0">
                              {data.age ? data.age : "-"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="my-2 row">
                        <div className="card-title card-title_h3 mb-3">
                          Contact Details
                        </div>
                        <div className="col-sm-4">
                          <div className="d-block mb-sm-3 mb-lg-0 mb-md-0 mb-3">
                            <h6 className="header" htmlFor="referalmobileno">
                              Mobile No.
                            </h6>

                            <p className="text-muted mb-0">
                              {data.mobileNo ? data.mobileNo : "-"}
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="d-block mb-sm-3 mb-lg-0 mb-md-0 mb-3">
                            <h6
                              className="header"
                              htmlFor="alternativemobileno"
                            >
                              Alternative Mobile No.
                            </h6>

                            <p className="text-muted mb-0">
                              {data.secondaryMobileNo
                                ? data.secondaryMobileNo
                                : "-"}
                            </p>
                          </div>
                        </div>

                        <div className="col-sm-4">
                          <div className="d-block">
                            <h6 htmlFor="referalmobileno" className="header">
                              Referral Mobile No.
                            </h6>

                            <p className="text-muted mb-0">
                              {data.referalMobileNo
                                ? data.referalMobileNo
                                : "-"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="my-2 row">
                        <div className="card-title card-title_h3 mb-3">
                          Details
                        </div>
                        <div className="col-sm-4">
                          <div className="d-block mb-sm-3 mb-lg-0 mb-md-0 mb-3">
                            <h6 htmlFor="adharcard" className="header">
                              Aadhar Card Number
                            </h6>

                            <p className="text-muted mb-0">
                              {data.adharCardNo ? data.adharCardNo : "-"}
                            </p>
                          </div>
                        </div>

                        <div className="col-sm-8">
                          <div className=" d-block mb-sm-3 mb-lg-0 mb-md-0 mb-3">
                            <h6 htmlFor="address" className="header">
                              Primary address
                            </h6>

                            <p className="text-muted mb-0">
                              {data.primaryAddress ? data.primaryAddress : "-"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <form>
                      <div className="card-title card-title_h3  mt-3 transaction-table mb-4">
                        Transaction History
                      </div>

                      <div className="mb-2 row">
                        <div className=" col-xl-3 col-md-3 col-sm-4">
                          <h6>From Date</h6>
                          <input
                            name="startDate"
                            id="startDate"
                            type="date"
                            className="form-control"
                            placeholder="To Date"
                            onChange={e => setStartDate(e.target.value)}
                          />
                        </div>
                        <div className="col-xl-3 col-md-3 col-sm-4">
                          <h6>To Date</h6>
                          <input
                          name="endDate"
                          id="endDate"
                            type="date"
                            className="form-control"
                            placeholder="To Date"
                            onChange={e => setEndDate(e.target.value)}
                          />
                        </div>

                        <div className="col-xl-3 col-md-2 col-sm-3">
                          <div className="mt-4 mb-xxl-0">
                            <button
                              type="button"
                              className="btn btn-secondary w-100"
                              onClick={getTransactionHistory}
                            >
                              <i className="mdi mdi-filter-outline align-middle"></i>{" "}
                              Filter
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="table-rep-plugin mt-3 mb-3">
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
                                <th className="text-center">Unique Code</th>
                                <th>Photo</th>
                                <th className="text-center">Order No.</th>
                                <th className="text-center">PickUp Date</th>
                                <th className="text-center">Return Date</th>
                                <th>Rent Amount</th>
                                <th className="text-center">Deposit Amount</th>

                                <th className="text-center">Discount</th>
                                <th>Loyalty</th>
                                <th className="text-center">
                                  Loyalty Point redeemed
                                </th>
                                {/* <th className="text-center">
                                  Deposit Amount Reimubursement
                                </th> */}
                                <th className="text-center">Total Amount</th>
                                <th className="text-center">Payment Method</th>
                                <th className="text-center">
                                  Transaction status
                                </th>
                                {/* <th>Action</th> */}
                              </tr>
                            </thead>

                            {transactionHistory.length > 0
                              ? transactionHistory.map((item, index) => {
                                  return (
                                    <tbody key={index}>
                                      <tr>
                                        <td className="text-center">
                                          {!!item?.uniqueCode
                                            ? item?.uniqueCode
                                            : "-"}
                                        </td>
                                        <td className="text-center">
                                          {!!item?.fileUrl ? (
                                            <img
                                              className="avatar-md"
                                              src={item?.fileUrl}
                                            />
                                          ) : (
                                            "-"
                                          )}
                                        </td>
                                        <td className="text-center">
                                          {!!item?.orderId
                                            ? item?.orderId
                                            : "-"}
                                        </td>
                                        <td className="text-center">
                                          {!!item?.pickupDate
                                            ? item?.pickupDate.substring(0, item?.pickupDate.indexOf("T"))
                                            : "-"}
                                        </td>
                                        <td className="text-center">
                                          {!!item?.returnDate
                                            ? item?.returnDate.substring(0, item?.returnDate.indexOf("T"))
                                            : "-"}
                                        </td>
                                        <td className="text-center">
                                          {/* {!!item?.rentAmount
                                            ? item?.rentAmount
                                            : "-"} */}
                                            {item?.rentAmount == 0 ? 0 : (item?.rentAmount || "-")}
                                        </td>
                                        <td className="text-center">
                                          {item?.depositAmount == 0 ? 0 : (item?.depositAmount || "-")}
                                        </td>
                                        <td className="text-center">
                                            {item?.discountAmount == 0 ? 0 : (item?.discountAmount || "-")}
                                        </td>
                                        <td className="text-center">
                                            {item?.totalLoyaltyPoint == 0 ? 0 : (item?.totalLoyaltyPoint || "-")}
                                        </td>
                                        <td className="text-center">
                                            {item?.totalRedeemLoyaltyPoint == 0 ? 0 : (item?.totalRedeemLoyaltyPoint || "-")}
                                        </td>
                                        {/* <td className="text-center">{!!(item?.uniqueCode) ? item?.uniqueCode : "-"}</td> */}
                                        <td className="text-center">
                                            {item?.totalAmount == 0 ? 0 : (item?.totalAmount || "-")}
                                        </td>
                                        <td className="text-center">
                                          {!!item?.paymentMethod
                                            ? item?.paymentMethod
                                            : "-"}
                                        </td>
                                        <td className="text-center">
                                          <span className="font-size-12 badge-soft-danger badge bg-danger">
                                            {!!item?.transactionStatus
                                              ? item?.transactionStatus
                                              : "-"}
                                          </span>
                                        </td>
                                        {/* <td className="text-center">
                                          <button
                                              className="p-1 btn-delete"
                                              onClick={() => {
                                                onClickDelete()
                                              }}
                                            >
                                            <i className="mdi mdi-trash-can font-size-18 text-danger me-1"></i>
                                          </button>
                                        </td> */}
                                      </tr>
                                    </tbody>
                                  )
                                })
                              : <p className="text-center"><b>No Data Available</b></p>}


                          </table>
                         
                        </div>
                      </div>
                      {transactionHistory.length ? (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
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
                    </form>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <form>
                      <div
                        className="row transactionamt"
                        style={{ justifyContent: "flex-end" }}
                      >
                        <div className="col-sm-4">
                          <div className="d-block mb-sm-3 mb-lg-0 mb-md-0 mb-3">
                            <h6 className="header" htmlFor="address">
                              Total Loyalty Point Redeemed
                            </h6>

                            <p className="text-muted mb-0">{transactionHistoryData?.totalLoyaltyPointRedeemed == 0 ? 0 : (transactionHistoryData?.totalLoyaltyPointRedeemed || "-")} points</p>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="d-block mb-sm-3 mb-lg-0 mb-md-0 mb-3">
                            <h6 className="header" htmlFor="address">
                              Total Loyalty Point Not Redeemed
                            </h6>

                            <p className="text-muted  mb-0">{transactionHistoryData?.totalLoyaltyPointNotRedeemed == 0 ? 0 : (transactionHistoryData?.totalLoyaltyPointNotRedeemed || "-")} points</p>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="d-block mb-sm-3 mb-lg-0 mb-md-0 mb-3">
                            <h6 className="header" htmlFor="gender">
                              Total Amount
                            </h6>

                            <h6 className="text-success  mb-0">{transactionHistoryData?.totalAmount == 0 ? 0 : ((transactionHistoryData?.totalAmount) + "/-" || "-")}</h6>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  <Link
                    type="submit"
                    to="/Customers"
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
      )}
    </React.Fragment>
  )
}

export default ViewCustomer
