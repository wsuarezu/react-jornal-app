
import { async } from "@firebase/util";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";

export const startNewNote = () => {
    return async(dispatch, getState) => {

        dispatch(savingNewNote());

       const {uid} = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        const setDocResp = await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));

    }
}

export const startLoadingNotes = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe');
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        
        dispatch(setSaving());
        
        const {uid} = getState().auth;
        const {active: note} = getState().journal;
        const noteFireStore = {...note}
        
        delete noteFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

        await setDoc(docRef, noteFireStore, {merge: true});

        dispatch(updateNote());

    }
}

export const startUploadingFiles = (files = []) => {
    return async(dispatch) => {
        dispatch(setSaving());
        // await fileUpload(files[0]);
        const fileUploadPromises = [];

        for (const file of files){
            fileUploadPromises.push(fileUpload(file));
        }

        const photoUrls = await Promise.all(fileUploadPromises);

        dispatch(setPhotosToActiveNote(photoUrls));
    }
}