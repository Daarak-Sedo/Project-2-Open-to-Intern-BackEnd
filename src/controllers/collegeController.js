const collegeModel = require("../models/collegeModel");
const interModel = require("../models/internModel");

// <<=============== validation function Imported here =========================>>>
const { isValid, isValidLogoLink } = require("../validation/validation");


const createCollege = async (req, res) => {
  try {
  // res.setHeader("Access-Control-Allow-Origin", "*");
    let data = req.body;
    const { name, fullName, logoLink } = data;

    if (Object.keys(data) == 0)
      return res.status(400).send({ status: false, message: "Data is required to create college" }); // if user gives no deatils/no blanck obj ,

    if (!isValid(name)) {
      return res.status(400).send({ status: false, message: "College Name is required" });
    }

    let duplicateName = await collegeModel.findOne({ name: name });
    if (duplicateName) {
      return res.status(400).send({ status: false, message: "College name already existed" });
    }

    if (!isValid(fullName)) {
      return res.status(400).send({ status: false, message: "Full name is required" });
    }
    if (!isValidLogoLink(logoLink)) {
      return res.status(400).send({ status: false, message: "Logo link is required" });
    }

    const newCollege = await collegeModel.create(data);
    let newCollegeData = { ...data, isDeleted: newCollege.isDeleted };

    return res.status(201).send({ status: true, data: newCollegeData });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//=================== Get Interns Data with College Details =========================>>>

const getColleges = async (req, res) => {
  try {
  //res.setHeader("Access-Control-Allow-Origin", "*");
    let collegeName = req.query.collegeName;
   // console.log(collegeName);
    if (!collegeName) {
      return res.status(400).send({ status: false, message: "Please Enter Correct College Name" });
    }

    let collegeId = await collegeModel.find({ name: collegeName }).select({ _id: 1 });
    if (collegeId.length == 0) {
      return res.status(404).send({status: false,message: "Please enter a valid name abbreviation in lowercase"});
    }

    let interns = await interModel.find({ collegeId: collegeId }).select({ name: 1, email: 1,mobile: 1, _id: 1 });

    if (interns.length == 0) {
      var x = `no interns of ${collegeName} collage`;
    } else {
      var x = interns;
    }

    const result = await collegeModel.findOne({ name: collegeName }).select({ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 });
    result._doc.interns = x;
    return res.status(200).send({ status: true, data: result });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//<< ======================= Exported Modules =========================>>

module.exports = { createCollege, getColleges };
