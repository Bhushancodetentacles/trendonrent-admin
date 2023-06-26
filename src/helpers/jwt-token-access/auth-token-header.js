import { isBrowser } from "../../utils/utils"

export default function authHeader() {
  let obj
  if(isBrowser()){
      
    obj = JSON.parse(localStorage.getItem("authUser"))
  }

  if (obj && obj.accessToken) {
    return { Authorization: obj.accessToken }
  } else {
    return {}
  }
}
