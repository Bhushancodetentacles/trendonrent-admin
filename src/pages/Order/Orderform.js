import React, { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import axios from "axios"
import { Errorhandler } from "Error/ErrorHandler"
import { get, post } from "helpers/api_helper"
import { useSelector } from "react-redux"
import { clearFields } from "redux-form"

// import react select
import Select from "react-select"

const Orderform = () => {
  //meta title
  document.title = "Trend on Rent"
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()
  const uniqueRef = useRef()
  const [categoryData, setCategoryData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPagesCount, setTotalPagesCount] = useState(null)
  const [postsPerPage] = useState(15)
  const [categoryLoader, setCategoryLoader] = useState(false)
  const [productData, setProductData] = useState([])
  const [errors, setErrors] = useState(null)
  const [total, setTotal] = useState({
    totalDeposit: 0,
    totalRent: 0,
    totalDiscount: 0,
    totalAmount: 0,
  })
  const [data, setData] = useState({
    customerName: "",
    dressType: "",
    mobileNo: "",
    totalRentAmount: null,
    totalDepositAmount: null,
    totalDiscount: null,
    totalLoyaltyPoint: null,
    totalRedeemLoyaltyPoint: null,
    totalAmount: null,
    paymentMethod: "",
    paymentStatus: "",
    addItem: [
      {
        uniqueCode: "",
        package: null,
        pickupDate: "",
        returnDate: "",
        depositAmount: null,
        discountAmount: 0,
        remark: "",
        overallStatus: "",
        rentAmount: null,
      },
    ],
  })

  // to get the unique code start

  const [uniqueCodeList, setUniqueCodeList] = useState([])
  const getUniqueCode = async () => {
    const response = await get(`Order/getUniqueCodeAll`)
    console.log(response)
    setUniqueCodeList(response.data.result)
  }

  // to get the unique code end

  const validateForm = data => {
    console.log(data, "data in validate")
    const errors = {}

    // Validate customerName
    if (data.customerName.trim() === "") {
      errors.customerName = "Customer name is required"
    }

    // Validate mobileNo
    if (data.mobileNo.trim() === "") {
      errors.mobileNo = "Mobile number is required"
    }

    // Validate dressType
    // if (data.dressType.trim() === "") {
    //   errors.dressType = "Dress category is required"
    // }

    // Validate paymentMethod
    if (data.paymentMethod.trim() === "") {
      errors.paymentMethod = "Payment method is required"
    }

    // Validate paymentStatus
    if (data.paymentStatus.trim() === "") {
      errors.paymentStatus = "Payment status is required"
    }

    // Validate addItem
    if (data.addItem.length === 0) {
      errors.addItem = "At least one item must be added"
    } else {
      // Validate each item in addItem
      for (let i = 0; i < data.addItem.length; i++) {
        const item = data.addItem[i]

        // Validate uniqueCode
        if (item.uniqueCode.trim() === "") {
          if (!errors.addItem) {
            errors.addItem = []
          }
          errors.addItem[i] = {
            uniqueCode: "Unique code is required ",
          }
        }

        // Validate package
        if (item.package === null) {
          if (!errors.addItem) {
            errors.addItem = []
          }
          errors.addItem[i] = {
            ...errors.addItem[i],
            package: "Package is required ",
          }
        }

        // Validate pickupDate
        if (item.pickupDate.trim() === "") {
          if (!errors.addItem) {
            errors.addItem = []
          }
          errors.addItem[i] = {
            ...errors.addItem[i],
            pickupDate: "Pickup date is required",
          }
        }

        // Validate returnDate
        if (item.returnDate.trim() === "") {
          if (!errors.addItem) {
            errors.addItem = []
          }
          errors.addItem[i] = {
            ...errors.addItem[i],
            returnDate: "Return date is required ",
          }
        }

        // Validate depositAmount
        if (item.depositAmount === null) {
          if (!errors.addItem) {
            errors.addItem = []
          }
          errors.addItem[i] = {
            ...errors.addItem[i],
            depositAmount: "Deposit amount is required ",
          }
        }

        // Validate overallStatus
        if (item.overallStatus.trim() === "") {
          if (!errors.addItem) {
            errors.addItem = []
          }
          errors.addItem[i] = {
            ...errors.addItem[i],
            overallStatus: "Overall status is required ",
          }
        }

        // Validate rentAmount
        if (item.rentAmount === null) {
          if (!errors.addItem) {
            errors.addItem = []
          }
          errors.addItem[i] = {
            ...errors.addItem[i],
            rentAmount: "Rent amount is required ",
          }
        }
      }
    }

    return errors
  }

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(), // Assign a unique ID to each new item
      depositAmount: null,
      discountAmount: 0,
      overallStatus: "",
      package: null,
      pickupDate: "",
      remark: "",
      rentAmount: null,
      returnDate: "",
      uniqueCode: "",
    }

    setData(prevData => ({
      ...prevData,
      addItem: [...prevData.addItem, newItem],
    }))
    setData(prevData => ({
      ...prevData,
      totalAmount: totalAmount,
    }))
  }

  const handleItemInputChange = async (event, index) => {
    console.log("triggered")
    const { name, value, type } = event.target
    console.log(data)

    console.log(name, value, type)

    if (name === "uniqueCode") {
      toast.dismiss()
      getProductById(value, index)
    }
    if (name === "delete") {
      setData(prevData => {
        const updatedItem = [...prevData.addItem]
        updatedItem.splice(index, 1) // Remove the item from the array
        return {
          ...prevData,
          addItem: updatedItem,
        }
      })
      return
    }

    // if(name === "pickupDate"){
    //   checkAvailability()
    // }

    setData(prevData => {
      const updatedItem = [...prevData.addItem]
      const itemToUpdate = updatedItem[index]

      if (type === "number") {
        itemToUpdate[name] = Number(value) // Convert value to number
      } else if (type === "date") {
        const dateValue = new Date(value)
        itemToUpdate[name] = dateValue.toISOString().split("T")[0] // Convert value to ISO string date format
      } else if (name === "package") {
        itemToUpdate[name] = Number(value)
        if (value === "3") {
          const rentPriceFor3Days = productData.rentPriceFor3Days
          itemToUpdate.rentAmount = rentPriceFor3Days
        } else if (value === "7") {
          const rentPriceFor7Days = productData.rentPriceFor7Days
          itemToUpdate.rentAmount = rentPriceFor7Days
        } else if (value === "10") {
          const rentPriceFor10Days = productData.rentPriceFor10Days
          itemToUpdate.rentAmount = rentPriceFor10Days
        }
      } else if (name === "rentAmount") {
        itemToUpdate[name] = Number(value) // Convert value to number for rentAmount
      } else {
        itemToUpdate[name] = value // Keep value as string for other types
      }

      if (name === "package" || name === "pickupDate") {
        const pickUpDate = new Date(itemToUpdate.pickupDate)
        const totalDays = parseInt(
          name === "package" ? value : itemToUpdate.package,
          10
        )
        if (!isNaN(pickUpDate.getTime()) && !isNaN(totalDays)) {
          const returnDate = new Date(pickUpDate)
          returnDate.setDate(returnDate.getDate() + totalDays)
          itemToUpdate.returnDate = returnDate.toISOString().split("T")[0]
        }
      }

      return {
        ...prevData,
        addItem: updatedItem,
      }
    })
  }

  const handleInputChange = event => {
    const { name, value, type } = event.target
    setData(prevData => {
      let updatedValue = value
      if (type === "number") {
        updatedValue = Number(value)
      } else if (type === "date") {
        const dateValue = new Date(value)
        updatedValue = dateValue.toISOString().split("T")[0]
      }
      return {
        ...prevData,
        [name]: updatedValue,
      }
    })
  }

  // to check the date availability start
  const [availabilityError, setAvailabilityError] = useState(false)
  const [availabilityResponse, setAvailabilityResponse] = useState([])

  // console.log(data.addItem[0].uniqueCode)
  // console.log(data.addItem[0].pickupDate)
  // console.log(data.addItem[0].returnDate)

  const checkAvailability = async () => {
    const dateAddItemLength = data.addItem.length
    console.log(dateAddItemLength)

    // const response = await get(
    //   `Order/checkAvailability?pickupDate=${data.addItem[0].pickupDate}&returnDate=${data.addItem[0].returnDate}&uniqueCode=${data.addItem[0].uniqueCode}`
    // )
    // console.log(response.message)
    // setAvailabilityResponse((prevAvailabilityResponse) => [
    //   ...prevAvailabilityResponse,
    //   response.message === "NotAvailable" ? response.message : "available"
    // ])
    // availabilityResponse.push(response.message === "NotAvailable" ? response.message : "available")
    setAvailabilityResponse([]);
    for(let i=0; i<dateAddItemLength; i++){
      console.log("run for " + i)
      const response = await get(`Order/checkAvailability?pickupDate=${data.addItem[i].pickupDate}&returnDate=${data.addItem[i].returnDate}&uniqueCode=${data.addItem[i].uniqueCode}`)
      console.log(response)
      setAvailabilityResponse(prevResponse => [...prevResponse, response.message === "NotAvailable" ? {message:response.message, uniqueCode:data.addItem[i].uniqueCode} : ""]);
      setAvailabilityError(false)
      if(response.message === "NotAvailable"){
        setAvailabilityError(true)
      }
    }

    setData(prevData => {
      return {
        ...prevData,
        ["totalRedeemLoyaltyPoint"]: Math.floor(data.totalLoyaltyPoint/2),
      }
    })
  }
  // to check the date availability end

  console.log(availabilityResponse)

  const submitForm = async e => {
    console.log("Submit clicked")
    e.preventDefault()
    console.log(data, "data in submit")
    setLoader(true)
    const newErrors = validateForm(data)
    console.log(newErrors)
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0 && availabilityError == false) {
      // Form submission logic goes here
      try {
        if (data.totalRedeemLoyaltyPoint > 0 && data.totalDiscount > 0) {
          return toast.error("Either enter discount or loyality!")
        }
        if (
          data.totalLoyaltyPoint > 0 &&
          data.totalLoyaltyPoint * 0.5 < data.totalRedeemLoyaltyPoint
        ) {
          return toast.error(
            "Redeem loyality point must be less than 50% of loyality point"
          )
        }
        const res = await post("Order/addMultiple", data)
        const result = await res.data
        console.log(result)
        setLoader(false)
        toast.success("Order added successfully..")
        navigate("/Order")
      } catch (error) {
        // debugger
        setLoader(false)
        toast.error(error.response.data.message)
        console.log(("error", error))
      }
      console.log("Form submitted successfully")
    } else {
      setLoader(false)
      console.log("Form has errors")
    }
  }

  // getting data from category list
  const getCategory = async () => {
    try {
      setCategoryLoader(true)
      const res = await get(`Product/CategorySelectList`)
      const result = await res.data.list
      console.log(result)
      setCategoryLoader(false)
      setCategoryData(result)
    } catch (error) {
      setCategoryLoader(false)
      throw error
    }
  }
  //get customer details based on mobile number
  const getCustomer = async e => {
    try {
      const res = await get(`Customer/getProfile?mobileNo=${e.target.value}`)
      const result = await res?.data.result
      console.log("getCustomer", result)
      console.log(res)
      setData(prevData => ({
        ...prevData,
        totalLoyaltyPoint: result?.totalLoyaltyPoint,
        customerName: result?.firstName,
      }))
    } catch (error) {
      toast.error("Invalid Mobile Number")
      setData(prevData => ({
        ...prevData,
        totalLoyaltyPoint: null,
        customerName: "",
      }))
      // throw error
    }
  }
  //getProductById
  const getProductById = async (value, rowIndex) => {
    try {
      console.log(data)
      const uniqueCode = value

      // Check if the unique code is already used in another row
      const isDuplicate = data.addItem.some(
        (item, index) => index !== rowIndex && item.uniqueCode === uniqueCode
      )
      if (isDuplicate) {
        // Display an error message for duplicate unique code
        toast.error("Duplicate unique code entered")
        // Clear the input value of the duplicated row
        uniqueRef.current.value = ""
        return
      }
      const res = await get(`Product/viewByUniqueCode?uniqueCode=${uniqueCode}`)
      const result = res.data.result
      console.log("getProductById", result)
      setProductData(result)
      setData(prevData => {
        const updatedAddItem = [...prevData.addItem]
        const itemToUpdate = updatedAddItem[rowIndex]
        // Update the corresponding row's data
        itemToUpdate.depositAmount = result.depositAmount
        itemToUpdate.discountAmount = result.discountAmount
        itemToUpdate.rentAmount = result.rentAmount
        return {
          ...prevData,
          addItem: updatedAddItem,
        }
      })
    } catch (error) {
      // toast.error("Something went wrong")
      console.log(error)
    }
  }

  const handleTotalDiscountChange = e => {
    const newTotalDiscount = e.target.value
    setTotal(prevState => ({
      ...prevState,
      totalDiscount: newTotalDiscount,
    }))

    setData(prevData => ({
      ...prevData,
      totalDiscount: newTotalDiscount,
    }))
  }
  const updateTotalAmount = () => {
    let depositSum = 0
    let rentSum = 0
    let discountSum = 0

    data.addItem.forEach(item => {
      if (!item.isDeleted) {
        // Skip deleted rows
        depositSum += Number(item.depositAmount)
        rentSum += item.rentAmount ? Number(item.rentAmount) : 0
        discountSum += Number(item.discountAmount)
      }
    })

    const totalAmountWithoutRedeem = depositSum + rentSum - discountSum

    setData(prevData => ({
      ...prevData,
      totalDepositAmount: depositSum,
      totalRentAmount: rentSum,
      totalDiscount: discountSum,
      totalAmount:
        totalAmountWithoutRedeem - Number(prevData.totalRedeemLoyaltyPoint),
    }))

    const totalAmount =
      totalAmountWithoutRedeem - Number(data.totalRedeemLoyaltyPoint)

    setTotal({
      totalDeposit: depositSum,
      totalRent: rentSum,
      totalDiscount: discountSum,
      totalAmount: totalAmount,
    })
  }
  useEffect(() => {
    updateTotalAmount()
    getUniqueCode()
  }, [data.addItem, data.totalRedeemLoyaltyPoint])

  useEffect(() => {
    getCategory()
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

  console.log(data)
  console.log(errors)

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title="Dashboard"
            breadcrumbItem="Add Order"
            path={"/dashboard"}
            path1={"/Order"}
            title1={"Order"}
          />

          <div className="row">
            <div className="col-xs-12">
              <form onSubmit={submitForm}>
                <div className="card">
                  <div className="card-body">
                    <div className="card-title">Basic Information</div>

                    <div className="row">
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="mobileNo">Mobile Number</label>
                          <input
                            id="mobileNo"
                            name="mobileNo"
                            type="string"
                            className="form-control"
                            placeholder="Mobile Number"
                            maxLength={10}
                            onChange={e => handleInputChange(e)}
                            onBlur={e => getCustomer(e)}
                          />
                          {errors?.mobileNo && (
                            <div style={{ color: "red" }}>
                              {errors?.mobileNo}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="customerName">Customer Name</label>
                          <input
                            id="customerName"
                            name="customerName"
                            type="text"
                            className="form-control"
                            placeholder="Customer Name"
                            value={data.customerName || ""}
                            onChange={e => handleInputChange(e)}
                            min={5}
                            readOnly
                            maxLength={50}
                          />
                          {errors?.customerName && (
                            <div style={{ color: "red" }}>
                              {errors?.customerName}
                            </div>
                          )}
                        </div>
                      </div>
                      {/* <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="dresstype">Dress Category</label>
                          <select
                            className="form-control select2"
                            name="dressType"
                            onChange={e => handleInputChange(e)}
                          >
                            <option>Select</option>
                            {categoryLoader ? (
                              <option>Loading...</option>
                            ) : (
                              categoryData?.length &&
                              categoryData.map((item, idx) => (
                                <option key={idx}>{item.name}</option>
                              ))
                            )}
                          </select>
                          {errors?.dressType && (
                            <div style={{ color: "red" }}>
                              {errors?.dressType}
                            </div>
                          )}
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="row mt-3 mb-3">
                      <div className="col-lg-12">
                        <div
                          className="d-flex mb-3"
                          style={{ justifyContent: "flex-end" }}
                        >
                          <button
                            type="button"
                            onClick={handleAddItem}
                            className="btn btn-primary"
                          >
                            <i className="mdi mdi-plus me-1"></i>Add Item
                          </button>
                        </div>
                        <div className="table-responsive mb-3">
                          <div>
                            {console.log(availabilityResponse)}
                            {availabilityResponse.map((item, index) => {
                              return(
                              <div key={index}>
                                <p style={{color:"red"}}>{item?.uniqueCode ? `${item?.uniqueCode} is not available on selected date` : null}</p>
                              </div>
                              )
                            })}
                          </div>
                          <table className="table table-item table-nowrap  mb-0 no-footer">
                            <thead className="table-light table-nowrap">
                              <tr>
                                <th style={{ width: "60px" }}>Unique code</th>
                                <th style={{ width: "100px" }}>Package</th>
                                <th style={{ width: "100px" }}>Pickup date</th>
                                <th style={{ width: "100px" }}>Return Date</th>
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
                              {data.addItem.map((itemObj, index) => (
                                <tr key={index}>
                                  <td style={{ width: "60px" }}>
                                    {/* <input
                                      type="text"
                                      name="uniqueCode"
                                      placeholder="UniqueCode"
                                      className="form-control"
                                      id="uniqueCode"
                                      ref={uniqueRef}
                                      onChange={e =>
                                        handleItemInputChange(e, index)
                                      }
                                    /> */}
                                    {/* <Select
                                      defaultValue={selectedOption}
                                      onChange={e => handleSelectChange(e,index,"uniqueCode")}
                                      placeholder="Select the Unique code"
                                      options={uniqueCodeList}
                                      noOptionsMessage={() => "Unique code not found..."}
                                    /> */}

                                    <input
                                      list="browsers"
                                      type="text"
                                      name="uniqueCode"
                                      placeholder="UniqueCode"
                                      className="form-control"
                                      id="uniqueCode"
                                      ref={uniqueRef}
                                      // value={selectedBrowser}
                                      onChange={e =>
                                        handleItemInputChange(e, index)
                                      }
                                      // onChange={handleItemInputChange}
                                    />
                                    <datalist id="browsers">
                                      {/* <option value="Edge" />
                                      <option value="Firefox" />
                                      <option value="Chrome" />
                                      <option value="Opera" />
                                      <option value="Safari" /> */}
                                      {uniqueCodeList &&
                                        uniqueCodeList.map((item, index) => {
                                          console.log(item.uniqueCode)
                                          return (
                                            <option
                                              key={index}
                                              value={item.uniqueCode}
                                            />
                                          )
                                        })}
                                    </datalist>
                                    {errors?.addItem &&
                                      errors?.addItem[index] &&
                                      errors?.addItem[index]?.uniqueCode && (
                                        <p className="error-message">
                                          {errors?.addItem[index]?.uniqueCode}
                                        </p>
                                      )}
                                  </td>
                                  <td style={{ width: "100px" }}>
                                    <select
                                      className="form-control select2 mb-3 mb-xxl-0"
                                      id="package"
                                      name="package"
                                      onChange={e =>
                                        handleItemInputChange(e, index)
                                      }
                                    >
                                      <option value="">select </option>
                                      <option>3 </option>
                                      <option>7 </option>
                                      <option>10 </option>
                                    </select>
                                    {errors?.addItem &&
                                      errors?.addItem[index] &&
                                      errors?.addItem[index]?.package && (
                                        <p className="error-message">
                                          {errors?.addItem[index]?.package}
                                        </p>
                                      )}
                                  </td>
                                  <td style={{ width: "100px" }}>
                                    <input
                                      type="date"
                                      name="pickupDate"
                                      placeholder="dd-mm-yyyy"
                                      className="form-control"
                                      id="pickupDate"
                                      onChange={e =>
                                        handleItemInputChange(e, index)
                                      }
                                      onBlur={checkAvailability}
                                    />
                                    {errors?.addItem &&
                                      errors?.addItem[index] &&
                                      errors?.addItem[index]?.pickupDate && (
                                        <p className="error-message">
                                          {errors?.addItem[index]?.pickupDate}
                                        </p>
                                      )}
                                  </td>

                                  <td style={{ width: "100px" }}>
                                    <input
                                      type="date"
                                      name="returnDate"
                                      value={itemObj.returnDate}
                                      placeholder="dd-mm-yyyy"
                                      className="form-control"
                                      id="returnDate"
                                      disabled
                                    />
                                    {errors?.addItem &&
                                      errors?.addItem[index] &&
                                      errors?.addItem[index]?.returnDate && (
                                        <p className="error-message">
                                          {errors?.addItem[index]?.returnDate}
                                        </p>
                                      )}
                                  </td>

                                  <td style={{ width: "100px" }}>
                                    <input
                                      type="number"
                                      name="rentAmount"
                                      value={itemObj.rentAmount}
                                      placeholder="0.00"
                                      className="form-control"
                                      id="rentAmount"
                                      onChange={e =>
                                        handleItemInputChange(e, index)
                                      }
                                    />

                                    {errors?.addItem &&
                                      errors?.addItem[index] &&
                                      errors?.addItem[index]?.rentAmount && (
                                        <p className="error-message">
                                          {errors?.addItem[index]?.rentAmount}
                                        </p>
                                      )}
                                  </td>
                                  <td style={{ width: "100px" }}>
                                    <input
                                      type="number"
                                      name="depositAmount"
                                      value={itemObj.depositAmount}
                                      placeholder="0.00"
                                      className="form-control"
                                      id="depositAmount"
                                      onChange={e =>
                                        handleItemInputChange(e, index)
                                      }
                                    />
                                    {errors?.addItem &&
                                      errors?.addItem[index] &&
                                      errors?.addItem[index]?.depositAmount && (
                                        <p className="error-message">
                                          {
                                            errors?.addItem[index]
                                              ?.depositAmount
                                          }
                                        </p>
                                      )}
                                  </td>
                                  <td style={{ width: "100px" }}>
                                    <input
                                      type="number"
                                      name="discountAmount"
                                      value={itemObj.discountAmount}
                                      placeholder="0.00"
                                      className="form-control"
                                      id="discount"
                                      onChange={e =>
                                        handleItemInputChange(e, index)
                                      }
                                    />
                                  </td>
                                  <td style={{ width: "180px" }}>
                                    <select
                                      className="form-control select2 mb-3 mb-xxl-0"
                                      id="overallStatus"
                                      onChange={e =>
                                        handleItemInputChange(e, index)
                                      }
                                      name="overallStatus"
                                    >
                                      <option value={""}> select</option>
                                      <option>
                                        {" "}
                                        Rent Paid Deposit Pending{" "}
                                      </option>
                                      <option>Rent Paid Deposit paid</option>
                                    </select>
                                    {errors?.addItem &&
                                      errors?.addItem[index] &&
                                      errors?.addItem[index]?.overallStatus && (
                                        <p className="error-message">
                                          {
                                            errors?.addItem[index]
                                              ?.overallStatus
                                          }
                                        </p>
                                      )}
                                  </td>
                                  <td style={{ width: "180px" }}>
                                    <input
                                      type="text"
                                      placeholder="Remark"
                                      className="form-control"
                                      id="remark"
                                      name="remark"
                                      onChange={e =>
                                        handleItemInputChange(e, index)
                                      }
                                    />
                                  </td>
                                  <td>
                                    {index > 0 && (
                                      <button
                                        className="btn btn-danger"
                                        onClick={e =>
                                          handleItemInputChange(e, index)
                                        }
                                        name="delete"
                                      >
                                        Delete
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="totalrent">Total Rent Amount</label>

                          <input
                            id="totalrent"
                            name="totalrent"
                            type="number"
                            className="form-control"
                            placeholder="Total Rent Amount"
                            value={total.totalRent}
                            readOnly
                            min={0}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="depositAmount">
                            Total Amount deposit
                          </label>

                          <input
                            id="totalDeposit"
                            name="totalDeposit"
                            type="number"
                            className="form-control"
                            placeholder="Total Amount Deposit"
                            value={total.totalDeposit}
                            min={0}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="discount">Total Discount</label>

                          <input
                            id="totalDiscount"
                            name="totalDiscount"
                            type="number"
                            className="form-control"
                            placeholder="Total Discount"
                            value={total.totalDiscount}
                            onChange={e => handleTotalDiscountChange(e)}
                            min={0}
                          />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="loyaltyPoint">
                            Total Loyalty Points
                          </label>
                          <input
                            id="totalLoyality"
                            name="totalLoyaltyPoint"
                            type="number"
                            value={data.totalLoyaltyPoint || ""}
                            className="form-control"
                            placeholder="Total Loyalty Points"
                            onChange={handleInputChange}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="redeemLoyaltyPoint">
                            Total Redeem Loyalty points
                          </label>

                          <input
                            id="redeemLoyaltyPoint"
                            name="totalRedeemLoyaltyPoint"
                            type="number"
                            className="form-control"
                            placeholder="Total Redeemed Loyalty Points"
                            onChange={e => handleInputChange(e)}
                            value={data?.totalRedeemLoyaltyPoint ? data?.totalRedeemLoyaltyPoint: (data.totalLoyaltyPoint)? Math.floor(data.totalLoyaltyPoint/2) : 0}
                            // readOnly
                          />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="totalAmount">Total Amount</label>

                          <input
                            id="totalAmount"
                            name="totalAmount"
                            type="number"
                            className="form-control"
                            placeholder="Total Amount"
                            min={0}
                            value={data.totalAmount}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="totalamt">Payment Method</label>
                          <select
                            className="form-control select2 mb-3 mb-xxl-0"
                            name="paymentMethod"
                            onChange={e => handleInputChange(e)}
                          >
                            <option>select</option>
                            <option>Cash</option>
                            <option>Card</option>
                            <option>GPAY</option>
                            <option>PHONEPE</option>
                            <option>CHEQUE</option>
                            <option>OTHER</option>
                          </select>
                          {errors?.paymentMethod && (
                            <div style={{ color: "red" }}>
                              {errors?.paymentMethod}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mb-3">
                          <label htmlFor="paymentStatus">Payment Status</label>
                          <select
                            className="form-control select2"
                            name="paymentStatus"
                            onChange={e => handleInputChange(e)}
                          >
                            <option>Select</option>
                            <option>Paid</option>
                            <option>Pending</option>
                          </select>
                          {errors?.paymentStatus && (
                            <div style={{ color: "red" }}>
                              {errors?.paymentStatus}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap gap-2">
                      <button
                        type="submit"
                        color="primary"
                        className="btn btn-primary "
                      >
                        Submit
                      </button>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Orderform
