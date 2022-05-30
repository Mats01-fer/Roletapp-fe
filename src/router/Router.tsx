import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import '../App.css';
import Circle from "../comonents/circle/Circle2";
import Wrapper from '../comonents/circle/wrapper';
import Home from '../comonents/home/Home';
import Route404 from '../comonents/Route404';



export default function AppRouter() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/circle" element={<Wrapper />} />
          <Route path="/circle2" element={<Circle percentage={0.5} />} />
          <Route path="*" element={<Route404 />} />
        </Routes>
      </div >
    </Router >
  );
}
