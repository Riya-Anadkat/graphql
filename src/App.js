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
  return (
    <BrowserRouter>
      <Switch>
        <div>
        <LoginPage />
        <Route exact path='/'>
          <div> threads</div>
          {/* <TheadsPage /> */}
        </Route>
        <Route exact path='/:topicId'>
          <TopicPage />
        </Route>
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
