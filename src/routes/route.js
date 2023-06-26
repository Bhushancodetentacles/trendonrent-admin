import React from "react"
import { Navigate } from "react-router-dom"
import { isBrowser } from "../utils/utils"

const Authmiddleware = props => {
  if(isBrowser()){
      
    if (!localStorage.getItem("authUser")) {
      return (
        <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
    return <React.Fragment>{props.children}</React.Fragment>
  }
}

export default Authmiddleware
