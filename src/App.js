import Posts from './components/Posts'
import Navbar from './components/Nav/Navbar'
import Footer from './components/Footer'
import PostPage from './components/PostPage'
import Welcome from './components/Welcome'
import BlogCardContainer from './components/CategoryList/BlogCardContainer'



import styled from 'styled-components'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const Site= styled.div`
  --secondary600: #bb4d00;

  --p: #78909c;
  --p-vlight:#cfd8dc;
  --p-light: #a7c0cd;
  --p-dark: #4b636e;
  --s: #f57c00;
  --s-vlight: white;
  --s-light: #ffad42;
  --s-dark: #bb4d00;
`

const Main = styled.main`
  min-height: calc(100vh);
  background-color:var(--p-vlight);
  padding:1em;
`

function App() {
  return (
    <Site>
      <Navbar navItems=""/>
      <Main>
        <Router>
          <Switch>
            <Route exact path="/">
              <Welcome/>
            </Route>
            <Route exact path="/blog">
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
