import { createSlice } from '@reduxjs/toolkit'


export const journalSlice = createSlice({
  name: 'journal',
  initialState:{
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
   addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
   },
   setActiveNote: (state, action) => {
    state.active = action.payload;
    state.messageSaved = '';
   },
   setNotes: (state, action) => {
    state.notes = action.payload;
   },
   setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
   },
   updateNote: (state) => {
      state.isSaving = false;
      state.notes = state.notes.map( (note) => {
        if(note.id === state.active.id ){
          return state.active
        }
        
        return note;
        
      });

      state.messageSaved = `${state.active.title}, actualizada correctamente`;
   },
   setPhotosToActiveNote: (state, action) => {
    state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
    state.isSaving = false;

   },
   clearNotesLogout: (state) => {
    state.isSaving = false;
    state.messageSaved = '';
    state.notes = [];
    state.active = null;
   },
   deleteNoteById: (state, action) => {
      state.active = null;
      state.notes = state.notes.filter(note => {
        return note.id !== action.payload
      });
   }
  },
})

// Action creators are generated for each case reducer function
export const { 
  savingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  setPhotosToActiveNote,
  deleteNoteById,
  clearNotesLogout,
} = journalSlice.actions