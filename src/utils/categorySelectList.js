import { get } from "helpers/api_helper"

// getting data from category list
export const getCategorySelectList = async () => {
  console.log("callinga")
  try {
    const res = await get(`/Product/CategorySelectList`)
    const result = await res.data.list
    console.log("result", result)
    return result;
  } catch (error) {
    throw error
  }
}
