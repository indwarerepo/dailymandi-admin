import * as Yup from 'yup';

const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const loginSchema = Yup.object({
    email: Yup.string().email().required(`Please enter Email`),
    password: Yup.string().min(6).required(`Please enter Password`),
});

export const forgotPasswordSchema = Yup.object({
    email: Yup.string()
        .email()
        .matches(regex, `Please enter a valid email address`)
        .required('Please enter a registered email to continue'),
});

export const productSchema = Yup.object({
    name: Yup.string().required('Please enter the product name'),
    manufacturer: Yup.string().required('Please enter the manufacturer name'),
    specification: Yup.string().required('Please enter the specification'),
    description: Yup.string().required('Please enter the product description'),
    productImage: Yup.string().required('Product Image is required'),
    categoryId: Yup.string().required('Please select a category'),
    paymentTerm: Yup.string().required('Payment Term is required'),
    warrantyPolicy: Yup.string().required('Warranty Policy is required'),
    isFeatured: Yup.boolean(),
    isNewProduct: Yup.boolean(),
    isBestSeller: Yup.boolean(),
    productVariant: Yup.array().of(
        Yup.object().shape({
            variantId: Yup.string().required('Variant Name is required'),
            skuNo: Yup.string().required('SKU is required'),
            qrCode: Yup.string().required('QR Code is required'),
            purchaseCost: Yup.number().required('Purchase Cost is required').min(0, 'Purchase Cost must be at least 0'),
            mrp: Yup.number().required('MRP is required').min(0, 'MRP must be at least 0'),
            sellingPrice: Yup.number().required('Selling Price is required').min(0, 'Selling Price must be at least 0'),
            offerPrice: Yup.number().min(0, 'Offer Price must be at least 0'),
            taxId: Yup.string().required('Tax is required'),
            stock: Yup.number().required('Stock is required').min(0, 'Stock must be at least 0'),
            isReturnable: Yup.boolean(),
            returnDaysLimit: Yup.number()
                .required('Return Days Limit is required')
                .min(0, 'Return Days Limit must be at least 0'),
            batchNo: Yup.string().required('Batch No is required'),
            remarks: Yup.string(),
            manufacturingDate: Yup.date().required('Manufacturing Date is required'),
            expiryDate: Yup.date().required('Expiry Date is required'),
            productVariantImage: Yup.array()
                .of(Yup.string().required('Image URL cannot be empty'))
                .min(1, 'At least one image is required') // Ensure at least one image is present
                .nullable()
                .default([]), // Default to an empty array if not provided
        }),
    ),
});
export const zoneSchema = Yup.object({
    zoneName: Yup.string()
        .required(`Please enter zone`)
        .test('not-only-spaces', 'Zone Name cannot be only spaces', (value) => value.trim().length > 0),
    area: Yup.string()
        .required(`Please enter area`)
        .test('not-only-spaces', 'Area cannot be only spaces', (value) => value.trim().length > 0),
    district: Yup.string()
        .required(`Please enter the district`)
        .test('not-only-spaces', 'District cannot be only spaces', (value) => value.trim().length > 0),
    deliveryCharge: Yup.number()
        .typeError(`Delivery charge must be a number`)
        .required(`Please enter the delivery charge`)
        .moreThan(0, 'Delivery charge must be greater than zero'),
});

export const brandSchema = Yup.object({
    name: Yup.string()
        .required(`Please enter brand name`)
        .test('not-only-spaces', 'Brand Name cannot be only spaces', (value) => value.trim().length > 0),
    description: Yup.string()
        .required(`Please enter description`)
        .test('not-only-spaces', 'Description cannot be only spaces', (value) => value.trim().length > 0),
    metaTitle: Yup.string()
        .required(`Please enter meta title`)
        .test('not-only-spaces', 'Meta title cannot be only spaces', (value) => value.trim().length > 0),
    metaDescription: Yup.string()
        .required(`Please enter meta description`)
        .test('not-only-spaces', 'Meta description cannot be only spaces', (value) => value.trim().length > 0),
});

