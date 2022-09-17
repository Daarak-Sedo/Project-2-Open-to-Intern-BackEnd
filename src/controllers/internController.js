const interModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel")



// <<======================== validation function Imported here ===============================>>>

const {isValidBody, isValidEmail, isValidMobile, isValid, isValidintern} = require("../validation/validation")


//============================   Create Intern Data  =========================================>>>

const createIntern = async (req, res) => {
    try {

        const data = req.body;
        let {name, email, mobile, collegeName} = data;
        
        if(!isValidBody(data)){return res.status(400).send({status : false, message : "Interns details are required."})}

        if(!name) return res.status(400).send({status : false, message : "Please Enter Your Name"})
        if(!isValidintern(name)) return res.status(400).send({status : false, message : "Please Enter Valid Name"})
             
        if (!email) return res.status(400).send({ status: false, msg: "Please Enter your Email Id" })
        if (!isValidEmail(email)) return res.status(400).send({ status: false, msg: "Please Enter a valid Email Id." })
                        
        let emailExited = await interModel.findOne({ email: email })
        if (emailExited) return res.status(400).send({ status: false, msg: "This Email already existed, Please Try another !" });
            
        
        if (!mobile) return res.status(400).send({ status: false, message: "Please Enter Your Mobile Number" })
        if (!isValidMobile(mobile.trim())) return res.status(400).send({ status: false, message: "Mobile no. should contain only 10 digits" })
        
        let existedMobile = await interModel.findOne({ mobile })
        if (existedMobile) return res.status(400).send({ status: false, message: "This Mobile No. is already registered" })
    
        if (!collegeName) return res.status(400).send({ status: false, message: "Please Enter College Name" })     
        if (!isValid(collegeName)) return res.status(400).send({ status: false, message: "Please Enter Valid CollegeName" })
     
        let collegeData = await collegeModel.findOne({ name: collegeName })
        if (!collegeData) return res.status(404).send({ status: false, message: "No Such College Found" })
      
        data.collegeId = collegeData._id.toString() // to assign collegeId in  properties of data.
       
        let internData = await interModel.create(data) 
        let newIntern = {
            name: internData.name,
            email: internData.email,
            mobile: internData.mobile, 
            collegeId: internData.collegeId,
            isDeleted: internData.isDeleted 
        }
        
        return res.status(201).send({ status: true, data: newIntern})

    } catch (err) {
        res.status(500).send({ status: false, message : err.message });
    }
}




//<<======================= Imported Module =================================>>//

module.exports =  {createIntern};





