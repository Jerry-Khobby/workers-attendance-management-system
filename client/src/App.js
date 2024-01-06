
import './App.css';

import WorkersCard from './component/worker/card';
import SignUpForm from  "./component/worker/signup";
import {BrowserRouter,Route,Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<SignUpForm/>}/>
<Route path="/card_info/:email" element={<WorkersCard/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
