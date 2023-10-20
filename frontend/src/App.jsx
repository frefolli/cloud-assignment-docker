import React, {useState} from 'react';
import {Route, Routes} from 'react-router';
import NavBar from './components/NavBar';
import NavBarThemeManager from './components/NavBarThemeManager';
import Birre from './pages/Birre';
import Home from './pages/Home';
import Impostazioni from './pages/Impostazioni';
import Inventario from './pages/Inventario';
import Ricette from './pages/Ricette';
import Spesa from './pages/Spesa';
import {useSnackbar} from 'notistack';
import Notifier from './utils/Notifier';

const App = () => {
  const [flick, setFlick] = useState(0);
  const {enqueueSnackbar} = useSnackbar();
  const notifier = new Notifier(enqueueSnackbar);

  return (
    <React.Fragment>
      <NavBarThemeManager>
        <NavBar />
      </NavBarThemeManager>
      <Routes>
        <Route path="/" element={<Home notifier={notifier}/>}/>
        <Route path="/Ricette" element={<Ricette notifier={notifier}/>}/>
        <Route path="/Birre" element={<Birre notifier={notifier}/>}/>
        <Route path="/Inventario" element={<Inventario notifier={notifier}/>}/>
        <Route path="/Spesa" element={<Spesa notifier={notifier}/>}/>
        <Route path="/Impostazioni" element={<Impostazioni notifier={notifier} masterCall={() => setFlick({flick})}/>}/>
      </Routes>
    </React.Fragment>
  );
};

export default App;
