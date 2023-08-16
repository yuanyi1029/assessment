import '../styles/app.css';
import React from 'react';
import Data from './Data'
import MyNavbar from './MyNavbar';

function App() {
  return (
    <>
      <header>
        <MyNavbar />
      </header>
      <body>
        <Data />
      </body>
    </>
  )
}

export default App;
