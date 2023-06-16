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
import DeleteModal from "../../components/Common/DeleteModal";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const Viewtransaction = () => {

    const toggleMenuCallback = () => {
        if (leftSideBarType === "default") {
            dispatch(changeSidebarType("condensed", isMobile));
        } else if (leftSideBarType === "condensed") {
            dispatch(changeSidebarType("default", isMobile));
        }
    };
    const [deleteModal, setDeleteModal] = useState(false);

    const onClickDelete = () => {

        setDeleteModal(true);
    };

    const handleDeleteOrder = () => {

        setDeleteModal(false);

    };
    //meta title
    document.title = "Trends on Rent";
    return (
        <React.Fragment>
            <DeleteModal
                show={deleteModal}
                onDeleteClick={handleDeleteOrder}
                onCloseClick={() => setDeleteModal(false)}
            />

            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Dashboard" breadcrumbItem="Transaction History" />

                    <div className="row">
                        <div className="col" style={{ padding: "0" }}>
                            <div className="card">
                                <div className="card-body">

                                    <div className="mb-3 row">
                                        <div className="col-sm-6">
                                            <div className="mb-3 row">
                                                <label htmlFor="gender" className="col-md-4">Customer Name</label>
                                                <div className="col-md-8">
                                                    <p className="text-muted">Ruchita</p>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-3 row">
                                                <label htmlFor="gender" className="col-md-4">
                                                    Mobile Number
                                                </label>
                                                <div className="col-md-8">
                                                    <p className="text-muted" >9156427293</p>
                                                </div>
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
                                                className="custom-header-css table table-bordered table-hover"
                                            >
                                                <thead className="table-light table-nowrap">
                                                    <tr>
                                                        <th>Product</th>
                                                        <th>PickUp Date</th>
                                                        <th>Return Date</th>
                                                        <th>Amount Deposit</th>
                                                        <th>Discount/Loyalty</th>
                                                        <th>Discount</th>
                                                        <th>Loyalty</th>
                                                        <th>Loyalty Point redeemed</th>
                                                        <th>Total Amount</th>
                                                        <th>Payment Method</th>
                                                        <th>Transaction status</th>
                                                        <th>Action</th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td><img src="" />Lehenga</td>
                                                        <td>20/05/2022</td>
                                                        <td>23/05/2022</td>
                                                        <td>1000/-</td>
                                                        <td>Loyalty</td>
                                                        <td>-</td>
                                                        <td>50/</td>
                                                        <td>Redeemed</td>
                                                        <td>6000/-</td>
                                                        <td>Gpay</td>
                                                        <td><span className="font-size-12 badge-soft-success badge bg-success">Done</span></td>
                                                        <td>
                                                            <button className="p-1 btn-delete" onClick={() => { onClickDelete(); }} ><i className="mdi mdi-trash-can font-size-18 text-danger me-1"></i></button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><img src="" />Lehenga</td>
                                                        <td>2/08/2022</td>
                                                        <td>7/08/2022</td>
                                                        <td>1000/-</td>
                                                        <td>Discount</td>
                                                        <td>10/-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>10,000/-</td>
                                                        <td>Cash</td>
                                                        <td><span className="font-size-12 badge-soft-danger badge bg-danger">Pending</span></td>
                                                        <td>
                                                            <button className="p-1 btn-delete" onClick={() => { onClickDelete(); }} ><i className="mdi mdi-trash-can font-size-18 text-danger me-1"></i></button>
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
                                                <input min="1" max="2" type="number" className="form-control" value="1" style={{ width: "70px;" }} /></div>
                                            <div className="col-md-auto col"><div className="d-flex gap-1">
                                                <button type="button" className="btn btn-primary">&gt;</button>
                                                <button type="button" className="btn btn-primary">&gt;&gt;</button>
                                            </div></div></div>

                                    </div>
                                    <hr />
                                    <div className="row transactionamt" style={{ justifyContent: "flex-end" }}>
                                        <div className="col-sm-6">
                                            <div className="mb-3 row" style={{ textAlign: "right" }}>
                                                <label htmlFor="gender" className="col-md-4">
                                                    Total Amount
                                                </label>
                                                <div className="col-md-8">
                                                    <h5 className="text-success" >16,000/-</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-wrap gap-2">

                                        <Link type="submit" to="/transaction" color="secondary" className="btn btn-secondary">
                                            Back
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>


    );
};

export default Viewtransaction;
