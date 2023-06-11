import configResponse from "../config.js";
import { sendRes } from "../helpers/sendRes.helper.js";
import Notes from "../models/notes.model.js";

export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Notes.find({ creator: { _id: req.user } })
      .populate("creator")
      .sort({ updatedAt: -1 });

    return sendRes(res, 200, true, configResponse.messages.NOTES_FOUND, {
      notes,
    });
  } catch (error) {
    return next(error);
  }
};

export const getNote = async ({ params: { noteID } }, res, next) => {
  try {
    const note = await Notes.findById(noteID).populate("creator");
    if (!note)
      return sendRes(res, 404, false, configResponse.messages.NOT_FOUND, {
        note,
      });

    return sendRes(res, 200, true, configResponse.messages.NOTE_FOUND, {
      note,
    });
  } catch (error) {
    return next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const { title, desc } = req.body;
    const note = await Notes.create({ creator: req.user, title, desc });

    const populatedNote = await Notes.findById(note._id).populate("creator");

    return sendRes(res, 201, true, configResponse.messages.NOTE_CREATED, {
      note: populatedNote,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { noteID } = req.params;
    const { title, desc } = req.body;

    // if I provide creator field, then it will overwrite else will remain the same
    // since, I want it to remain the same, I willn't send the creator field again
    const note = await Notes.findByIdAndUpdate(
      noteID,
      {
        title,
        desc,
      },
      { new: true }
    );

    const populatedNote = await Notes.findById(note._id).populate("creator");

    if (!note)
      return sendRes(res, 404, false, configResponse.messages.NOT_FOUND);

    return sendRes(res, 200, true, configResponse.messages.NOTE_UPDATED, {
      note: populatedNote,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { noteID } = req.params;
    const note = await Notes.findByIdAndDelete(noteID);
    if (!note)
      return sendRes(res, 404, false, configResponse.messages.NOT_FOUND);

    return sendRes(res, 200, true, configResponse.messages.NOTE_DELETED);
  } catch (error) {
    return next(error);
  }
};
