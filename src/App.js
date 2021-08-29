import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TopicPage from './components/TopicPage/TopicPage';
import LoginPage from './components/LoginPage/LoginPage';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

function App() {
  const [currentUser, SetCurrentUser] = useState();
  console.log(currentUser)
  return (
    <BrowserRouter>
      <Switch>
        <div>
        <LoginPage SetCurrentUser={SetCurrentUser}/>
        <Route exact path='/threads'>
          <div> threads</div>
          {/* <TheadsPage /> */}
        </Route>
        <Route exact path='/threads/:topicId'>
          <TopicPage currentUser={currentUser}/>
        </Route>
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
