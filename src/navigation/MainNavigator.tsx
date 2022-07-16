import About from 'pages/About'
import ArticleDetail from 'pages/ArticleDetail'
import CreateArticle from 'pages/CreateArticle'
import Home from 'pages/Home'
import Login from 'pages/Login'
import MyArticles from 'pages/MyArticles'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import Navigation from './Navigation'
import ProtectedRoute from './ProtectedRoute'

const MainNavigation = () => {
  return (
    <Navigation>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="articles">
            <Route path=":articleId" element={<ArticleDetail />} />
          </Route>
          <Route
            path="my-articles"
            element={
              <ProtectedRoute>
                <MyArticles />
              </ProtectedRoute>
            }
          />
          <Route
            path="create-article"
            element={
              <ProtectedRoute>
                <CreateArticle />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<p>Theres nothing here: 404!</p>} />
        </Routes>
      </BrowserRouter>

    </Navigation>
  )

}

export default MainNavigation
