
import { AddOutlined } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"

export const JournalPage = () => {

  const {isSaving, active} = useSelector(state => state.journal);

  const dispatch = useDispatch();

  const onClickNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <JournalLayout>
      
      {/* <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia enim eligendi quia distinctio fugiat, iusto quo aliquid eaque? Quibusdam labore nisi laboriosam veniam fugit ducimus rem unde, modi iure sunt!</Typography> */}
      {
        (!!active) 
        ? <NoteView /> 
        : <NothingSelectedView/>
      }
      
      <IconButton
        onClick={onClickNewNote}
        size="large"
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': {backgroundColor: 'error.main', opacity: 0.9},
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
        disabled={isSaving}
      >
        <AddOutlined sx={{fontSize: 30}}/>
      </IconButton>
      
    </JournalLayout>
  )
}
