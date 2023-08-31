const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
},

    isValidMobile = mobile => {
        // let regex = /([0-9]){10}$/;
        let regex = /^[6-9]{1}[0-9]{9}$/
        return regex.test(mobile)
    },
    isValidPassword = password => {
        let regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        return regex.test(password)
    }, isValidPanCard = pan => {
        let regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
        return regex.test(pan.toUpperCase())
    },
    isValidPassport = pan => {
        let regex = new RegExp("^[A-Z][0-9]{7}$");
        return regex.test(pan.toUpperCase())
    },
    isValidspace = space => {
        let regexp = /^\S/;
        return regexp.test(space)
    },
    validateDate = testdate => {
        let regexp = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
        return regexp.test(testdate);
    },
    ifsccode = ifsc => {
        let regexp = /^[A-Z]{4}[0][A-Z0-9]{6}$/;
        return regexp.test(ifsc);
    }
// regExp = ^[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}$
function maskNumber(number) {
    var masked = number?.replace(/\b[\dX][-. \dX]+(\d{4})\b/g, function (match, capture) {
        return Array(match.length).join("X") + capture;
    });
    return masked;
}

const regexConfig = {
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    mobile: /^[6-9]{1}[0-9]{9}$/,
    pan: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    aadhaar: /^[2-9]{1}[0-9]{11}$/,
    bank_account_no: /^\d{5,7}-\d{6,8}$/,
    ifsc_code: /^[A-Z]{4}0[A-Z0-9]{6}$/,
    space: /^\S/,
    testdate: /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/,
    ifsc: /^[A-Z]{4}[0][A-Z0-9]{6}$/,
    postalcode: /^\d{6}$/
}

export {
    isValidMobile,
    isValidEmail,
    isValidPassword,
    isValidPanCard,
    isValidPassport,
    regexConfig,
    maskNumber,
    isValidspace,
    validateDate,
    ifsccode,
}
//var regex = new RegExp("^[A-Z][0-9]{8}$");