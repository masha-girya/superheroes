import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HeroList } from './components/hero-list';
import { HeroPage } from './components/hero-page';
import { ROUTE_CONSTANTS as ROUTE } from './app-constants';
import { HeroEdit } from './components/hero-edit';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={ROUTE.MAIN_PAGE}>
          <Route index element={<HeroList />} />
          <Route path={ROUTE.HERO} element={<HeroPage />} />
        </Route>

        <Route path={ROUTE.ADD} element={<HeroEdit />} />
        <Route path={ROUTE.EDIT_HERO} element={<HeroEdit />} />
      </Routes>
    </div>
  );
}

export default App;
