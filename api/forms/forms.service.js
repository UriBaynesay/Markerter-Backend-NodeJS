const dbService = require("../../services/db.service")
const logger = require("../../services/logger.service")

module.exports = {
  query,
  getByEmail,
  add,
}

async function query(filterBy = {}) {
  const criteria = _buildCriteria(filterBy)
  try {
    const collection = await dbService.getCollection("forms")
    var forms = await collection.find(criteria).toArray()
    return forms
  } catch (err) {
    logger.error("cannot find forms", err)
    throw err
  }
}

async function getByEmail(email) {
  try {
    const collection = await dbService.getCollection("forms")
    const form = await collection.findOne({ email })
    return form
  } catch (err) {
    logger.error(`while finding form ${email}`, err)
    throw err
  }
}

async function add(form) {
  try {
    const formToAdd = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      websiteUrl: form.websiteUrl,
      linkedInUrl: form.linkedInUrl,
      experience: form.experience,
      largestBudget: form.largestBudget,
    }
    const collection = await dbService.getCollection("forms")
    await collection.insertOne(formToAdd)
    return formToAdd
  } catch (err) {
    logger.error("cannot insert form", err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  const criteria = {}
  if (filterBy.txt) {
    const txtCriteria = { $regex: filterBy.txt, $options: "i" }
    criteria.$or = [
      {
        firstName: txtCriteria,
      },
      {
        lastname: txtCriteria,
      },
      {
        email: txtCriteria,
      },
    ]
  }
  return criteria
}
