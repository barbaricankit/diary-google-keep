import { useState, useContext, createContext } from "react";
export const MainNoteContext = createContext();

export function MainNoteProvider({ children, color: { noteColors } }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  return (
    <MainNoteContext.Provider
      value={{
        noteColors,
        title,
        setTitle,
        text,
        setText
      }}
    >
      {children}
    </MainNoteContext.Provider>
  );
}

export function useMainNote() {
  return useContext(MainNoteContext);
}
