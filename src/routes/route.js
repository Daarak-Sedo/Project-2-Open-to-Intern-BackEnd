const express = require('express');
const router= express.Router();
const collegeController= require("../controllers/collegeController");
const internController= require("../controllers/internController");




//<<<< ========== Open-to-Intern-College (Project-2) ====================>>>


//--- Create College Api -----------
router.post("/functionup/colleges",collegeController.createCollege);

//--- Create Intern Api -----------
router.post("/functionup/interns",internController.createIntern);

//--- Get Intern wiht College Api -----------
router.get("/functionup/collegeDetails", collegeController.getColleges);





//API for wrong route-of-API
router.all("/*", function (req, res) {
    res.status(400).send({
        status: false,
        message: "Path Not Found"
    })
})



//<----------------Export router Module --------------------------//

module.exports= router;





