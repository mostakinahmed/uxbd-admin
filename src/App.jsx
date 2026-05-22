import { Routes, Route } from "react-router-dom";
import "./index.css";
import AdminDashboard from "./page/Dashboard";


function App() {


  return (
    <Routes>

      {/* Layout with Sidebar */}
      <Route>
        <Route path="/" element={<AdminDashboard />} />


      </Route>

    </Routes>
  );
}

export default App;