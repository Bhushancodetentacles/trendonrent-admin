import React, { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useFieldArray, useForm } from "react-hook-form"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { get, post } from "helpers/api_helper"
import { useFormik } from "formik"
import { orderValidationSchema } from "pages/validationSchema/orderValidationSchema"
import { toast } from "react-toastify"
const Editorder = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  console.log("oredr state", state)
  const [data] = useState(state?.orderData)
  const [loader, setLoader] = useState(false)
  const overAllStatus = [
    {
      id: 1,
      status: "Rent Paid Deposit Pending",
    },
    {
      id: 2,
      status: "Rent Paid Deposit paid",
    },
    {
      id: 3,
      status: "Ready to Collect",
    },
    {
      id: 4,
      status: "Dress handed over",
    },
    {
      id: 5,
      status: "Dress Received",
    },
    {
      id: 6,
      status: "Deposit amount Reimbursed",
    },
    {
      id: 7,
      status: "done",
    },
  ]
  const initialValues = {
    orderId: data?.orderId,
    uniqueCode: data?.uniqueCode,
    customerName: data?.customerName,
    dressCategory: data?.dressCategory,
    totalDays: data?.totalDays,
    package: data?.package,
    pickUpDate: data?.pickUpDate,
    returnDate: data?.returnDate,
    depositAmount: data?.depositAmount,
    discount: data?.discount,
    loyaltyPoint: data?.loyaltyPoint,
    redeemLoyaltyPoint: data?.redeemLoyaltyPoint,
    totalAmount: data?.totalAmount,
    paymentStatus: data?.paymentStatus,
    remark: data?.remark,
    mobileNo: data?.mobileNo,
    overallStatus: data?.overallStatus,
    rentAmount: data?.rentAmount,
  }

  const { handleChange, handleBlur, handleSubmit, errors, touched, values } =
    useFormik({
      initialValues: initialValues,
      validationSchema: orderValidationSchema,
      onSubmit: async data => {
        try {
          setLoader(true)
          console.log(data)
          const result = await post("/Order/Update", data)
          console.log("Order placed response : ", result.data)
          toast.success(result.message)
          navigate("/Order")
        } catch (error) {
          setLoader(false)
          toast.error("Something went wrong...")
          console.log("Add order error : ", error)
        }
      },
    })
  console.log("values", values)
  console.log("errors", errors)

  // category select list (dropdown)
  const [categoryList, setCategoryList] = useState([])
  const getCategorySelectList = async () => {
    try {
      const res = await get(`Product/CategorySelectList`)
      const result = await res.data.list
      setCategoryList(result)
    } catch (error) {
      throw error
    }
  }

  console.log("single oredr data", data)
  useEffect(() => {
    getCategorySelectList()
    // addRow()

    // While add customer page is active, the customer tab must also activated
    let element = document.getElementById("order_tab")
    if (element) {
      element.classList.add("mm-active") // Add the 'active' class to the element
    }
    return () => {
      if (element) {
        element.classList.remove("mm-active") // remove the 'active' class to the element when change to another page
      }
    }
  }, [])
  //meta title
  document.title = "Trends On Rent"
  //   const {
  //     register,
  //     control,
  //     handleSubmit,
  //     setValue,
  //     formState: { errors },
  //     getValues,
  //   } = useForm()
  //   const { fields, append, remove } = useFieldArray({
  //     control,
  //     name: "inputs",
  //   })

  //   const addRow = () => {
  //     append({})
  //   }

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Dashboard" breadcrumbItem="Edit Order" />
          <div className="row">
            <div className="col-xs-12">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                     
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="code">Customer Name</label>
                          <input
                            id="name"
                            name="customerName"
                            value={values.customerName}
                            type="text"
                            className="form-control"
                            placeholder="Customer Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="dresstype">Dress Category</label>
                          <select
                            className="form-control select2"
                            value={values.dressCategory}
                            name="dressCategory"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option>Select</option>
                            {categoryList?.map(cat => {
                              return (
                                <option
                                  key={cat.categoryId}
                                >
                                  {cat.name}
                                </option>
                              )
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="number">Mobile Number</label>
                          <input
                            id="number"
                            name="mobileNo"
                            value={values.mobileNo}
                            type="tel"
                            className="form-control"
                            placeholder="Mobile Number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="Rdate">Totals Day</label>
                          <select
                            className="form-control select2"
                            name="totalDays"
                            value={values.totalDays}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option>Select</option>
                            <option value={1}>3 Days</option>
                            <option value={2}>7 Days</option>
                            <option value={3}>10 days</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="pdate">PickUp Date</label>
                          <input
                            id="pdate"
                            name="pickUpDate"
                            value={values.pickUpDate}
                            type="date"
                            className="form-control"
                            placeholder="PickUp Date"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="Rdate">Return Date</label>
                          <input
                            id="Rdate"
                            name="returnDate"
                            value={values.returnDate}
                            type="date"
                            className="form-control"
                            placeholder="Return Date"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                    </div>
                     </form>
                     </div>
                     </div>
                     <div className="card">
                   <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-12">
                        <div
                          className="row"
                          style={{ justifyContent: "flex-end" }}
                        >
                          <div
                            className="col-md-2 mb-3"
                            style={{ textAlign: "right" }}
                          >
                            <button
                              type="button"
                              onClick={addRow}
                              className="btn btn-primary"
                            >
                              {" "}
                              <i className="bx bx-plus align-middle"></i>
                              Add Item
                            </button>
                          </div>
                        </div> 

                        <div className="table-responsive mb-3">
                          <table className="table table-item table-nowrap  mb-0 no-footer">
                            <thead className="table-light table-nowrap">
                              <tr>
                                <th style={{ width: "60px" }}>Unique code</th>
                                <th style={{ width: "100px" }}>Pickup date</th>
                                <th style={{ width: "100px" }}>Return Date</th>
                                <th style={{ width: "100px" }}>Package</th>
                                <th style={{ width: "100px" }}>Rent Amount</th>
                                <th style={{ width: "100px" }}>
                                  Deposit amount
                                </th>
                                <th style={{ width: "100px" }}>Discount</th>
                                <th style={{ width: "180px" }}>
                                  Overall Status
                                </th>
                                <th style={{ width: "180px" }}>Remark</th>
                                <th style={{ width: "50px" }}>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <input
                                    type="text"
                                    placeholder="Unique Code"
                                    className="form-control"
                                    name="uniqueCode"
                                    value={values.uniqueCode}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="date"
                                    name="pickUpDate"
                                    value={
                                      values?.pickUpDate &&
                                      new Date(
                                        values?.pickUpDate
                                      ).toLocaleDateString("en-GB")
                                    }
                                    placeholder="dd-mm-yyyy"
                                    className="form-control"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="date"
                                    name="returnDate"
                                    value={
                                      values?.returnDate &&
                                      new Date(
                                        values?.returnDate
                                      ).toLocaleDateString("en-GB")
                                    }
                                    placeholder="dd-mm-yyyy"
                                    className="form-control"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </td>
                                <td>
                                  <select
                                    className="form-control select2 mb-3 mb-xxl-0"
                                    name="package"
                                    value={values.package}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  >
                                    <option disabled value={""}>
                                      Select
                                    </option>
                                    <option>3 Days</option>
                                    <option>7 Days</option>
                                    <option>10 Days</option>
                                  </select>
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="rentAmount"
                                    value={values.rentAmount}
                                    placeholder="0.00"
                                    className="form-control"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="depositAmount"
                                    value={values.depositAmount}
                                    placeholder="0.00"
                                    className="form-control"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    name="discount"
                                    value={values.discount}
                                    placeholder="0.00"
                                    className="form-control"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </td>
                                <td>
                                  <select
                                    className="form-control select2 mb-3 mb-xxl-0"
                                    name="overallStatus"
                                    value={values.overallStatus}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  >
                                    <option>Select</option>
                                    {overAllStatus?.map(data => {
                                      return (
                                        <option key={data.id}>
                                          {" "}
                                          {data.status}
                                        </option>
                                      )
                                    })}
                                  </select>
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    name="remark"
                                    value={values.remark}
                                    placeholder="Remark"
                                    className="form-control"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </td>

                                <td></td>
                              </tr>
                              {/* {fields.map((field, index) => (
                                <tr key={field.id}>
                                  <td>
                                    <input
                                      type="text"
                                      placeholder="Unique Code"
                                      className="form-control"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="date"
                                      placeholder="dd-mm-yyyy"
                                      className="form-control"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="date"
                                      placeholder="dd-mm-yyyy"
                                      className="form-control"
                                    />
                                  </td>
                                  <td>
                                    <select className="form-control select2 mb-3 mb-xxl-0">
                                      <option>Select</option>
                                      <option>Packages</option>
                                      <option value="1">3 Days</option>
                                      <option value="2">7 Days</option>
                                      <option value="3">10 Days</option>
                                    </select>
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      placeholder="0.00"
                                      className="form-control"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      placeholder="0.00"
                                      className="form-control"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      placeholder="0.00"
                                      className="form-control"
                                    />
                                  </td>
                                  <td>
                                    <select className="form-control select2 mb-3 mb-xxl-0">
                                      <option>Select</option>

                                      <option value="2">
                                        Rent Paid Deposit Pending
                                      </option>

                                      <option value="3">
                                        Rent Paid Deposit paid
                                      </option>
                                      <option value="4">
                                        Ready to Collect
                                      </option>
                                      <option value="5">
                                        Dress handed over
                                      </option>
                                      <option value="6">Dress Received</option>
                                      <option value="7">
                                        Deposit amount Reimbursed{" "}
                                      </option>
                                    </select>
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      placeholder="Remark"
                                      className="form-control"
                                    />
                                  </td>
                                  <td>
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                      className="close-btn1"
                                    >
                                      <i className="mdi mdi-close-thick"></i>
                                    </button>
                                  </td>
                                </tr>
                              ))} */}
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
                    <form  onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-sm-2">
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
                        </div>
                        <div className="col-sm-5">
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
                        </div>
                        <div className="col-sm-5">
                          <div className="mb-3">
                            <label htmlFor="receivedamt">Received Amount</label>
                            <input
                              id="receivedamt"
                              name="receivedamt"
                              type="text"
                              className="form-control"
                              placeholder="Received Amount"
                            />
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <div className="mb-3">
                            <label htmlFor="returnamt">
                              Return Deposit Amt.
                            </label>
                            <div className="w-100">
                              <span className="p-1">
                                <input type="radio" name="deposit_no" />
                                <span className="p-1">Yes</span>
                              </span>
                              <span className="p-1">
                                <input type="radio" name="deposit_no" />
                                <span className="p-1">No</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-5">
                          <div className="mb-3">
                            <label htmlFor="returnamt">
                              Return Deposit Amount{" "}
                            </label>
                            <input
                              id="returnamt"
                              name="returnamt"
                              type="number"
                              className="form-control"
                              placeholder="Return Deposit Amount"
                            />
                          </div>
                        </div>
                        <div className="col-sm-5">
                          <div className="mb-3">
                            <label htmlFor="totalamt">Payment Method</label>
                            <select className="form-control select2 mb-3 mb-xxl-0">
                              <option>Select</option>
                              <option value="1">Cash</option>
                              <option value="2">Card</option>
                              <option value="3">GPAY</option>
                              <option value="4">PHONEPE</option>
                              <option value="4">CHEQUE</option>
                              <option value="5">OTHER</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      </form>
                      </div>
                      </div>
                      <div className="card">
                   <div className="card-body">
                    <form  onSubmit={handleSubmit}>

                    <div className="row">
                    <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="deposit">Total Rent Amount</label>
                          <input
                            id="totalrent"
                            name="totalrent"
                            value={values.depositAmount}
                            type="number"
                            className="form-control"
                            placeholder="Total Rent Amount"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="deposit">Total Amount Deposit</label>
                          <input
                            id="deposit"
                            name="depositAmount"
                            value={values.depositAmount}
                            type="number"
                            className="form-control"
                            placeholder="Total Amount Deposit"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="Discount">Total Discount</label>
                          <input
                            id="Discount"
                            type="number"
                            name="discount"
                            value={values.discount}
                            className="form-control"
                            placeholder="Total Discount"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="points">Total Loyalty Points</label>
                          <input
                            id="totalLoyality"
                            name="totalLoyality"
                            type="number"
                            className="form-control"
                            placeholder="Total Loyalty Points"
                            value="0"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="redeemed">
                            Total Redeem Loyalty points{" "}
                          </label>
                          <input
                            id="redeemed"
                            name="redeemLoyaltyPoint"
                            value={values.redeemLoyaltyPoint}
                            type="number"
                            className="form-control"
                            placeholder="Redeemed Loyalty Points"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="deposit">Total Amount</label>
                          <input
                            id="deposit"
                            name="totalAmount"
                            value={values.totalAmount}
                            type="number"
                            className="form-control"
                            placeholder="Amount Deposit"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="totalamt">Payment Method</label>
                          <select
                            className="form-control select2 mb-3 mb-xxl-0"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option>Select</option>
                            <option value="1">Cash</option>
                            <option value="2">Card</option>
                            <option value="3">GPAY</option>
                            <option value="4">PHONEPE</option>
                            <option value="4">CHEQUE</option>
                            <option value="5">OTHER</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="10days">Payment Status</label>
                          <select
                            className="form-control select2"
                            name="paymentStatus"
                            value={values.paymentStatus}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option>Select</option>
                            <option>Paid</option>
                            <option>Pending</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      <button
                        type="submit"
                        color="primary"
                        className="btn btn-primary "
                      >
                        Save Changes
                      </button>
                      <Link
                        type="button"
                        to="/Order"
                        color="secondary"
                        className="btn btn-secondary"
                      >
                        Back
                      </Link>
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

export default Editorder
