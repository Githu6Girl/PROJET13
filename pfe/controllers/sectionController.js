const sectionModel = require('../models/sectionModel');

// Récupérer toutes les sections
const getAllSections = async (req, res) => {
  try {
    const sections = await sectionModel.getAllSections();
    res.status(200).json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Ajouter une section
const addSection = async (req, res) => {
  try {
    const sectionData = req.body;
    const newSection = await sectionModel.addSection(sectionData);
    res.status(201).json(newSection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer une section par ID
const getSection = async (req, res) => {
  const { id } = req.params;
  try {
    const section = await sectionModel.getSectionById(id);
    if (!section) {
      return res.status(404).json({ message: "Section non trouvée" });
    }
    res.status(200).json(section);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Modifier une section
const updateSection = async (req, res) => {
  const { id } = req.params;
  const sectionData = req.body;
  try {
    const updatedSection = await sectionModel.updateSection(id, sectionData);
    if (!updatedSection) {
      return res.status(404).json({ message: "Section non trouvée" });
    }
    res.status(200).json(updatedSection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer une section
const deleteSection = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSection = await sectionModel.deleteSection(id);
    if (!deletedSection) {
      return res.status(404).json({ message: "Section non trouvée" });
    }
    res.status(200).json({ message: "Section supprimée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllSections, addSection, getSection, updateSection, deleteSection };