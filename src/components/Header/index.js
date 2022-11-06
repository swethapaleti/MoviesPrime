import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {CgPlayList} from 'react-icons/cg'
import {IoMdCloseCircle} from 'react-icons/io'

import './index.css'

class Header extends Component {
  state = {
    openMenu: false,
    searchVal: '',
  }

  openMenuIcon = () => {
    const {openMenu} = this.state
    this.setState({
      openMenu: !openMenu,
    })
  }

  getSearchInput = event => {
    this.setState({searchVal: event.target.value})
  }

  onSearch = () => {
    const {getSearchMoviesData} = this.props
    const {searchVal} = this.state
    if (searchVal !== '') {
      getSearchMoviesData(searchVal)
    }
  }

  enterFunction = e => {
    const {getSearchMoviesData} = this.props
    const {searchVal} = this.state
    if (e.key === 'Enter') {
      getSearchMoviesData(searchVal)
    }
  }

  render() {
    const {openMenu, searchVal} = this.state
    const {searchRoute, isHome, isPopular, isAccount} = this.props
    const searchContainer = searchRoute
      ? 'search-input-route-container search-input-container'
      : 'search-input-container'
    const searchBtn = searchRoute
      ? 'search-route-btn search-button'
      : 'search-button'
    const searchIcon = searchRoute ? 'icons search-route-icon' : 'icons'

    const homeRoute = isHome ? 'menu-items highlight' : 'menu-items'
    const popularRoute = isPopular ? 'menu-items highlight' : 'menu-items'
    const accountRoute = isAccount ? 'menu-items highlight' : 'menu-items'

    return (
      <div className="main-nav">
        <nav className="nav-container">
          <ul className="nav-item">
            <li>
              <Link to="/">
                <img
                  className="website-logo"
                  src="https://res.cloudinary.com/dkfefpnio/image/upload/v1667331240/Group_7399logo_it1ws9.png"
                  alt="website logo"
                />
              </Link>
            </li>

            <li className="nav-items">
              <Link className={`${homeRoute} style`} to="/">
                Home
              </Link>
            </li>
            <li className="nav-items">
              <Link className={`${popularRoute} style`} to="/popular">
                Popular
              </Link>
            </li>
          </ul>
          <ul className="nav-item">
            <li className="nav-items">
              <div className={searchContainer}>
                {searchRoute && (
                  <input
                    value={searchVal}
                    onChange={this.getSearchInput}
                    onKeyDown={this.enterFunction}
                    placeholder="Search"
                    type="search"
                    className="search-input"
                  />
                )}
                <Link to="/search">
                  <button
                    onClick={this.onSearch}
                    testid="searchButton"
                    type="button"
                    className={searchBtn}
                  >
                    <AiOutlineSearch className={searchIcon} />
                  </button>
                </Link>
              </div>
            </li>
            <li className="nav-items">
              <Link to="/account" className={`${accountRoute} style`}>
                <img
                  className="img"
                  alt="profile"
                  src="https://res.cloudinary.com/dkfefpnio/image/upload/v1667336213/Groupgirl_vwfdxd.png"
                />
              </Link>
            </li>
            <li className="mobile-icon">
              <button
                onClick={this.openMenuIcon}
                className="mobile-btn"
                type="button"
              >
                <CgPlayList size="25" color="white" />
              </button>
            </li>
          </ul>
        </nav>
        {openMenu && (
          <div className="mobile-container">
            <ul className="mobile-item">
              <li className="mobile-items">
                <Link className="style" to="/">
                  Home
                </Link>
              </li>
              <li className="mobile-items">
                <Link className="style" to="/popular">
                  Popular
                </Link>
              </li>
              <li className="mobile-items">
                <Link className="style" to="/account">
                  Account
                </Link>
              </li>
              <li className="mobile-icon">
                <button
                  onClick={this.openMenuIcon}
                  className="mobile-btn"
                  type="button"
                >
                  <IoMdCloseCircle size="25" color="white" />
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default Header
