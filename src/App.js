import Posts from './components/Posts'
import Navbar from './components/Nav/Navbar'
import Footer from './components/Footer'
import PostPage from './components/PostPage'

import styled from 'styled-components'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const Site= styled.div`
  --primary: #78909c;
  --primary50: #cfd8dc;
  --secondary: #f57c00;
  --secondary600: #bb4d00;
  --p: #78909c;
  --p-dark: #4b636e;
  --p-light: #a7c0cd;
  --s: #f57c00;
  --s-dark: #af4448;
  --s-light: #ffa4a2;
`

const Main = styled.main`
  min-height: calc(100vh);
`

function App() {
  return (
    <Site>
      <Navbar/>
      <Main>
        <Router>
          <Switch>
            <Route exact path="/">
              <Posts/>
            </Route>
            <Route path="/post/:id" component={PostPage}/>
          </Switch>
        </Router>
      </Main>
      <Footer/>
    </Site>
  );
}

export default App;
