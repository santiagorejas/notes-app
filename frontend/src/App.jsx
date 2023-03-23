import "./App.css";
import Modal from "./components/UI/Modal/Modal";
import NotesList from "./components/NotesList/NotesList";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <NotesList />
      </QueryClientProvider>
    </div>
  );
}

export default App;
