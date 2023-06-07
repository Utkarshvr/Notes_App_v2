import { Router } from "express";

const notesRouter = Router();

import {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notes.controllers.js";

import isAuthenticated from "../middlewares/authentication/isAuthenticated.js";
import {
  checkNotes,
  validateField,
} from "../middlewares/validation/validator.js";

// Get All Notes
notesRouter.get("/", isAuthenticated, getAllNotes);

// Get A particular Note
notesRouter.get("/:noteID", isAuthenticated, getNote);

// Create Note
notesRouter.post("/", isAuthenticated, checkNotes, validateField, createNote);

// Update Note
notesRouter.put(
  "/:noteID",
  isAuthenticated,
  checkNotes,
  validateField,
  updateNote
);

// Delete Note
notesRouter.delete("/:noteID", isAuthenticated, deleteNote);

export default notesRouter;
