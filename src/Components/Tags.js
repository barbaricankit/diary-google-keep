import { useState } from "react";

import { useTags } from "./tags-context";
export function Tags() {
  const { tags, setTags, filterByTag, setFilterByTag } = useTags();
  const [tag, setTag] = useState("");
  const handleTag = () => {
    const tagIndex = tags.findIndex((tagValue) => tagValue === tag);
    tagIndex === -1
      ? setTags((prevTags) => [...prevTags, tag])
      : setTags((prevTags) => prevTags);
    setTag("");
  };
  return (
    <>
      <div className="tags">
        <h1>Tags</h1>
        <div className="tag" key="0" onClick={() => setFilterByTag("")}>
          All
        </div>
        {tags.map((tag, index) => (
          <div
            className="tag"
            key={index + 1}
            onClick={() => setFilterByTag(tag)}
          >
            {tag}
          </div>
        ))}
        <input
          className="tagTextBox"
          type="text"
          placeholder="Enter a tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <button
          onClick={() => {
            handleTag();
          }}
        >
          +
        </button>
      </div>
    </>
  );
}
