const formsService = require("./forms.service")
const logger = require("../../services/logger.service")

async function getForm(req, res) {
  try {
    const form = await formsService.getByEmail(req.params.email)
    res.send(form)
  } catch (err) {
    logger.error("Failed to get form", err)
    res.status(500).send("Failed to get form")
  }
}

async function getFroms(req, res) {
  try {
    const filterBy = {
      txt: req.query?.txt || "",
      minBalance: +req.query?.minBalance || 0,
    }
    const forms = await formsService.query(filterBy)
    res.send(forms)
  } catch (err) {
    logger.error("Failed to get forms", err)
    res.status(500).send("Failed to get forms")
  }
}

async function addForm(req, res) {
  try {
    const form = req.body
    const isEmailUsed=await formsService.getByEmail(form.email)
    if(isEmailUsed!==null) throw 'email already in use'
    const savedForm = await formsService.add(form)
    res.send(savedForm)
  } catch (err) {
    logger.error("Failed to add form", err)
    res.status(500).send("Failed to add form "+err)
  }
}

module.exports = {
  getForm,
  getFroms,
  addForm,
}
