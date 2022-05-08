import { Route, Routes } from "react-router-dom";
import { Grommet } from 'grommet'

import LoginPage from "./pages/login";
import EditorPage from "./pages/editor";
import UserProvider from "./providers/user.provider";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Grommet className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/editor" element={<EditorPage />} />
          </Routes>
        </Grommet>
      </UserProvider>
    </div>
  );
}

export default App;
