const CollegeModel = require("../models/collegeModel");
const InternModel = require("../models/internModel");
const { isValid } = require("../validation/validation")

//============================post api-1 ==============================>>>
const createCollege = async function (req, res) {
    try {
        let data = req.body;

        const { name, fullName, logoLink } = data;

        if (Object.keys(data) == 0) return res.status(400).send({ status: false, message: "NO data provided" })   // if user gives no deatils/no blanck obj , 

        if (!isValid(name)) { return res.status(400).send({ status: false, message: "Name is required" }) }

        let duplicateName = await CollegeModel.findOne({ name: name })
        if (duplicateName) { return res.status(400).send({ status: false, message: "College name already exist" }) }

        if (!isValid(fullName)) { return res.status(400).send({ status: false, message: "Full name is required" }) }

        if (!isValid(logoLink)) { return res.status(400).send({ status: false, message: "Logo is required" }) }

        const newCollege = await CollegeModel.create(data);
        let obj = {
            name: newCollege.name,
            fullName: newCollege.fullName,
            logoLink: newCollege.logoLink,
            isDeleted: newCollege.isDeleted
        }
        return res.status(201).send({ status: true, message: obj })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.message })
    }
}

//============================get api ==============================>>>
const getColleges = async function (req, res) {
    try {
        let cName = req.query.collegeName
        if (!cName) { return res.status(400).send({ status: false, message: "College name is required" }) }

        let cId = await CollegeModel.find({ name: cName }).select({ _id: 1 })
        if (cId.length == 0) { return res.status(404).send({ status: false, message: "Please enter a valid name abbreviation in lowercase" }) }

        let interns = await InternModel.find({ collegeId: cId }).select({ name: 1, email: 1, mobile: 1, _id: 1 })

        if (interns.length == 0) {
            var x = `no interns of ${cName} collage`
        } else { var x = interns }

        let result = await CollegeModel.find({ name: cName }).select({ name: 1, fullName: 1, logoLink: 1, _id: 0 })

        const internDeatils = {     // get all interns[] related to this college _id
            name: cName,
            fullName: result[0].fullName,
            logoLink: result[0].logoLink,
            interns: x
        }
        return res.status(200).send({ status: true, Data: internDeatils })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.message })
    }
}

module.exports.createCollege = createCollege;
module.exports.getColleges = getColleges;