import Quote from "./Quote"
import Home from './Home';
import AddQuotes from "./AddQuotes"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

function App() {
 return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/addQuotes" element={<AddQuotes />} />
        </Routes>
      </Router>
    </div>
 );
}

export default App;