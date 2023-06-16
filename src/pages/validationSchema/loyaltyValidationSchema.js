import * as Yup from "yup"

export const loyaltyValidationSchema = Yup.object({
    pointsInRup: Yup.number().required("Points  is required"),
    reason: Yup.string().required("reason  is required"),
    mobileNo: Yup.number().required("mobileNo  is required")
})
















