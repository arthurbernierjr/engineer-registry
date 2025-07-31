const Engineer = require('../models/engineer')
const engineerAPI = {}

const normalizeAvailableField = (body) => {
  body.available = body.available === true || body.available === 'on'
  return body
}

// GET /engineers - list all engineers as JSON
engineerAPI.index = async (req, res) => {
  try {
    const engineers = await Engineer.find({})
    res.status(200).json(engineers)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// GET /engineers/:id - get one engineer by id
engineerAPI.show = async (req, res) => {
  try {
    const engineer = await Engineer.findById(req.params.id)
    if (!engineer) {
      return res.status(404).json({ error: 'Engineer not found' })
    }
    res.status(200).json(engineer)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// POST /engineers - create a new engineer
engineerAPI.create = async (req, res) => {
  normalizeAvailableField(req.body)
  try {
    const newEngineer = await Engineer.create(req.body)
    res.status(201).json(newEngineer)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// PUT /engineers/:id - update engineer by id
engineerAPI.update = async (req, res) => {
  normalizeAvailableField(req.body)
  try {
    const updatedEngineer = await Engineer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updatedEngineer) {
      return res.status(404).json({ error: 'Engineer not found' })
    }
    res.status(200).json(updatedEngineer)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// DELETE /engineers/:id - delete engineer by id
engineerAPI.destroy = async (req, res) => {
  try {
    const deleted = await Engineer.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ error: 'Engineer not found' })
    }
    res.status(200).json({ message: 'Engineer deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = engineerAPI