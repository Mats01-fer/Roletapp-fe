import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import '../App.css';
import Home from '../comonents/home/Home';
import Route404 from '../comonents/Route404';
import { styles } from '../Style';



export default function AppRouter() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Route404 />} />
        </Routes>
      </div >
    </Router >
  );
}
