import { useState, useContext, createContext } from "react";
export const NoteContext = createContext();

export function NoteProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [isPinned, setIsPinned] = useState(false);
  const [isEditNote, setIsEditNode] = useState("");
  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        isPinned,
        setIsPinned,
        isEditNote,
        setIsEditNode
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

export function useNote() {
  return useContext(NoteContext);
}
