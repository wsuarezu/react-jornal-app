import { DeleteOutline, SaveOutlined, UploadFileOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from "../../hooks/useForm"
import { startDeletingNote } from "../../store/auth"
import { setActiveNote, startSaveNote, startUploadingFiles } from "../../store/journal"
import { ImageGallery } from "../components"


export const NoteView = () => {

  const dispatch = useDispatch();
  const {active: note, messageSaved, isSaving} = useSelector(state => state.journal);
  const {body, title, onInputChange, formState, date} = useForm (note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const fileInputRef = useRef();

 useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState]);

  useEffect(() => {
    if(messageSaved.length > 0){
      Swal.fire('Nota actualizada', messageSaved, 'success');
    }
  }, [messageSaved])
  
  
  const onSaveNote = () => {
    dispatch(startSaveNote());
  }

  const onFileInputChange = ({target}) => {
    if (target.files === 0) return;
    //console.log('subiendo archivos');
    dispatch(startUploadingFiles(target.files));
  }

  const onDelete = () => {
    dispatch(startDeletingNote());
  }

  return (
    <Grid 
        container 
        direction='row' 
        justifyContent='space-between'
        sx={{mb: 1}}
        alignItems="center"
    >
        <Grid item>
            <Typography fontSize={39} fontWeight='light'>
                {dateString}
            </Typography>
        </Grid>
        <Grid item>
          <input 
            type="file"
            ref={fileInputRef}
            multiple
            onChange={onFileInputChange}
            style={{display: 'none'}}
          />
          <IconButton
            color="primary"
            disabled={isSaving}
            onClick={()=>fileInputRef.current.click()}
          >
            <UploadFileOutlined />
          </IconButton>
          <Button 
            color="primary" 
            sx={{padding: 2}}
            onClick={onSaveNote}
            disabled={isSaving}
            >
            <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
            Guardar
          </Button>
        </Grid>
        <Grid container>
          <TextField 
            type="text"
            variant="filled"
            fullWidth
            placeholder="Ingrese un título"
            label="Título"
            sx={{border: 'none', mb: 1}}
            name="title"
            value={title}
            onChange={onInputChange}
          />
          <TextField 
            type="text"
            variant="filled"
            fullWidth
            multiline
            placeholder="¿Qué sucedió en el día de hoy?"
            minRows={5}
            name="body"
            value={body}
            onChange={onInputChange}
          />
        </Grid>
        <Grid container justifyContent='end'>
          <Button
            onClick={onDelete}
            sx={{mt: 2}}
            color="error"
          >
            <DeleteOutline />
            Borrar
          </Button>
        </Grid>
        {/* Galería de imagenes */}
        <ImageGallery images={note.imageUrls}/>
    </Grid>
  )
}
