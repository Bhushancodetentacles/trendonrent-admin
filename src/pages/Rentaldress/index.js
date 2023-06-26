import React, { useState, useEffect } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import DeleteModal from "../../components/Common/DeleteModal"
import "../../assets/scss/datatables.scss"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import "../../assets/css/style.css"
import { Link } from "react-router-dom"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useNavigate } from "react-router-dom/dist"
import { Pagination } from "@mui/material"
import { get } from "helpers/api_helper"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import {
  deleteProductFail,
  deleteProductSuccess,
  getProductsFail,
  getProductsSuccess,
} from "../../store/actions"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"

const Rentdress = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event, item) => {
    setAnchorEl(event.currentTarget)
    setSelectedItem(item)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setSelectedItem(null)
  }
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productStore = useSelector(state => state.Ecommerce.products)
  const [productData, setProductData] = useState([])
  const [loader, setLoader] = useState(false)

  //Filter product
  let MonthBefore = new Date()
  MonthBefore.setDate(new Date().getDate() - 31)
  const [filters, setFilters] = useState({
    fromDate: null,
    toDate: null,
  })
  const handleFilterChange = event => {
    console.log("event", event)
    setFilters(prevData => ({
      ...prevData,
      [event.target.id]: event.target.value,
    }))
  }

  const handleView = id => {
    console.log("Hii in view tab")
    console.log(id)
  }

  const packages = [
    {
      id: 1,
      name: "3 days",
    },
    {
      id: 2,
      name: "7 days",
    },
    {
      id: 3,
      name: "10 days",
    },
  ]
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
  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPagesCount, setTotalPagesCount] = useState(null)
  const [postsPerPage] = useState(10)

  const handleChange = (event, value) => {
    setCurrentPage(value)
  }

  // delete product
  const [deleteModal, setDeleteModal] = useState(false)
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(false)
  const [Id, setId] = useState(null)
  const handleDeleteProduct = async () => {
    try {
      setIsDeleteDisabled(true)
      const res = await get(`product/delete?id=${Id}`)
      const result = await res.data.getResult.productId
      setIsDeleteDisabled(false)
      dispatch(deleteProductSuccess(result))
      toast.success("Product deleted successfully")
      getProducts()
      setDeleteModal(false)
    } catch (error) {
      setIsDeleteDisabled(false)
      toast.error("Something went wrong..")
      dispatch(deleteProductFail(error))
    }
  }

  const onClickDelete = id => {
    setDeleteModal(true)
    setId(id)
  }

  //meta title
  document.title = "Trends on Rent"

  // fetching product list
  const getProducts = async () => {
    try {
      setLoader(true)
      let from_date = filters.fromDate
        ? new Date(filters.fromDate).toLocaleDateString("en-GB")
        : ""
      let to_date = filters.toDate
        ? new Date(filters.toDate).toLocaleDateString("en-GB")
        : ""
      const res = await get(
        `Product/List?FromDate=${from_date}&Todate=${to_date}&category=${selectedCategory}&pageNumber=${currentPage}&pageSize=${postsPerPage}`
      )
      const result = await res.data.result

      setLoader(false)
      setProductData(result)
      setTotalPagesCount(res.totalPagesCount)
      dispatch(getProductsSuccess(result))
    } catch (error) {
      setLoader(false)
      dispatch(getProductsFail(error))
      throw error
    }
  }

  // filter product
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [Package, setPackage] = useState("")
  const selectCategory = e => {
    setSelectedCategory(e.target.value)
  }
  // search functionality
  const [searchQuery, setSearchQuery] = useState("")
  useEffect(() => {
    if (searchQuery) {
      const filterBySearch = productData.filter(item => {
        if (item.uniqueCode.toLowerCase().includes(searchQuery.toLowerCase())) {
          return item
        }
      })
      setProductData(filterBySearch)
    } else if (searchQuery === "") {
      setProductData(productStore)
      return
    }
  }, [searchQuery])

  useEffect(() => {
    getProducts()
    getCategorySelectList()
  }, [currentPage, postsPerPage])

  useEffect(() => {
    let element = document.getElementById("product_tab")
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
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteProduct}
        onCloseClick={() => setDeleteModal(false)}
        isDisabled={isDeleteDisabled}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs
            title="Dashboard"
            breadcrumbItem="Products"
            path={"/dashboard"}
          />

          <div className="row">
            <div className="col" style={{ padding: "0" }}>
              {/* <div className="card">
                <div className="card-body">
                  <div
                    className="row"
                    style={{ justifyContent: "flex-end" }}
                  >
                   
                      
                  </div>
                  </div>
                  </div> */}
              <div className="card">
                <div className="card-body">
                  <div className="mb-2 row">
                    <div className="col-md-10">
                      <div className="row">
                        <div className="col-sm-3 col-md-3  col-lg-3">
                          <label>From Date</label>
                          <input
                            type="date"
                            className="form-control"
                            placeholder="To Date"
                            id="fromDate"
                            // value={new Date(filters.fromDate).toISOString().substring(0, 10)}
                            onChange={handleFilterChange}
                          />
                        </div>
                        <div className="col-sm-3 col-md-3  col-lg-3">
                          <label>To Date</label>
                          <input
                            type="date"
                            id="toDate"
                            className="form-control"
                            placeholder="To Date"
                            // value={new Date(filters.toDate).toISOString().substring(0, 10)}
                            onChange={handleFilterChange}
                          />
                        </div>
                        <div className="col-sm-3 col-md-3  col-lg-3">
                          <label>Category</label>
                          <select
                            className="form-control select2 mb-3 mb-xxl-0"
                            onChange={e => selectCategory(e)}
                          >
                            <option>Select</option>
                            {categoryList?.map(cat => {
                              return (
                                <option
                                  key={cat.categoryId}
                                  value={cat.categoryId}
                                >
                                  {cat.name}
                                </option>
                              )
                            })}
                          </select>
                        </div>
                        {/* <div className="col-sm-6 col-md-3  col-lg-3">
                          <label>Package</label>
                          <select
                            className="form-control select2 mb-3 mb-xxl-0"
                            onChange={e => setPackage(e.target.value)}
                          >
                            <option>Select</option>
                            {packages?.map(item => {
                              return <option key={item.id}>{item.name}</option>
                            })}
                          </select>
                        </div> */}
                        <div
                          className="col-sm-3 col-md-3  col-lg-3"
                          onClick={getProducts}
                          style={{ textAlign: "right" }}
                        >
                          <div className="mt-0 mt-lg-4 mt-md-4 mt-sm-4  mb-xxl-0">
                            <button
                              type="button"
                              className="btn btn-filter w-100">
                              <i className="mdi mdi-filter-outline align-middle"></i>{" "}
                              Filter
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2 col-sm-3">
                      <div
                        className="btn-add mt-4 btn"
                        onClick={() => {
                          navigate(`/Adddress`, {
                            state: { getProduct: "getProduct" },
                          })
                        }}
                      >
                        <i className="mdi mdi-plus me-1"></i>Add Product
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
                        className="custom-header-css table striped table table-hover"
                      >
                        <thead className="table-light table-nowrap">
                          <tr>
                            <th className="text-center">Unique Code</th>
                            <th className="text-center">Dress Photo</th>
                            <th className="text-center">Category</th>
                            <th className="text-center">Purchase Price </th>
                            <th className="text-center">
                              Rent Price for 3days
                            </th>
                            <th className="text-center">
                              Rent Price for 7days
                            </th>
                            <th className="text-center">
                              Rent Price for 10days
                            </th>
                            <th className="text-center">Preaparation Days</th>
                            <th className="text-center">Recovery Amt.</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loader ? (
                            <tr className="text-center">
                              <td colSpan={8} className="loader">
                                <p className="text-center">Loading...!</p>
                              </td>
                            </tr>
                          ) : productData.length ? (
                            productData?.map(item => {
                              return (
                                <tr key={item.id}>
                                  <td>{item.uniqueCode} </td>
                                  <td>
                                    <img
                                      src={`${item.frontImage}`}
                                      alt="product-img"
                                      title="product-img"
                                      className="avatar-md"
                                    />
                                  </td>
                                  <td>{item.categoryName} </td>
                                  {/* <td>{item.packages} </td> */}
                                  <td className="text-center">
                                    {item.purchasePrice}
                                  </td>
                                  <td className="text-center">
                                    {item.rentPriceFor3Days}
                                  </td>
                                  <td className="text-center">
                                    {item.rentPriceFor7Days}
                                  </td>
                                  <td className="text-center">
                                    {item.rentPriceFor10Days}
                                  </td>
                                  <td className="text-center">
                                    {item.preprationDays}
                                  </td>
                                  <td className="text-center">
                                    {item.recoveryAmount}
                                  </td>
                                  <td className="text-center">
                                    <Button
                                      id={"basic-button" + item.productId}
                                      aria-controls={`menu-${item.productId}`}
                                      aria-haspopup="true"
                                      onClick={event =>
                                        handleClick(event, item)
                                      }
                                    >
                                      <i className="bx bx-dots-horizontal-rounded font-size-24 text-info"></i>
                                    </Button>
                                    <Menu
                                      id="basic-menu"
                                      anchorEl={anchorEl}
                                      open={
                                        Boolean(anchorEl) &&
                                        selectedItem?.productId ===
                                          item.productId
                                      }
                                      onClose={handleClose}
                                      MenuListProps={{
                                        "aria-labelledby": "basic-button",
                                      }}
                                    >
                                      <MenuItem onClick={handleClose}>
                                        <span
                                          className="p-1"
                                          onClick={() =>
                                            navigate(
                                              `/Viewdress/${item.productId}`,
                                              {
                                                state: {
                                                  productID: item.productId,
                                                },
                                              }
                                            )
                                          }
                                          // onClick={handleView(item.productId)}
                                        >
                                          <i className="mdi mdi-file font-size-18 text-info me-1"></i>
                                          <span className="text-info">
                                            View
                                          </span>
                                        </span>
                                      </MenuItem>
                                      <MenuItem onClick={handleClose}>
                                        <span
                                          className="p-1"
                                          onClick={() =>
                                            navigate(
                                              `/Editdress/${item.productId}`,
                                              {
                                                state: { item },
                                              }
                                            )
                                          }
                                        >
                                          <i className="mdi mdi-pencil font-size-18 text-success me-1"></i>
                                          <span className="text-success">
                                            Edit
                                          </span>
                                        </span>
                                      </MenuItem>
                                      <MenuItem onClick={handleClose}>
                                        {/* <Link to="/calendar" className="p-1">
                                          <i className="mdi mdi-calendar-month font-size-18 text-primary me-1"></i><span className="text-primary">Calender</span>
                                        </Link> */}

                                        <span
                                          className="p-1"
                                          onClick={() =>
                                            navigate(
                                              `/calendar`,
                                              {
                                                state: { item },
                                              }
                                            )
                                          }
                                        >
                                          <i className="mdi mdi-calendar-month font-size-18 text-primary me-1"></i><span className="text-primary">Calender</span>
                                        </span>
                                      </MenuItem>
                                      <MenuItem onClick={handleClose}>
                                        {" "}
                                        <span
                                          onClick={() =>
                                            onClickDelete(item.productId)
                                          }
                                          className="p-1"
                                        >
                                          <i className="mdi mdi-trash-can font-size-18 text-danger me-1"></i>
                                          <span className="text-danger">
                                            Delete
                                          </span>
                                        </span>
                                      </MenuItem>
                                    </Menu>
                                  </td>
                                </tr>
                              )
                            })
                          ) : (
                            <tr className="text-center">
                              <td colSpan={8}>
                                <b>No data found!</b>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    {productData?.length ? (
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
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
  )
}

export default Rentdress
