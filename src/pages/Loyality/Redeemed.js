import React, { useState } from "react";
// import { Button, Label, } from "reactstrap";
// import Header from "components/VerticalLayout/Header";
// import Footer from "components/VerticalLayout/Footer";
// import Sidebar from "components/VerticalLayout/Sidebar";
import { Link } from "react-router-dom";
// import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "../../assets/css/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/scss/datatables.scss";
import { Pagination } from "@mui/material";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const Redeemed = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [EndDate, setEndDate] = useState(new Date());
    const toggleMenuCallback = () => {
        if (leftSideBarType === "default") {
            dispatch(changeSidebarType("condensed", isMobile));
        } else if (leftSideBarType === "condensed") {
            dispatch(changeSidebarType("default", isMobile));
        }
    };
    //meta title
    document.title = "Trends on Rent";
    return (
        <React.Fragment>



            <div className="row">
                <div className="col" style={{ padding: "0" }}>
<div className="card">
    <div className="card-body">
                    <div className="mb-3 row">

                        <div className="col-xl-3 col-md-3 col-md-4">
                            <label>Day</label>
                            <select className="form-control select2" name="days" >
                                <option>Select</option>
                                <option value="0">1</option>
                                <option value="1">2</option>
                                <option value="2">3</option>
                                <option values="6">4</option>
                                <option value="7">5</option>
                                <option value="8">6</option>
                                <option value="9">7</option>
                                <option values="10">8</option>
                                <option value="11">9</option>
                                <option values="12">12</option>
                            </select>
                        </div>
                        <div className=" col-xl-3 col-md-3 col-sm-4">
                            <label>From Date</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                className="form-control"
                                dateFormat="d-MM-yyyy"
                                placeholderText="From Date"
                            />
                        </div>
                        <div className=" col-xl-3 col-md-3 col-sm-4">
                            <label>To Date</label>
                            <DatePicker
                                selected={EndDate}
                                onChange={(date) => setEndDate(date)}
                                className="form-control"
                                dateFormat="d-MM-yyyy"
                                placeholderText="To Date"
                            />
                        </div>
                        <div className="col-xl-3 col-md-2 col-sm-3">
                            <div className="mt-lg-4 mt-0 mt-sm-4 mt-xs-4">

                                <button type="button" className="btn btn-filter w-100">
                                    <i className="mdi mdi-filter-outline align-middle"></i> Filter</button>
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                    <div className="col-md-7  mx-auto justify-content-center">
                        <div className=" row mx-auto loyalty justify-content-center">
                            <label htmlFor="loyalty" className="col-md-6 text-center header1">Total Loyalty Redeemed</label>
                            <div className="col-md-3 text-left d-flex item-center">
                                <h5 className="text-success header1">8</h5>
                            </div>
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
                                        <th>Sr.No</th>
                                        <th>Customers Name</th>
                                        <th>
                                            Loyalty Redeemed
                                        </th>
                                        <th className="text-center">Expiry Date</th>
                                        <th className="text-center">Status</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Ruchita</td>
                                        <td>At account creation time -Rs 50/-</td>
                                        <td className="text-center">23-08-2023</td>
                                        <td className="text-center"></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Ruchita</td>
                                        <td>Birthday/ anniversary before 5 days- Rs 50/-</td>
                                        <td className="text-center">23-08-2023</td>
                                        <td className="text-center"></td>

                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Ruchita</td>
                                        <td>For diwali before 10 days- Rs 50/-</td>
                                        <td className="text-center">23-08-2023</td>
                                        <td className="text-center"></td>

                                    </tr>
                                </tbody>
                            </table>


                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Pagination
                                color="primary"
                                shape="rounded"
                            />
                        </div>
                    </div>
                </div>
                </div>
                </div>
            </div>
        </React.Fragment>


    );
};

export default Redeemed;
