import * as yup from 'yup';
import { regexConfig } from './Validation';

const signUpSchema = yup.object().shape({
    mobile: yup
        .string()
        .matches(regexConfig.mobile, 'Please enter a valid mobile number')
        .required('Please enter mobile number')
    ,
})

const loginSchema = yup.object().shape({
    mobile: yup
        .string()
    .matches(regexConfig.mobile, 'Please enter a valid mobile number')
    .required('Please enter mobile number')
    ,
})

const forgotSchema = yup.object().shape({
    email: yup
        .string()
        .matches(regexConfig.email, 'Please enter valid email address')
        .required('Please enter email address')
    ,
    // reg_id: yup
    //     .string()
    //     .required('Please enter register id')
})

const otpSchema = yup.object().shape({
    otp: yup
        .string()
        .required('Please enter otp')
    ,

})

const changePasswordSchema = yup.object().shape({
    old_password: yup
        .string()
        .required('Please enter current password')
    ,
    password: yup
        .string()
        .required('Please enter New Password')
    ,
    c_password: yup
        .string()
        .required('Please enter confirm new password')
        .oneOf([yup.ref('password'), null], `Confirm new password doesn't match`)
})
const transferSchema = yup.object().shape({
    registerId: yup
        .string()
        .required('Please enter registerId')
    ,
    amount: yup
        .string()
        .required('Please enter amount')
    ,
})
const ticketSchema = yup.object().shape({
    email: yup
        .string()
        .matches(regexConfig.email, 'Please enter valid email address')
        .required('Please enter email address')
    ,
    phone: yup
        .string()
        .required('Please enter phone number')
    ,
    message: yup
        .string()
    // .required('Enter amount')
    ,
})
const accountinfo = yup.object().shape({
    account: yup
        .string()
        .matches(regexConfig.bank_account_no, 'Please enter a valid account number')
        .required('Please enter account number')
    ,
    receiver: yup
        .string()
        .required('Please enter account holder name')
    ,
    isfccode: yup
        .string()
        .matches(regexConfig.ifsc, 'Please enter a valid IFSC code')
        .required('Please enter IFSC code')
    ,
    branch: yup
        .string()
        .required('Please enter branch name')
    ,
})
const editprofile = yup.object().shape({
    name: yup
        .string()
        .required('Please enter name')
    ,
    email: yup
        .string()
        .matches(regexConfig.email, 'Please enter valid email address')
        .required('Please enter email address')
    ,
    phone: yup
        .string()
        .required('Please enter phone number')
    ,
    addressline: yup
        .string()
        .required('Please enter address')
    ,
    dateof: yup
        .string()
        // .matches(regexConfig.testdate, 'Please enter date of birth')
        .required('Please enter date of birth')
    ,
    gender: yup
        .string()
        .required('Please select gender')
    ,
    country: yup
        .string()
        .required('Please enter country')
    ,
    state: yup
        .string()
        .required('Please enter state')
    ,
    village: yup
        .string()
        .required('Please enter village')
    ,
    postalcode: yup
        .string()
        .matches(regexConfig.postalcode, 'Please enter a valid postal code')
        .required('Please enter postal code')
    ,
    city: yup
        .string()
        .required('Please enter city')
    ,
    diviend: yup
        .string()
        .required('Please enter dividend wallet type')
    ,
    bonus: yup
        .string()
        .required('Please enter bonus wallet type')
    ,
})

export {
    signUpSchema,
    loginSchema,
    forgotSchema,
    otpSchema,
    changePasswordSchema,
    transferSchema,
    ticketSchema,
    accountinfo,
    editprofile
}