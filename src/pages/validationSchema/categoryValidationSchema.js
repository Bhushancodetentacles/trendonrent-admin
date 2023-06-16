import * as Yup from "yup"

export const categoryValidationSchema = Yup.object({
  name: Yup.string().required("category name  is required"),
  fileUrl : Yup.string().required("Image is required")
})
