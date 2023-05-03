// import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <NavBar/>
        <Routes>
        <Route exact path="/" element={<News pagesize = {6} country = 'in' category = 'general'/>} />
          <Route exact path="/general" element={<News key='general' pagesize = {6} country = 'in' category = 'general'/>} />
          <Route exact path="/business" element={<News key='business' pagesize = {6} country = 'in' category = 'business'/>} />
          <Route exact path="/science" element={<News key='science' pagesize = {6} country = 'in' category = 'science'/>} />
          <Route exact path="/sports" element={<News key='sports' pagesize = {6} country = 'in' category = 'sports'/>} />
          <Route exact path="/health" element={<News key='health' pagesize = {6} country = 'in' category = 'health'/>} />
          <Route exact path="/entertainment" element={<News key='entertainment' pagesize = {6} country = 'in' category = 'entertainment'/>} />
          <Route exact path="/technology" element={<News key='technology' pagesize = {6} country = 'in' category = 'technology'/>} />
        </Routes>
        </Router>
      </div>
    )
  }
}

