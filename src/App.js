import { MainNote } from "./Components/MainNote";
import { PinnedNotes } from "./Components/PinnedNotes";
import { OtherNotes } from "./Components/OtherNotes";
import "./App.css";
import { Tags } from "./Components/Tags";
import { useTags } from "./Components/tags-context";
import { TaggedNotes } from "./Components/TaggedNotes";

function App() {
  const { filterByTag } = useTags();
  return (
    <div className="App">
      <header className="App-header">
        <div className="notes">
          <div className="navBar">
            <Tags />
          </div>
          <div className="mainContent">
            {filterByTag === "" && (
              <div>
                <MainNote />

                <PinnedNotes />
                <OtherNotes />
              </div>
            )}
            {filterByTag !== "" && <TaggedNotes />}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
