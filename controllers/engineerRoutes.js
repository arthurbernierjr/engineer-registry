const express = require("express")
const router = express.Router()
const engineerViews = require("./engineerViews")
const engineerData = require("./engineerData")
const engineerApi = require("./engineerAPI")

//Index
router.get("/",engineerData.index,engineerViews.index)
//New
router.get("/new",engineerViews.newView)
//Destroy
router.delete("/:id",engineerData.destroy,engineerViews.redirectHome)
//Update
router.put("/:id",engineerData.update,engineerViews.redirectShow)
//Create
router.post("/",engineerData.create,engineerViews.redirectHome)
//Edit
router.get("/:id/edit",engineerData.show,engineerViews.edit)
//Show
router.get("/:id",engineerData.show, engineerViews.show)

module.exports=router