import MainContainer from "./components/mainContainer";
import NotesContainer from "./components/notesContainer";
import { Loading } from "./loading";
import { Note } from "./generated-note";
function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#244855] p-8 ">
      <div className="flex space-x-16 ">
        <MainContainer />
        <NotesContainer />
      </div>
      <Loading />
      <Note />
    </div>
  );
}

export default App;
