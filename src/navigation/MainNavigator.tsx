import About from 'pages/About'
import ArticleDetail from 'pages/ArticleDetail'
import Articles from 'pages/Articles'
import Login from 'pages/Login'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import Navigation from './Navigation'

const MainNavigation = () => {
  return (
    <Navigation>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/articles">
            <Route path=":articleId" element={<ArticleDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </Navigation>
  )

}

export default MainNavigation
