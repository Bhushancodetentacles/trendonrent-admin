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

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const AddCategory = () => {

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
                    <Breadcrumbs title="Dashboard" breadcrumbItem="Packages" />

                    <div className="row">
                        <div className="col" style={{ padding: "0" }}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">

                                       
                                        <div className="col-md-10"></div>
                                        <div className="col-md-2 mb-3" style={{ textAlign: "right" }} >
                                            <a className="btn-rounded mb-2 me-2  me-xxl-2 my-3 my-xxl-0 btn btn-success" href="/Addpackages">
                                                <i className="mdi mdi-plus me-1"></i>Add Packages</a></div>
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
                                                        <th>Id</th>
                                                        <th>
                                                            Packages
                                                        </th>
                                                      

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                    <td>1</td>
                                                    <td>3 days</td>
                                                  
                                                    </tr>
                                                    <tr>
                                                    <td>2</td>
                                                    <td>7 Days</td>
                                                  
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

export default AddCategory;
