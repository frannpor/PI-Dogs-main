import './App.css';
import { Route } from 'react-router-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import Detail from './components/Detail/Detail.jsx';
import Form from './components/Form/Form.jsx';
import Home from './components/Home/Home.jsx';
import Landing from './components/Landing/Landing.jsx';
import Nav from './components/Nav/Nav.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/" render={({ location }) => {if (location.pathname !== '/') {
                return (
                  <>
                    <Nav />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/dogs/:id" component={Detail} />
                    <Route exact path="/form" component={Form} />
                    <Route exact path="/form/:id" component={Form} />
                  </>
                );
              }
            }}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
