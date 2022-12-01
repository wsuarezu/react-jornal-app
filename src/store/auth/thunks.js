
import { async } from "@firebase/util";
import { deleteDoc, doc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout, deleteNoteById } from "../journal";
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIng = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        
         if(!result.ok) return dispatch(logout(result.errorMessage));

         dispatch(login(result));
    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName});
        
        if(!ok) return dispatch(logout({errorMessage}));

        dispatch(login({uid, displayName, email, photoURL}));
        
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async (dispatch) => {
        //console.log({email, password});
        dispatch(checkingCredentials);
        const {ok, uid, photoURL, displayName,errorMessage} = await loginWithEmailPassword({email, password});
        
        if(!ok) return dispatch(logout({errorMessage}));

        dispatch(login({uid, displayName, email, photoURL}));

    }
}

export const startLogout = () => {
    return async(dispatch) => {
       await logoutFirebase();
       dispatch(clearNotesLogout());
       dispatch(logout());
    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;
        const {active: note} = getState().journal;
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));
    }
}