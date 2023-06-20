import React, { useEffect, useState } from "react"

import { Link, useParams } from "react-router-dom"

import { Card, CardBody, Col, Container, Row, Table } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Image
import logo from "../../assets/images/logo.png"
import sidepart from "../../assets/images/Invoice/desin.png"
import sidepart1 from "../../assets/images/Invoice/foot.png"
import { get } from "helpers/api_helper"

//redux

const Invoice = props => {
  //meta title
  document.title = "Trend on Rent"

  // to get the order id from param start
  const { invoiceId } = useParams()
  console.log(invoiceId)
  // to get the order id from param end

  // to get the invoice data start

  const [invoiceData, setInvoiceData] = useState("")
  const getInvoiceData = async () => {
    const response = await get(`Order/getInvoiceDetails?orderId=${invoiceId}`)
    // console.log(response)
    try {
      if (response) {
        setInvoiceData(response.data.result)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getInvoiceData()
  }, [])
  // to get the invoice data end

  //Print the Invoice
  const printInvoice = () => {
    window.print()
  }

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

  console.log(invoiceData)

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">

          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Invoices" breadcrumbItem="Invoice" />


          <div className="card card-in">
            <div className="card-body">
              <div className="invoice-title ">
                {/* <h4 className="float-end font-size-16">
                        Order # {invoiceDetail.orderId}
                      </h4> */}
                <div className="">
                  <img
                    src={logo}
                    alt="logo-dark"
                    className="logo-dark-element"
                    height="85"
                  />
                </div>
                <div className="">
                  <img
                    src={sidepart}
                    alt="logo-dark"
                    height="150"
                    style={{ position: "absolute", top: "0", right: "0" }}
                  />
                </div>
              </div>
              <div className="heading">
                <h1>Invoice</h1>
              </div>
              <table className="table-invoice">
                <tr>
                  <td>
                    <span className="invoice_bill1">
                      <address>
                        <strong className="heading_in1">Billed To :</strong>

                        <div className="mt-3">
                          <p className="text-muted invoice_add ">
                            {invoiceData?.billToName}
                          </p>
                          <p className="text-muted invoice_add">
                            {invoiceData?.billToMobileNo}
                          </p>
                          <p className="text-muted invoice_add w-50">
                            {invoiceData?.billToAddress}
                          </p>
                        </div>
                      </address>
                    </span>
                  </td>
                  <td>
                    <span
                      className="invoice_bill1"
                      style={{ textAlign: "right" }}
                    >
                      <address>
                        <strong className="heading_in1">Order No.</strong>
                        <p className="text-muted">{invoiceData?.orderId}</p>
                      </address>
                      <address>
                        <strong className="heading_in1">Order Date:</strong>
                        <p className="text-muted">{invoiceData?.date}</p>
                      </address>
                    </span>
                  </td>
                </tr>
              </table>
              {/* <div className="invoice_bill">
                    <span className="invoice_bill1">
                      <address>
                        <strong className="heading_in1">Billed To :</strong>

                        <div className="mt-3">
                          <p className="text-muted invoice_add ">
                            {invoiceData?.billToName}
                          </p>
                          <p className="text-muted invoice_add">
                            {invoiceData?.billToMobileNo}
                          </p>
                          <p className="text-muted invoice_add w-40">
                            {invoiceData?.billToAddress}
                          </p>
                        </div>
                      </address>
                    </span>
                    <span
                      className="invoice_bill1"
                      style={{ textAlign: "right" }}
                    >
                      <address>
                        <strong className="heading_in1">Order No.</strong>
                        <p className="text-muted">{invoiceData?.orderId}</p>
                      </address>
                      <address>
                        <strong className="heading_in1">Order Date :</strong>
                        <p className="text-muted">{invoiceData?.date}</p>
                      </address>
                    </span>
                  </div> */}

              <div className="table-responsive table_in mb-3">
                <table className="table table-decription table-bordered table-nowrap">
                  <thead>
                    <tr>
                      <th className="">Sr No.</th>
                      <th className="">Unique Code</th>
                      <th className="">Description</th>
                      <th className="">Pickup Date</th>
                      <th className="">Return Date</th>
                      <th className="">Rent</th>
                      <th className="">Discount</th>
                      <th className="">Total</th>
                    </tr>
                  </thead>
                  {invoiceData?.tableItemDetails?.map((item, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>puhdsha</td>
                          <td>{item?.description}</td>
                          <td>{item?.pickDate}</td>
                          <td>{item?.returnDate}</td>
                          <td>{item?.rent}</td>
                          <td>{item?.discount}</td>
                          <td>{item?.total}</td>
                        </tr>
                      </tbody>
                    )
                  })}
                  {/* <tbody>
                        <tr>
                          <td>1</td>
                          <td>scnjsdnsjd</td>
                          <td>23-02-2022</td>
                          <td>24-02-2023</td>
                          <td>scnjsdnsjd</td>
                          <td>Sub Total</td>
                          <td>3000</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>hhsas</td>
                          <td>23-02-2022</td>
                          <td>24-02-2023</td>
                          <td>scnjsdnsjd</td>
                          <td>Sub Total</td>
                          <td>3000</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>scnjsdnsjd</td>
                          <td>23-02-2022</td>
                          <td>24-02-2023</td>
                          <td>scnjsdnsjd</td>
                          <td>Sub Total</td>
                          <td>3000</td>
                        </tr>
                      </tbody> */}
                </table>
              </div>
              <div className="invoice_term">

                <table className="table-total">
                  <tr>
                    <td>
                      <div className="mb-2 d-flex justify-content-between ">
                        <strong className="heading_in1">Sub Total :</strong>
                        <p className="text-right">{invoiceData?.subTotal}</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="mb-2 d-flex justify-content-between ">
                        <strong className="heading_in1">GST:</strong>
                        <p className="text-right">{invoiceData?.gstTotal}</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="mb-2 d-flex justify-content-between ">
                        <strong className="heading_in1">Despoit :</strong>
                        <p className="text-right">
                          {invoiceData?.depositTotal}
                        </p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="mb-2 d-flex justify-content-between ">
                        <strong className=" total_heading">Total :</strong>
                        <p className="text-right">{invoiceData?.grandTotal}</p>
                      </div>

                    </td>
                  </tr>

                </table>
              </div>
              {/* <div className="row print-row">
                <table className="table-print">
                  <tr>
                    <td>
                      <div className="d-print-none">
                        <div className="float-end">
                          <Link
                            to="#"
                            onClick={printInvoice}
                            className="btn btn-success  me-2"
                          >
                            <i className="fa fa-print" />
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </div> */}
              <div className="mb-4">
                <img
                  src={sidepart1}
                  alt="logo-dark"
                  height="150"
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    zIndex: "-2",
                  }}
                />
              </div>
            </div>
          </div>

          <div
            className="card card-in"
            
          >
            <div className="card-body">
              <div className="termcondition">
                <h3 className="heading_in1">Terms & Conditions</h3>
                <ul>
                  <li><b>Minimum Renting Duration: </b> <strong>3 days.</strong>
                    <ul>
                      <li><b>First Day-</b> Dress can be picked up anytime after <strong>2:00 pm</strong> </li>
                      <li><b>Second Day - </b> Highlight day when you'll look amazing and be the center of attraction.</li>
                      <li><b>Third Day  - </b> Dress must be returned before <strong>8:30 pm </strong></li>
                    </ul>
                  </li>
                  <li><b> Renting Packages: </b> We offer <strong>3-day</strong>, <strong>7-day</strong> and <strong>10-day </strong> packages with pickup and return on the first and last day respectively.</li>
                  <li> <b>Pickup and Return Timing:</b> For all rentals, pickup after <strong>2:00 pm </strong> and return before <strong>8:30 pm.</strong></li>
                  <li><b>Delay in Return:</b> Please inform us in advance for any delays. No charge for delays of a few hours, but additional charges for non-return on the designated day.</li>
                  <li><b> Non-Refundable Rent Amount:</b> Rent paid is non-refundable</li>
                  <li><b>Deposit Amount:</b> A deposit is required to secure the dress. Deposit varies for each dress and is specified during rental. Deposit returned within <strong> 3 days </strong> of dress return.</li>
                  <li><b>Trend on Rent </b> denies liability for losses caused by handover delays and defers all matters to the Pune court</li>
                </ul>
                <em className="termsem">By renting a dress, you agree to abide by these terms and conditions.</em>
              </div>
              <div className="policy">
                <h3 className="heading_in1">Policy</h3>
                <ul>
                  <li>
                    <b>Event Date Change Policy:</b> Change your event date at no
                    extra charge if available. Choose another dress of
                    equal or higher cost if the original dress is
                    unavailable. No refunds for lower-cost dresses.
                  </li>
                  <li>
                  <b>Date Change Intimation Policy:</b> Notify us at least 3
                    days prior to pickup to change the date without
                    charge. Within 3 days, a 50% rental charge applies,
                    and full rent is charged for new dates.
                  </li>
                  <li>
                    {" "}
                    <b>Dress Damage Policy:</b> Handle dresses with care. We
                    assess damage for free repairs. Customer pays repair
                    costs if applicable. Unrepairable damage incurs a
                    purchase fee, generally 5 times or more the rental
                    amount.
                  </li>
                  <li>
                    <b>Dress Loss Policy:</b> Customers pay for lost dresses,
                    generally 5 times or more the rental amount.
                  </li>
                  <li>
                    <b>Dress Condition and Stains Policy:</b> Dresses are dry
                    cleaned but may have minor visible stains. Inspect
                    carefully before renting and discuss visible stains
                    with staff before payment.
                  </li>
                  <li>
                   <b> Return and Late Return Policy:</b> Return dresses on time.
                    Late returns may have consequences. Delays or damage
                    may affect providing the dress to the next customer.
                    We offer alternative solutions or full refunds if
                    unsatisfied.
                  </li>
                </ul>
              </div>

              <div className="row print-row float-end">
                <table className="table-print">
                  <tr>
                    <td>
                      <div className="d-print-none">
                        <div className="float-end">
                          <Link
                            to="#"
                            onClick={printInvoice}
                            className="btn btn-success  me-2"
                          >
                            <i className="fa fa-print" />
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}

export default Invoice
