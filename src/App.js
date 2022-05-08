import { Route, Routes } from "react-router-dom";
import { Grommet, grommet } from 'grommet'

import LoginPage from "./pages/login";
import EditorPage from "./pages/editor";
import UserProvider from "./providers/user.provider";
import { deepMerge } from "grommet/utils";

const customTheme = deepMerge(
  grommet,
  {
    global: {
      font: {
        family: "Roboto Mono",
        size: 15,
        color: "white"
      }
    }
  }
)

function App() {

  return (
    <div className="App">
      <UserProvider>
        <Grommet
          className="App"
          full
          theme={customTheme}
          themeMode="dark"
        >
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
