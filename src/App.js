import {Switch, Route, Redirect} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Login from './components/Login'
import Popular from './components/Popular'
import SearchPage from './components/SearchPage'
import MovieDetails from './components/MovieDetails'
import AccountPage from './components/AccountPage'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route path="/login" exact component={Login} />
    <ProtectedRoute path="/" exact component={Home} />
    <ProtectedRoute path="/popular" exact component={Popular} />
    <ProtectedRoute path="/search" exact component={SearchPage} />
    <ProtectedRoute path="/account" exact component={AccountPage} />
    <ProtectedRoute path="/movies/:id" exact component={MovieDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
