import logo from './logo.svg';
import './App.css';
import TopicPage from './components/TopicPage/TopicPage';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/threads'>
          <div> threads</div>
          {/* <TheadsPage /> */}
        </Route>
        <Route exact path='/threads/:topicId'>
          <TopicPage />
        </Route>
        <Route path='/'>
          <div> login</div>
          {/* <Login /> */}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
