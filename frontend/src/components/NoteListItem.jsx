import { useState } from "react";
import {limit} from "../utils/note"
import { updateNote, deleteNote, archiveNote } from "../utils/api"
import NoteForm from "./NoteForm"
import { Button, Modal, IconButton } from "@mui/material";
import { Archive, Delete, Edit, Unarchive } from "@mui/icons-material";
import NoteView from "./NoteView";

function NoteListItem({ note, onEdit, onDelete, onArchive }) {
    
    const MAX_TITLE_LENGTH = 20;
    const MAX_CONTENT_LENGTH = 50;

    const [showForm, setShowForm] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showNoteDetails, setShowNoteDetails] = useState(false);

    const handleUpdate = async ( note ) => {
        let success;
        try {
            await updateNote(note.id, note);
            success = true;
        } catch (error) {
            console.error(error);
            success = false;
        }
        onEdit(note, success);
    }

    const handleDelete = async () => {
        let success;
        try {
            await deleteNote(note.id);
            success = true;
        } catch (error) {
            console.error(error);
            success = false;
        }
        setShowConfirmDelete(false);
        onDelete(note.id, success);
    }   

    const handleArchive = async () => {
        note.archived = !note.archived;
        let success;
        try {
            await archiveNote(note.id, note.archived)
            success = true;
        } catch (error) {
            console.error(error);
            success = false;
        }
        onArchive(note.id, note.archived, success);
    }

    const handleEditClick = event => {
        event.stopPropagation();
        setShowForm(true);
    }

    const handleDeleteClick = event => {
        event.stopPropagation();
        setShowConfirmDelete(true);
    }

    const handleArchiveClick = event => {
        event.stopPropagation();
        handleArchive();
    }

    return (
    <>
    <div onClick={() => setShowNoteDetails(true)}
    className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex-auto">
            <h5 className="mb-2 px-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white justify-start">
                { limit(note.title, MAX_TITLE_LENGTH) }
            
            <IconButton
                className="mb-2 px-2 align-middle"
                onClick={handleEditClick}
            > <Edit /> </IconButton>
            <IconButton 
                className="mb-2 px-2"
                onClick={handleDeleteClick}
            > <Delete /> </IconButton>
            <IconButton 
                className="mb-2 px-2"
                onClick={handleArchiveClick}
            > { !note.archived ? <Archive /> : <Unarchive />}</IconButton>
            </h5>
        </div>
        <div className="flex-auto">
            <p className="font-normal text-gray-700 dark:text-gray-400">
                { limit(note.content, MAX_CONTENT_LENGTH) }
            </p>
        </div>
    </div>

        <NoteForm 
            currentNote={note}
            onSave={handleUpdate}
            showForm={showForm}
            isNewNote={false}
            setShowForm={setShowForm}
        />

        <NoteView
            note={note}
            show={showNoteDetails}
            setShow={setShowNoteDetails}
        />

        <Modal
            className="h-screen flex items-center justify-center"
            open={showConfirmDelete}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="p-6 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this note?
                </h3>
                <Button color="error" variant="contained" onClick={handleDelete}>Yes</Button>
                <Button variant="outlined" onClick={() => setShowConfirmDelete(false)}>No</Button>
                </div>
            </div>
        </div>

        </Modal>

    </>
    )
}

export default NoteListItem;