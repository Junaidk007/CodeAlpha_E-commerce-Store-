
import { Routes} from "react-router-dom";
import {mainRoutes }from "./routes/MainRoute.jsx";

function App() {
  return (
    <>
      <Routes>
        {mainRoutes}
      </Routes>
    </>
  );
}

export default App;
