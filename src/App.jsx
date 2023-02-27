import './App.css'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import { useEffect, useState } from 'react';
import uuid from 'react-uuid'


function App() {

  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
  
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes",JSON.stringify(notes));
    console.log(notes)
  } , [notes]);
  

  const onAddNote = () => {
    console.log("関数が呼ばれました");

    const newNote = {
      id:uuid(),
      title:"新規作成",
      content:"",
      modDate:Date.now(),
    };

    setNotes([...notes,newNote]);
    console.log(notes);
  }

  const onDeleteNote = (id) => {
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }

  const onUpdateNote = (updateNote) => {
    const updateNoteArray = notes.map((note) => {
      if (note.id === updateNote.id){
        return updateNote;
      } else {
        return note;
      }
    });
    setNotes(updateNoteArray);
  }

  

  return (
    <div className="App">
      <Sidebar onAddNote={onAddNote} notes={notes} onDeleteNote={onDeleteNote} activeNote={activeNote} setActiveNote={setActiveNote} />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  )
}

export default App
