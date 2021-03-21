import { useState, useContext, createContext } from "react";
export const TagsContext = createContext();

export function TagsProvider({ children, tags: { predefinedTags } }) {
  const [tags, setTags] = useState(predefinedTags);
  const [filterByTag, setFilterByTag] = useState("");
  return (
    <TagsContext.Provider
      value={{
        tags,
        setTags,
        filterByTag,
        setFilterByTag
      }}
    >
      {children}
    </TagsContext.Provider>
  );
}

export function useTags() {
  return useContext(TagsContext);
}
