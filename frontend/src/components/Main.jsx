import React, { useState, useEffect } from "react";
import NoteListItem from "./NoteListItem";
import NoteForm from "./NoteForm";
import { getNotes, getCategories, addNote } from "../utils/api"
import toast, { Toaster } from "react-hot-toast";
import { Button, IconButton } from "@mui/material";
import { AddCircle } from "@mui/icons-material";

export const Main = () => {

    const [notes, setNotes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    
    const [currentNote, setCurrentNote] = useState({
        title: "",
        content:  "",
        categories: [],
    });

    const [archived, setArchived] = useState(false);
    const [showForm, setShowForm] = useState(false);

    // get notes list
    const getNotesData = async () => {
        const url = (selectedCategory == "all") ? 
            ((!archived) ? '' : '/archived')
            : (`/category=${selectedCategory}`)
        
        try {
            const data = await getNotes(url);
            setNotes(data);
        } catch (error) {
            console.error(error);
        }
    };

    const getCategoriesData = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getNotesData();
        getCategoriesData();
    }, [archived, selectedCategory]);

    
    const handleOnFormSave = async ( note ) => {
        try {
            await addNote(note);
            toast.success("Note added.");
        } catch (error) {
            console.error(error);
            toast.error("Error adding note.");
        }
        getNotesData();
    }

    const handleNoteDeleted = (id, success) => {
        if (success) {
            toast.success("Note deleted.");
            const updatedNotes = notes.filter(note => note.id !== id );
            setNotes(updatedNotes);
        } else {
            toast.error("An error ocurred.");
        }
    }

    const handleNoteEdited = (updatedNote, success) => {
        if (success) {
            toast.success("Note saved.");
            const updatedNotes = notes.map(note => note.id === updatedNote.id ? updatedNote : note);
            setNotes(updatedNotes);
        } else {
            toast.error("An error ocurred.");
        }
    }

    const handleNoteArchived = (id, value, success) => {
        if (success) {
            toast.success(value === true ? "Note archived." : "Note unarchived.");
            const updatedNotes = notes.filter(note => note.id !== id );
            setNotes(updatedNotes);
        } else {
            toast.error("An error ocurred.");
        }
    }

    return (
        <>
        <div><Toaster/></div>

        <div className="flex flex-auto gap-3 p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
            
            <IconButton variant="outlined" onClick={() => setShowForm(true)}>
                <AddCircle color="primary" fontSize="large"/>
            </IconButton>

            <select
                id="categories"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => setSelectedCategory(event.target.value)}
            >
                <option value="all" onChange={() => setSelectedCategory(null)}>All categories</option>
            {
                categories.map(category => (
                    <option 
                        key={category.id} 
                        value={category.name}
                    > 
                        {category.name} 
                    </option> 
                ))
            }   
            </select>

            <Button variant="outlined" onClick={() => setArchived(!archived)}>
                {archived ? ("ACTIVE") : ("ARCHIVED")}
            </Button>
        </div>

        <div className="grid grid-cols-10 gap-4 min-w-full">
            
            <div className="block col-span-10 p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-2xl pb-4 font-extrabold dark:text-white">My notes</h2>
                <div className="min-w-full grid grid-cols-3 gap-4">   
                    {
                        (notes.length != 0) ? (
                        notes.map(note => (
                            <NoteListItem
                                key={note.id}
                                note={note}
                                onEdit={handleNoteEdited}
                                onDelete={handleNoteDeleted}
                                onArchive={handleNoteArchived}
                            />
                        ))
                        ) : (
                            <p>There are no notes.</p>
                        )
                    }
                </div>
            </div>

            <NoteForm 
                onSave={handleOnFormSave}
                currentNote={currentNote}
                isNewNote={true}
                showForm={showForm}
                setShowForm={setShowForm}
            />
        </div>
        </>
    )

}