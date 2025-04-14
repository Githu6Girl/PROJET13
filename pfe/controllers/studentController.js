// const studentModel = require('../models/studentModel');

// // Récupérer tous les étudiants
// const getAllStudents = async (req, res) => {
//   try {
//     const students = await studentModel.getAllStudents();
//     res.status(200).json(students);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Ajouter un étudiant
// const addStudent = async (req, res) => {
//   try {
//     const studentData = req.body;
//     const newStudent = await studentModel.addStudent(studentData);
//     res.status(201).json(newStudent);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Récupérer un étudiant par ID
// const getStudent = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const student = await studentModel.getStudentById(id);
//     if (!student) {
//       return res.status(404).json({ message: "Étudiant non trouvé" });
//     }
//     res.status(200).json(student);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Mettre à jour un étudiant
// const updateStudent = async (req, res) => {
//   const { id } = req.params;
//   const studentData = req.body;
//   try {
//     const updatedStudent = await studentModel.updateStudent(id, studentData);
//     if (!updatedStudent) {
//       return res.status(404).json({ message: "Étudiant non trouvé" });
//     }
//     res.status(200).json(updatedStudent);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Supprimer un étudiant
// const deleteStudent = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedStudent = await studentModel.deleteStudent(id);
//     if (!deletedStudent) {
//       return res.status(404).json({ message: "Étudiant non trouvé" });
//     }
//     res.status(200).json({ message: "Étudiant supprimé" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// module.exports = { getAllStudents, addStudent, getStudent, updateStudent, deleteStudent };