export const pinCodeSchema = Yup.object({
    pincode: Yup.number()
        .required(`Please enter 6 digit PIN code`)
        .test('len', 'PIN code must be exactly 6 digits', (value) => {
            return value ? value.toString().length === 6 : false;
        }),
    area: Yup.string()
        .required(`Please enter area`)
        .test('not-only-spaces', 'Area cannot be only spaces', (value) => value.trim().length > 0),
    district: Yup.string()
        .required(`Please enter the district`)
        .test('not-only-spaces', 'District cannot be only spaces', (value) => value.trim().length > 0),
    zoneId: Yup.string().required(`Please select zone`),
});

export const productCategorySchema = Yup.object({
    name: Yup.string()
        .required(`Please enter the category name`)
        .test('not-only-spaces', 'Category name cannot be only spaces', (value) => value.trim().length > 0),
    displayOrder: Yup.number()
        .typeError(`Display order must be a number`)
        .required(`Please enter the display order`)
        .moreThan(0, 'Display order must be greater than zero'),
});

export const driverAddSchema = Yup.object({
    name: Yup.string()
        .required(`Please enter the driver name`)
        .test('not-only-spaces', 'Driver name cannot be only spaces', (value) => value.trim().length > 0),
    // email: Yup.string()
    //     .required(`Please enter the email id`)
    //     .test('not-only-spaces', 'Email id cannot be only spaces', (value) => value.trim().length > 0),
    email: Yup.string()
        .email()
        .matches(regex, `Please enter a valid email address`)
        .required('Please enter a valid email to continue')
        .test('not-only-spaces', 'Driver name cannot be only spaces', (value) => value.trim().length > 0),

    password: Yup.string()
        .required(`Please enter the password`)
        .test('not-only-spaces', 'Password cannot be only spaces', (value) => value.trim().length > 0),
    phone: Yup.number()
        .typeError(`Phone number must be a number`)
        .required(`Please enter 10 digit phone number`)
        .test('len', 'Phone number must be exactly 10 digits', (value) => {
            return value ? value.toString().length === 10 : false;
        })
        .moreThan(0, 'Phone number must be greater than zero'),
    // .moreThan(0, 'Phone no must be greater than zero'),
    zoneId: Yup.string().required(`Please select zone`),
    address: Yup.string()
        .required(`Please enter the address`)
        .test('not-only-spaces', 'Address cannot be only spaces', (value) => value.trim().length > 0),
    landmark: Yup.string()
        .required(`Please enter the landmark`)
        .test('not-only-spaces', 'Landmark cannot be only spaces', (value) => value.trim().length > 0),
    panNo: Yup.string()
        .required(`Please enter the pan no`)
        .test('not-only-spaces', 'PAN no cannot be only spaces', (value) => value.trim().length > 0)
        .matches(
            /^[A-Z0-9]{10}$/,
            'PAN no must be exactly 10 characters and can only contain uppercase letters and numbers',
        )
        .test('contains-both', 'PAN no must contain both letters and numbers', (value) => {
            const hasLetters = /[A-Z]/.test(value);
            const hasNumbers = /[0-9]/.test(value);
            return hasLetters && hasNumbers;
        })
        .length(10, 'PAN no must be exactly 10 characters'),
    aadharNo: Yup.number()
        .required(`Please enter 12 digit aadhar no`)
        .test('len', 'Aadhar no must be exactly 12 digits', (value) => {
            return value ? value.toString().length === 12 : false;
        })
        .moreThan(0, 'Aadhar no must be greater than zero'),
    licenseNo: Yup.string()
        .required(`Please enter the license no`)
        .test('not-only-spaces', 'License no cannot be only spaces', (value) => value.trim().length > 0)
        .matches(
            /^[A-Z]{2}-[A-Z0-9]{13}$/,
            'License no must be in the format: two letters, a hyphen, followed by 13 alphanumeric characters',
        )
        .length(16, 'License no must be exactly 16 characters'),
});

