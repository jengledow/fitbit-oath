import Authed from './Authed';
import './App.css';
import { Routes, Route } from 'react-router';
import Home from './Home';
import Display from './Display';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/login' Component={Authed} />
        <Route path='/authed' Component={Authed} />
        <Route path='/display' Component={Display} />
      </Routes>
    </>
  )
}

export default App
