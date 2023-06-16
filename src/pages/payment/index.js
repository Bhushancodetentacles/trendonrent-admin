import React, { useState } from "react";
// import { Button, Label, } from "reactstrap";
// import Header from "components/VerticalLayout/Header";
// import Footer from "components/VerticalLayout/Footer";
// import Sidebar from "components/VerticalLayout/Sidebar";
// import { Link } from "react-router-dom";
// import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "../../assets/css/style.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const Rentorder = () => {

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
            {/* <div id="layout-wrapper">
                <Header></Header>
                <Sidebar></Sidebar>

                <div className="main-content"> */}
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Dashboard" breadcrumbItem="Order" />

                    <div className="row">
                        <div className="col" style={{ padding: "0" }}>
                            <div className="card">
                                <div className="card-body">
                                <div className="row">
                                        <div className="col-md-2">
                                            <select className="form-select me-xxl-2 my-3 my-xxl-0 d-inline-block">
                                                <option value="10">Show 10</option>
                                                <option value="20">Show 20</option>
                                                <option value="30">Show 30</option>
                                                <option value="40">Show 40</option>
                                                <option value="50">Show 50</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="search-box  me-xxl-2 my-3 my-xxl-0 d-inline-block">
                                                <div className="position-relative">
                                                    <label htmlFor="search-bar-0" className="search-label">
                                                        <span id="search-bar-0-label" className="sr-only">Search this table</span>
                                                        <input id="search-bar-0" type="text" className="form-control" placeholder="13 records..." value="" />
                                                    </label>
                                                    <i className="bx bx-search-alt search-icon"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4"></div>
                                        <div className="col-md-2 mb-3" style={{ textAlign: "right" }} >
                                            <a className="btn-rounded mb-2 me-2  me-xxl-2 my-3 my-xxl-0 btn btn-success" href="/addpayment">
                                                <i className="mdi mdi-plus me-1"></i>Add Payment</a></div>
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
                                                        <th>Unique code</th>
                                                        <th>Customer Name</th>
                                                        <th>Dress Photo</th>
                                                        <th>Dress Type</th>
                                                         <th>PickUp Date</th>    
                                                        <th>Return Date</th>   
                                                        <th>Total Days</th>
                                                        <th>Customer Mobile Number</th>
                                                        <th>Total Rent Amount</th>
                                                        <th>Loyality(50% redeem)</th>
                                                        <th>Amount Deposit</th>
                                                        <th>Deposit Amount Received</th>
                                                        <th>Unique Invoice Number</th>
                                                        <th>Transaction Status</th>                                           
                                                        
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                
                                                        <tr>
                                                            <td>2000 </td>
                                                            <td>Ruchita</td>
                                                            <td><img src="/static/media/img-1.fc0c27967f674639fc3d.png" alt="product-img" title="product-img" className="avatar-md"/></td>
                                                            <td>Lehenga</td>
                                                            <td>20-05-2023</td>
                                                            <td>22-05-2023</td>
                                                            <td>3</td>
                                                            <td>8767564327</td>
                                                            <td>2000/-</td>
                                                            <td>10%</td>
                                                            <td>500/-</td>
                                                            <td>yes</td>

                                                            <td>Bx7892</td>
                                                            <td><span className="font-size-12 badge-soft-success badge bg-secondary">Pending</span></td>
                                                            <td>
                                                        <a href="#" className="p-1">
                                                            <i className="mdi mdi-pencil font-size-18 text-success me-1"></i></a>
                                                        <a href="#" className="p-1"><i className="mdi mdi-trash-can font-size-18 text-danger me-1"></i></a>
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
                                                        <input min="1" max="2" type="number" className="form-control" value="1" style={{width: "70px;"}}/></div>
                                                        <div className="col-md-auto col"><div className="d-flex gap-1">
                                                        <button type="button" className="btn btn-primary">&gt;</button>
                                                        <button type="button" className="btn btn-primary">&gt;&gt;</button>
                                                        </div></div></div>
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


    );
};

export default Rentorder;
