import React from "react"
import { Navigate } from "react-router-dom"

import "../assets/css/style.css"

import Notification from "../pages/Notification/notification"
// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Pages Calendar
import Calendar from "../pages/Calendar/index"

// //Projects
import ProjectsGrid from "../pages/Projects/projects-grid"
import ProjectsList from "../pages/Projects/projects-list"
import ProjectsOverview from "../pages/Projects/ProjectOverview/projects-overview"
import ProjectsCreate from "../pages/Projects/projects-create"

// // //Ecommerce Pages
// import EcommerceProducts from "../pages/Ecommerce/EcommerceProducts/index"
// import EcommerceProductDetail from "../pages/Ecommerce/EcommerceProducts/EcommerceProductDetail"
// import EcommerceOrders from "../pages/Ecommerce/EcommerceOrders/index"
// import EcommerceCustomers from "../pages/Ecommerce/EcommerceCustomers/index"
// import EcommerceCart from "../pages/Ecommerce/EcommerceCart"
// import EcommerceCheckout from "../pages/Ecommerce/EcommerceCheckout"
// import EcommerceShops from "../pages/Ecommerce/EcommerceShops/index"
// import EcommerceAddProduct from "../pages/Ecommerce/EcommerceAddProduct"

//Invoices
import InvoicesList from "../pages/Invoices/invoices-list"
import InvoiceDetail from "../pages/Invoices/invoices-detail"
import Invoice from "../pages/Invoice/invoice";
// import Policy from "../pages/Invoice/Policy";
// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

import AddCustomers from "../pages/Customers/AddCustomer"
import Customers from "../pages/Customers/index"
import Adddress from "../pages/Rentaldress/Adddress"
import Rentdress from "../pages/Rentaldress/index"
import AddCategory from "../pages/Category/AddCategory"
// import Rentorder from "../pages/Rentaldress/Rentorder";
import Category from "../pages/Category/index"
import Loyality from "../pages/Loyality/index"
import Addloyality from "../pages/Loyality/addloyality"
import Payment from "../pages/payment/index"
import Addpayment from "../pages/payment/addpayment"
import ViewCustomer from "../pages/Customers/ViewCustomer"
import Packages from "../pages/Packages/index"
import Addpackages from "../pages/Packages/Addpackages"
import Editdress from "../pages/Rentaldress/Editdress"
import Viewdress from "../pages/Rentaldress/Viewdress"
import Editcustomer from "../pages/Customers/EditCustomer"
import Order from "../pages/Order/index"
import Orderform from "../pages/Order/Orderform"
import Editorder from "../pages/Order/Editorder"
import Vieworder from "../pages/Order/Vieworder"
import Return from "../pages/Order/Return"
import Transaction from "../pages/Transaction/Transaction"
import Viewtransaction from "../pages/Transaction/Viewtransaction"
import Viewloyality from "../pages/Loyality/viewloyality"
import Summary from "../pages/Summary/summary"
import EditCategory from "../pages/Category/EditCategory"
// import Home from "../pages/Home/Home";
import { components } from "react-select"
import Policy from "pages/Policy/Policy"
import TermsAndConditions from "pages/Policy/TermsAndConditions"
const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  // {path:"/Policy" ,component:<Policy/>},
  {path:"/Notification" , component:<Notification/>},
  {path:"/Invoice/:invoiceId" , component:<Invoice/>},
  { path: "/transaction", component: <Transaction /> },
  { path: "/Viewtransaction", component: <Viewtransaction /> },
  { path: "/Customers", component: <Customers /> },
  { path: "/AddCustomers", component: <AddCustomers /> },
  { path: "/Rentdress", component: <Rentdress /> },
  { path: "/Adddress", component: <Adddress /> },
  { path: "/Addcategory", component: <AddCategory /> },
  { path: "/Category", component: <Category /> },
  { path: "/Loyality", component: <Loyality /> },
  { path: "/Addloyality", component: <Addloyality /> },
  { path: "/Payment", component: <Payment /> },
  { path: "/Addpayment", component: <Addpayment /> },
  { path: "/ViewCustomer", component: <ViewCustomer /> },
  { path: "/Packages", component: <Packages /> },
  { path: "/Addpackages", component: <Addpackages /> },
  { path: "/Editdress/:id", component: <Editdress /> },
  { path: "/Viewdress/:id", component: <Viewdress /> },
  { path: "/Editcustomer", component: <Editcustomer /> },
  { path: "/Order", component: <Order /> },
  { path: "/Orderform", component: <Orderform /> },
  { path: "/Editorder/:id", component: <Editorder /> },
  { path: "/Vieworder/:id", component: <Vieworder /> },
  { path: "/Return", component: <Return /> },
  { path: "/viewloyality", component: <Viewloyality /> },
  { path: "/summary", component: <Summary /> },
  { path: "/EditCategory", component: <EditCategory /> },
  // {path:"/Home", component:<Home/>},

  // //calendar
  { path: "/calendar", component: <Calendar /> },

  // //profile
  { path: "/profile", component: <UserProfile /> },


  //Invoices
  { path: "/invoices-list", component: <InvoicesList /> },
  { path: "/invoices-detail/:id", component: <InvoiceDetail /> },
  { path: "/invoices-detail", component: <InvoiceDetail /> },

  //Projects
  { path: "/projects-grid", component: <ProjectsGrid /> },
  { path: "/projects-list", component: <ProjectsList /> },
  { path: "/projects-overview", component: <ProjectsOverview /> },
  { path: "/projects-overview/:id", component: <ProjectsOverview /> },
  { path: "/projects-create", component: <ProjectsCreate /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
]

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
  { path: "/policy", component: <Policy/> },
  { path: "/terms-and-conditions", component: <TermsAndConditions/> },
]

export { authProtectedRoutes, publicRoutes }
