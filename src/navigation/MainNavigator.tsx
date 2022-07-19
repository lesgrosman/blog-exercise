import ArticleDetail from 'pages/ArticleDetail'
import CreateArticle from 'pages/CreateArticle'
import EditArticle from 'pages/EditArticle'
import Home from 'pages/Home'
import Login from 'pages/Login'
import MyArticles from 'pages/MyArticles'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import { ROUTES } from 'utils/constants'
import Navigation from './Navigation'
import ProtectedRoute from './ProtectedRoute'

const MainNavigation = () => {
  return (
    <Navigation>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.ARTICLES}>
            <Route path=":articleId" element={<ArticleDetail />} />
          </Route>
          <Route
            path={ROUTES.MY_ARTICLES}
            element={
              <ProtectedRoute>
                <MyArticles />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.CREATE_ARTICLE}
            element={
              <ProtectedRoute>
                <CreateArticle />
              </ProtectedRoute>
            }
          />
          <Route path={ROUTES.EDIT_ARTICLE}>
            <Route
              path=":articleId"
              element={
                <ProtectedRoute>
                  <EditArticle />
                </ProtectedRoute>
              } 
            />
          </Route>
          <Route path="*" element={<p>Theres nothing here: 404!</p>} />
        </Routes>
      </BrowserRouter>

    </Navigation>
  )

}

export default MainNavigation
