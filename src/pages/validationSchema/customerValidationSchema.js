import * as Yup from "yup"

export const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .required("First Name is required!")
    .nullable()
    .matches(/^[a-zA-Z\s]+$/, "Name must contain alphabetic characters only"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .required("Last Name is required")
    .nullable()
    .matches(/^[a-zA-Z\s]+$/, "Name must contain alphabetic characters only"),
  mobileNo: Yup.string()
    .min(10, "Please enter a valid mobile number")
    .required("Mobile Number is required")
    .matches(/^[0-9]+$/, "Mobile number must contain numeric characters only"),
  gender: Yup.string().required("Gender is required").nullable(),
  age: Yup.number().min(1, "Too Young!").nullable(),
  secondaryMobileNo: Yup.string()
    .min(10, "Please enter a valid mobile number")
    .nullable()
    .matches(/^[0-9]+$/, "Mobile number must contain numeric characters only"),
  adharCardNo: Yup.string()
    .min(12, "Please enter a valid Adhar number")
    .matches(/^[0-9]+$/, "Adhar number must contain numeric characters only"),
  primaryAddress: Yup.string().required("Address is required"),
  dateOfBirth: Yup.date().required("Birth Date is required"),
  // referalMobileNo: Yup.string()
  //   .min(10, "Too Short!")
  //   .nullable()
  //   .matches(/^[0-9]+$/, "Mobile number must contain numeric characters only"),
  aadharCardPhoto: Yup.string().nullable(),
  // marriageAnniversary: Yup.date().nullable(),
})
