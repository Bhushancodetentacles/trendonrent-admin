import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import "../../assets/css/style.css"
import { useSelector, useDispatch } from "react-redux"
import DeleteModal from "../../components/Common/DeleteModal"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { get } from "helpers/api_helper"
import { Pagination } from "@mui/material"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  deleteCategoryFail,
  deleteCategorySuccess,
  getCategoryFail,
  getCategorySuccess,
} from "store/actions"
import { toast } from "react-toastify"

const AddCategory = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedItem, setSelectedItem] = useState(null)
  const open = Boolean(anchorEl);
  const handleClick = (event,item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item)
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedItem(null)
  };
  const dispatch = useDispatch()
  const catData = useSelector(state => state.Ecommerce)
  const [categoryData, setCategoryData] = useState([])
  const [loader, setLoader] = useState(false)
  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPagesCount, setTotalPagesCount] = useState(null)
  const [postsPerPage] = useState(10)
  const handleChange = (event, value) => {
    setCurrentPage(value)
  }

  // delete category
  const [deleteModal, setDeleteModal] = useState(false)
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(false)
  const [id, setId] = useState(null)
  const onClickDelete = id => {
    setDeleteModal(true)
    setId(id)
  }
  const handleDeleteCategory = async () => {
    try {
      setIsDeleteDisabled(true)
      const res = await get(`Product/DeleteCategory?Id=${id}`)
      const result = await res.data.getResult.categoryId
      setIsDeleteDisabled(false)
      dispatch(deleteCategorySuccess(result))
      toast.success("Category deleted successfully")
      getCategory()
      setDeleteModal(false)
    } catch (error) {
      setIsDeleteDisabled(false)
      toast.error("Something went wrong")
      dispatch(deleteCategoryFail(error))
    }
  }
  //meta title
  document.title = "Trends on Rent"

  // getting data from category list
  const getCategory = async () => {
    try {
      setLoader(true)
      const res = await get(
        `Product/CategoryList?pageNumber=${currentPage}&pageSize=${postsPerPage}`
      )
      const result = await res.data.result
      setLoader(false)
      setCategoryData(result)
      setTotalPagesCount(res.totalPagesCount)
      dispatch(getCategorySuccess(result))
    } catch (error) {
      setLoader(false)
      dispatch(getCategoryFail(error))
      throw error
    }
  }
  useEffect(() => {
    getCategory()
  }, [catData.length, currentPage, postsPerPage])


  useEffect(() => {
    let element = document.getElementById("category_tab")
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
        onDeleteClick={handleDeleteCategory}
        onCloseClick={() => setDeleteModal(false)}
        isDisabled={isDeleteDisabled}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs
            title="Dashboard"
            breadcrumbItem="Category"
            path={"/dashboard"}
          />

          <div className="row">
            <div className="col" style={{ padding: "0" }}>
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-9"></div>
                    <div
                      className="col-md-3 mb-0 mb-lg-3 mb-sm-3"
                      style={{ textAlign: "right" }}
                    >
                      <Link
                        className="mt-lg-3 mt-0 mt-sm-3 mt-xs-3 btn-add btn"
                        to="/AddCategory">
                        <i className="mdi mdi-plus me-1"></i>Add Category
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="table-rep-plugin">
                    <div
                      className="table-responsive mb-0"
                      data-pattern="priority-columns">
                      <table id="tech-companies-1" className="custom-header-css table table-striped table-hover">
                        <thead className="table-light table-nowrap">
                          <tr>
                            <th className="text-center">Id</th>
                            <th className="text-center">Category Image</th>
                            <th className="text-center">Category Name</th>
                            <th className="text-center"> Action </th>
                          </tr>
                        </thead>
                        <tbody>
                          {loader ? (
                            <tr className="text-center">
                              <td colSpan={4} className="loader">
                                {" "}
                                <p className="text-center"> Loading...!</p>
                              </td>
                            </tr>
                          ) : categoryData.length ? (
                            categoryData &&
                            categoryData?.map(item => {
                              return (
                                <tr key={item.categoryId}>
                                  <td className="text-center"> {item.categoryId} </td>
                                  <td className="text-center">
                                    <img src={`${item.fileUrl}`} alt="product-img" title="product-img" className="avatar-md" />
                                  </td>
                                  <td className="text-center">{item.name} </td>
                                  <td className="text-center">

                                    <Button
                                      id="basic-button"
                                      aria-controls={open ? 'basic-menu' : undefined}
                                      aria-haspopup="true"
                                      aria-expanded={open ? 'true' : undefined}
                                      onClick={event => handleClick(event,item)}
                                    >
                                      <i className="bx bx-dots-horizontal-rounded font-size-24 text-info"></i>
                                    </Button>
                                    <Menu
                                      id="basic-menu"
                                      anchorEl={anchorEl}
                                      // open={open}
                                      open={
                                        Boolean(anchorEl) &&
                                        selectedItem?.categoryId ===
                                          item.categoryId
                                      }
                                      onClose={handleClose}
                                      MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                      }}
                                    >
                                      <MenuItem onClick={handleClose}>
                                        <Link to={`/EditCategory?id=${item.categoryId}`} className="p-1">
                                          <i className="mdi mdi-pencil font-size-18 text-success me-1"></i>
                                          <span className="text-success">Edit</span>
                                        </Link>
                                      </MenuItem>
                                      <MenuItem onClick={handleClose}>
                                        <a
                                          href="#"
                                          className="p-1"
                                          onClick={() => onClickDelete(item.categoryId)
                                          }
                                        >
                                          <i className="mdi mdi-trash-can font-size-18 text-danger me-1"></i><span className="text-danger">Delete</span>
                                        </a></MenuItem>

                                    </Menu>
                                  </td>
                                </tr>
                              )
                            })
                          ) : (
                            <tr className="text-center">
                              <td colSpan={4}>
                                {" "}
                                <b> No data found...!</b>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {categoryData.length ? (
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
      {/* </div>
            <Footer></Footer>
            </div> */}
    </React.Fragment>
  )
}

export default AddCategory
