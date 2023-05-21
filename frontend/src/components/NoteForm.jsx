import { Button, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';

function NoteForm({  onSave, isNewNote, currentNote, showForm, setShowForm }) {

    const INITIAL_STATE = {
        title: currentNote.title || "",
        content: currentNote.content || "",
        categories: currentNote.categories.map(category => category.name) || []
    }
    const EMPTY_STATE = {
        title: "",
        content: "",
        categories: []
    }
    const [note, setNote] = useState(INITIAL_STATE);
    const [category, setCategory] = useState("");

    const handleChange = (e) => {
        if (e.target.name === "category"){
            setCategory(e.target.value);
        } else {
            setNote({
                ...note,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (note.categories.length > 0) {
            const noteRequest = {
                content: note.content,
                title: note.title,
                categories: note.categories
            };
            if (!isNewNote) {
                noteRequest.id = currentNote.id;
                noteRequest.archived = currentNote.archived;
            }
            setShowForm(false);
            setNote(EMPTY_STATE);
            onSave(noteRequest);
        } else {
            alert("Can't save note without categories");
        }
    }

    const handleDiscard = () => {
        setShowForm(false);
        //setNote(EMPTY_STATE);
    }

    const handleAddCategory = () => {
        if (category != "" && !note.categories.some(cat => cat === category)) {
            setNote(prevState => ({
                ...prevState,
                categories: [...prevState.categories, category]
            }))
        }
    }

    const handleDeleteCategory = (category) => {
        setNote(prevState => ({
            ...prevState,
            categories: prevState.categories.filter(cat => cat !== category )
        }))
    }

    return (
        <Modal
            className="h-screen flex items-center justify-center"
            open={showForm}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <form 
            className="block col-span-4 w-96 p-6 justify-center resize-none bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            onSubmit={handleSubmit}
        >
            <h2 className="text-2xl pb-4 font-extrabold dark:text-white">New note</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Note title"
                    id="base-input"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={note.title}
                    name="title"
                    onChange={handleChange}
                    required={true}
                />
            </div>
            <div className="mb-4">
                <textarea
                    type="text"
                    placeholder="Content"
                    id="base-input"
                    rows="8"
                    className="resize-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={note.content}
                    name="content"
                    onChange={handleChange}
                    required={true}
                />
            </div>

            <div className="mb-4 flex flex-wrap items-center">
                <b>Categories:</b>
                {
                    note.categories.map(category => (
                        <Button key={category} endIcon={<CancelIcon/>} className="lowercase" onClick={() => handleDeleteCategory(category)}>
                            {category}
                        </Button>
                    ))
                }
            </div>

            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="category"
                    id="base-input"
                    className="lowercase px-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={category}
                    name="category"
                    onChange={handleChange}
                />
                <Button color="primary" variant="contained" onClick={handleAddCategory}>Add</Button>
            </div>

            <div className="flex gap-2">
                <Button color="success" variant="contained" type="submit">Save</Button>
                <Button color="error" variant="contained" onClick={handleDiscard}>Discard</Button>
            </div>
        </form>
        </Modal>
    )
}

export default NoteForm;