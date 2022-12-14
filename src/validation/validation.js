//<<----------------Validation for Body ---------------->>
const isValidBody = function (body) {
  return Object.keys(body).length > 0;
};

//<<----------------Validation for Intern Name ---------------->>
const isValidintern = function (name) {
  return /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/.test(name);
};

//<<----------------Validation for College Name ---------------->>
const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

//<<----------------Validation for Email ---------------->>
const isValidEmail = function (email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

//<<----------------Validation for Mobile No. ---------------->>
const isValidMobile = function (mobile) {
  return /^([+]\d{2})?\d{10}$/.test(mobile);
};

//<<----------------Validation for LogoLink ---------------->>
const isValidLogoLink = function (logoLink) {
  return /(http[s]:\/\/)([a-z\-0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-\/._~:?#\[\]@!$&'()+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i.test(
    logoLink
  );
};

//<<============================Imported Validation Function Modules ===========================>>//

module.exports = {
  isValidBody,
  isValid,
  isValidEmail,
  isValidMobile,
  isValidLogoLink,
  isValidintern,
};
