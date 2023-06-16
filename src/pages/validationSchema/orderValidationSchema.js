import * as Yup from "yup"

export const orderValidationSchema = Yup.object({
  "uniqueCode": Yup.string().min(2, 'Too Short!').required("This field is required!"),
  "customerName": Yup.string().min(2, 'Too Short!').required("This field is required").matches(/^[a-zA-Z\s]+$/, "Name must contain alphabetic characters only"),
  "dressCategory": Yup.string().min(2, 'Too Short!').required("This field is required"),
  "package": Yup.string().required("This field is required"),
  "pickUpDate": Yup.string().required("This field is required"),
  "returnDate": Yup.string().required("This field is required"),
  "depositAmount": Yup.number().required("This field is required"),
  "discount": Yup.number().required("This field is required"),
  "totalAmount": Yup.number().required("This field is required"),
  "paymentStatus": Yup.string().required("This field is required"),
  "paymentMode": Yup.string().required("This field is required"),
  "mobileNo": Yup.string().min(10, 'Too Short!').max(10, 'Too long!').required("This field is required").matches(/^[0-9]+$/, "Mobile number must contain numeric characters only")
})