export const driverEditSchema = Yup.object({
    name: Yup.string()
        .required(`Please enter the driver name`)
        .test('not-only-spaces', 'Driver name cannot be only spaces', (value) => value.trim().length > 0),

    phone: Yup.number()
        .typeError(`Phone number must be a number`)
        .required(`Please enter 10 digit phone number`)
        .test('len', 'Phone number must be exactly 10 digits', (value) => {
            return value ? value.toString().length === 10 : false;
        })
        .moreThan(0, 'Phone number must be greater than zero'),
    // .moreThan(0, 'Phone no must be greater than zero'),
    // zoneId: Yup.string().required(`Please select zone`),
    address: Yup.string()
        .required(`Please enter the address`)
        .test('not-only-spaces', 'Address cannot be only spaces', (value) => value.trim().length > 0),
    landmark: Yup.string()
        .required(`Please enter the landmark`)
        .test('not-only-spaces', 'Landmark cannot be only spaces', (value) => value.trim().length > 0),
    panNo: Yup.string()
        .required(`Please enter the pan no`)
        .test('not-only-spaces', 'PAN no cannot be only spaces', (value) => value.trim().length > 0)
        .matches(
            /^[A-Z0-9]{10}$/,
            'PAN no must be exactly 10 characters and can only contain uppercase letters and numbers',
        )
        .test('contains-both', 'PAN no must contain both letters and numbers', (value) => {
            const hasLetters = /[A-Z]/.test(value);
            const hasNumbers = /[0-9]/.test(value);
            return hasLetters && hasNumbers;
        })
        .length(10, 'PAN no must be exactly 10 characters'),
    zoneId: Yup.string().required(`Please select zone`),
    aadharNo: Yup.number()
        .required(`Please enter 12 digit aadhar no`)
        .test('len', 'Aadhar no must be exactly 12 digits', (value) => {
            return value ? value.toString().length === 12 : false;
        })
        .moreThan(0, 'Aadhar no must be greater than zero'),
    licenseNo: Yup.string()
        .required(`Please enter the license no`)
        .test('not-only-spaces', 'License no cannot be only spaces', (value) => value.trim().length > 0)
        .matches(
            /^[A-Z]{2}-[A-Z0-9]{13}$/,
            'License no must be in the format: two letters, a hyphen, followed by 13 alphanumeric characters',
        )
        .length(16, 'License no must be exactly 16 characters'),
});

export const bannerSchema = Yup.object({
    name: Yup.string()
        .required(`Please enter the name of the banner`)
        .test('not-only-spaces', 'Banner name cannot be only spaces', (value) => value.trim().length > 0),
    bannerDisplay: Yup.string().required(`Please select the device display`),
    bannerType: Yup.string().required(`Please select the banner type`),
    categoryId: Yup.string().required(`Please select the category`),
    image: Yup.string().required(`Please upload a banner image`),
});

export const cmsSchema = Yup.object({
    name: Yup.string()
        .required(`Please enter the CMS name`)
        .test('not-only-spaces', 'CMS name cannot be only spaces', (value) => value.trim().length > 0),
    cmsKey: Yup.string()
        .required(`Please enter the CMSKey`)
        .test('not-only-spaces', 'CMSKey cannot be only spaces', (value) => value.trim().length > 0),
    url: Yup.string()
        .required(`Please enter the URL`)
        .test('not-only-spaces', 'URL cannot be only spaces', (value) => value.trim().length > 0),
    description: Yup.string()
        .required(`Please enter the description`)
        .test('not-only-spaces', 'Description cannot be only spaces', (value) => value.trim().length > 0),
});

export const taxSchema = Yup.object({
    taxHead: Yup.string()
        .required(`Please enter the Tax head`)
        .test('not-only-spaces', 'Tax head cannot be only spaces', (value) => value.trim().length > 0),
    slab: Yup.string()
        .required(`Please enter the Tax slab`)
        .test('not-only-spaces', 'Tax slab cannot be only spaces', (value) => value.trim().length > 0),
    percentage: Yup.number()
        .typeError(`Percentage must be a number`)
        .required(`Please enter the percentage`)
        .moreThan(0, 'Percentage must be greater than zero'),
});

export const variantSchema = Yup.object({
    variantName: Yup.string()
        .required(`Please enter the variant name`)
        .test('not-only-spaces', 'Variant name cannot be only spaces', (value) => value.trim().length > 0),
});

