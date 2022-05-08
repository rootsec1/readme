import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/login";
import EditorPage from "./pages/editor";
import UserProvider from "./providers/user.provider";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/editor" element={<EditorPage />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
