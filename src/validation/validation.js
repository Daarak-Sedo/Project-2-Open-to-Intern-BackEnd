const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  };

const isRightFormatemail = function (email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

const isRightFormatmobile = function (mobile) {
    return /^([+]\d{2})?\d{10}$/.test(mobile);
}
const isValidLogoLink = function (logoLink) {
    return (/(http[s]:\/\/)([a-z\-0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-\/._~:?#\[\]@!$&'()+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i).test(logoLink);
}

module.exports.isValid=isValid;
module.exports.isValidLogoLink=isValidLogoLink;
module.exports.isRightFormatemail=isRightFormatemail;
module.exports.isRightFormatmobile=isRightFormatmobile;




