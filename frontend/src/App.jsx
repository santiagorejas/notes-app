import "./App.css";
import NotesList from "./components/NotesList/NotesList";
import { QueryClient, QueryClientProvider } from "react-query";
import EditCategoriesModal from "./components/Modals/EditCategoriesModal";
import { useState } from "react";
import Header from "./components/Header/Header";

const queryClient = new QueryClient();

function App() {
  const [page, setPage] = useState(1);
  const [showArchived, setShowArchived] = useState(false);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Header
          onShowArchivedClick={() => {
            setShowArchived((pre) => !pre);
            setPage(1);
          }}
          showArchived={showArchived}
        />
        <NotesList showArchived={showArchived} page={page} setPage={setPage} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
