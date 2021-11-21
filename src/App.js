import {useState, useEffect} from 'react'
import Posts from './Pages/Posts'
import Navbar from './components/Nav/Navbar'
import Footer from './components/Nav/Footer'
import PostPage from './Pages/PostPage'
import Home from './Pages/Home'

import styled, {css} from 'styled-components'
import ScrollToTop from './components/Nav/ScrollToTop'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const Site= styled.div`
background-color:var(--p-10);
  --navbar-height:4em;
  --footer-height:10em;
  --sidebar-width:4em;

  --bp-small:32em;
  --bp-med:48em;
  --bp-large:64em;

  --margin:1em;

  --p-white:white;
  --p-vlight:#F3F5F7;
  --p-light: #abbcc4;
  --p: #607D8B;
  --p-dark: #324148;
  --p-vdark: #111618;
  --p-black:black;

  --s-vlight: #fbe2da;
  --s-light: #f1997e;
  --s: #E64A19;
  --s-dark: #932f10;
  --s-vdark: #371206;
  ${props => props.theme === 'light' && css`
    --p-10: var(--p-white);
    --p-9: var(--p-vlight);
    --p-7: var(--p-light);
    --p-5: var(--p);
    --p-3: var(--p-dark);
    --p-1: var(--p-vdark);
    --p-0: var(--p-black);

    
    --s-9: var(--s-vlight);
    --s-7: var(--s-light);
    --s-5: var(--s);
    --s-3: var(--s-dark);
    --s-1: var(--s-vdark);
  `}
  ${props => props.theme === 'dark' && css`
  --p-10: var(--p-black);
  --p-9: var(--p-vdark);
  --p-7: var(--p-dark);
  --p-5: var(--p);
  --p-3: var(--p-light);
  --p-1: var(--p-vlight);
  --p-0: var(--p-white);
  
  --s-9: var(--s-vdark);
  --s-7: var(--s-dark);
  --s-5: var(--s);
  --s-3: var(--s-light);
  --s-1: var(--s-vlight);
    `}
`

const Main = styled.main`
  min-height: calc(100vh);
  background-color:var(--p-10);
`

function App() {

  const [theme, setTheme] = useState();

  useEffect(() =>{
    const current = localStorage.getItem('theme');
    if(current){
      setTheme(current)
    } else {
      setTheme('light')
    }
  },[])

  return (
    <Site theme={theme}>
      <Navbar theme={theme} setTheme={x => setTheme(x)}/>
      <Main>
        <Router>
          <ScrollToTop/>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/blog">
              <Posts category="blog"/>
            </Route>
            <Route exact path="/photo">
              <Posts category="photo"/>
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