export const couponSchema = Yup.object({
    name: Yup.string()
        .required(`Please enter the coupon name`)
        .test('not-only-spaces', 'Coupon name cannot be only spaces', (value) => value.trim().length > 0),
    couponCode: Yup.string()
        .required(`Please enter the coupon code`)
        .test('not-only-spaces', 'Coupon code cannot be only spaces', (value) => value.trim().length > 0),
    minOrderAmount: Yup.number()
        .typeError(`Min order amount must be a number`)
        .required(`Please enter the min order amount`)
        .moreThan(0, 'Min order amount must be greater than zero'),
    offerPercentage: Yup.number()
        .typeError(`Offer percentage must be a number`)
        .required(`Please enter the offer percentage`)
        .moreThan(0, 'Offer percentage must be greater than zero'),
    couponValidity: Yup.number()
        .typeError(`Coupon validity must be a number`)
        .required(`Please enter the coupon validity`)
        .moreThan(0, 'Coupon validity must be greater than zero'),
    useLimit: Yup.number()
        .typeError(`Use limit must be a number`)
        .required(`Please enter the use limit`)
        .moreThan(0, 'Use limit must be greater than zero'),
    startDate: Yup.date().required(),
    expiredDate: Yup.date().required(),
    policy: Yup.string().required(`Please enter the policy`),
});

export const qrcodeSchema = Yup.object({
    name: Yup.string()
        .required(`Please enter the qrcode name`)
        .test('not-only-spaces', 'QRCode name cannot be only spaces', (value) => value.trim().length > 0),
    image: Yup.string().required(`Please upload an image`),
});

export const orderStatusSchema = Yup.object({
    statusTitle: Yup.string()
        .required(`Please enter status title`)
        .test('not-only-spaces', 'Category name cannot be only spaces', (value) => value.trim().length > 0),
    remarks: Yup.string()
        .required(`Please enter the remarks`)
        .test('not-only-spaces', 'Category name cannot be only spaces', (value) => value.trim().length > 0),
});

export const miscChargesSchema = Yup.object({
    defaultDiscountRate: Yup.number()
        .typeError(`Default discount rate must be a number`)
        .moreThan(0, 'Default discount rate must be greater than zero'),
    specialDiscountRate: Yup.number()
        .typeError(`Special discount rate must be a number`)
        .moreThan(0, 'Special discount rate must be greater than zero'),
    defaultTaxRate: Yup.number()
        .typeError(`Default tax rate must be a number`)
        .moreThan(0, 'Default tax rate must be greater than zero'),
    specialTaxRate: Yup.number()
        .typeError(`Special tax rate must be a number`)
        .moreThan(0, 'Special tax rate must be greater than zero'),
    defaultDeliveryCharge: Yup.number()
        .typeError(`Default delivery charge must be a number`)
        .moreThan(0, 'Default delivery charge must be greater than zero'),
    specialDeliveryRate: Yup.number()
        .typeError(`Special delivery rate must be a number`)
        .moreThan(0, 'Special delivery rate must be greater than zero'),
    welcomeWalletAmt: Yup.number()
        .typeError(`Welcome wallet amount must be a number`)
        .moreThan(0, 'Welcome wallet amount must be greater than zero'),
    walletDeductionRateOnOrder: Yup.number()
        .typeError(`Wallet deduction rate on order must be a number`)
        .moreThan(0, 'Wallet deduction rate on order must be greater than zero'),
    orderReturnCommRateOA: Yup.number()
        .typeError(`Order return commission rate order amount must be a number`)
        .moreThan(0, 'Order return commission rate order amount must be greater than zero'),
    orderReturnCommRateNOA: Yup.number()
        .typeError(`Order return commission rate net order amount must be a number`)
        .moreThan(0, 'Order return commission rate net order amount must be greater than zero'),
    refByAddCommRate: Yup.number()
        .typeError(`Referred by add commission rate must be a number`)
        .moreThan(0, 'Referred by add commission rate must be greater than zero'),
});
export const deliverySlotSchema = Yup.object().shape({
    displayContent: Yup.string()
        .required('Content is required')
        .min(5, 'Content must be at least 5 characters')
        .max(200, 'Content must not exceed 200 characters'),
});
