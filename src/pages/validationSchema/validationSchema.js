import * as Yup from "yup"

export const productValidationSchema = Yup.object({
  categoryId: Yup.number()
    .required("Category is required")
    .nullable()
    .typeError("Please select valid option"),
  name: Yup.string()
    .required("Product Name  is required")
    .max(50, "Name must be less than or equal to 50")
    .nullable(),
  supplierName: Yup.string()
    .required("Supplier name is required")
    .max(100, "Supplier Name must be less than or equal to 100")
    .nullable(),
  description: Yup.string().required("Description  is required"),
  purchasePrice: Yup.number()
    .required("Purchase price is required")
    .typeError("Purchase Price must be a valid number"),
  frontImage: Yup.string().required("Front Image  is required").nullable(),
  backImage: Yup.string().required("Back Image  is required").nullable(),
  rentPriceFor3Days: Yup.number()
    .required("Rent Price is required")
    .nullable()
    .typeError("Rent Price must be a valid number"),
  rentPriceFor7Days: Yup.number()
    .required("Rent Price is required")
    .nullable()
    .typeError("Rent Price must be a valid number"),
  rentPriceFor10Days: Yup.number()
    .required("Rent Price is required")
    .nullable()
    .typeError("Rent Price must be a valid number"),
  topFabric: Yup.string()
    .nullable()
    .max(50, "Top Fabric must be less than or equal to 50"),
  bottomFabric: Yup.string()
    .nullable()
    .max(50, "Bottom Fabric must be less than or equal to 50"),
  discountAmount: Yup.number()
    .typeError("Discount amount should be a valid number")
    .nullable(),
  discountStartValidityDate: Yup.date()
    .typeError("Please enter a valid date")
    .required("Discount validity start date is required"),
  discountValidityDate: Yup.date()
    .typeError("Please enter a valid date")
    .required("Discount validity end date is required"),
  depositAmount: Yup.number().required("Deposit amount is required").nullable(),
  store: Yup.string().required("Store  is required"),
})
