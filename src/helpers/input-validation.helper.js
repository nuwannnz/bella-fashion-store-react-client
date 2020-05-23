

export const isValidEmail = (val = "") => {
    if (isEmpty(val)) {
        return;
    }
    return val.indexOf('@') > 0
        && val.indexOf('@') < val.length
        && val.indexOf('.') > 0
        && val.indexOf('.') < val.length
}

export const isEmpty = (val) => {
    return val.length === 0;
}

export const isLengthOf = (val, length) => {
    return val.length === length;
}

export const isPwdMatch = (newPwd, confirmPwd) => {
    return newPwd !== confirmPwd;
}

export const normalizeString = (text) => {
    return text.split(' ').join('-').toLowerCase()
}