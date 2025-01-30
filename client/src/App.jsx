import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Transactions from "./pages/transactions/Transactions.jsx";
import Welcome from "./pages/welcome/Welcome.jsx"
import Register from "./pages/register/Register.jsx"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </Router>
  );
};

{/* <Route exact path="/">
{loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
</Route> */}



export default App;