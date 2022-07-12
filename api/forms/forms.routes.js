const express = require("express")
const { getForm, getFroms, addForm } = require("./forms.controller")
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get("/", getFroms)
router.get("/:email", getForm)
router.post("/", addForm)

module.exports = router
