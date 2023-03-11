import React, {Fragment} from 'react';
import Navbar from './components/navbar';
import CoctelList from './components/CoctelList';
import './App.css';
import CoctelListDB from './components/CoctelListDB';

function App() {

  return (
    <Fragment>
      <Navbar brand='Coctel App'/>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-4'>
            <p className='text fant' style={{textAlign: 'center'}}>Api Cocteles</p>
            <CoctelList/>
          </div>
        <div className='col-8'>
            <p className='fant' style={{textAlign: 'center'}}>Cocteles Guardados</p>
            <CoctelListDB />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
