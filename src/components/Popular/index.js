import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import MovieItems from '../MovieItems'
import Footer from '../Footer'

import './index.css'

const renderConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  fail: 'FAIL',
  loading: 'LOADING',
}

const isPopular = true

class Popular extends Component {
  state = {popularMoviesList: [], renderStatus: renderConstraints.initial}

  componentDidMount() {
    this.getPopularMoviesData()
  }

  getPopularMoviesData = async () => {
    this.setState({renderStatus: renderConstraints.loading})
    const jwtToken = Cookies.get('jwt_token')
    const popularMoviesApi = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(popularMoviesApi, options)
    if (response.ok) {
      const data = await response.json()
      const fetchedPopularMoviesData = data.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        id: eachMovie.id,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      this.setState({
        popularMoviesList: fetchedPopularMoviesData,
        renderStatus: renderConstraints.success,
      })
    } else {
      this.setState({renderStatus: renderConstraints.fail})
    }
  }

  tryAgainPopularData = () => {
    this.getPopularMoviesData()
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        className="failure-img"
        alt="failure view"
        src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660153718/movies%20prime%20app/failure_img_vggqi4.svg"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button
        onClick={this.tryAgainSearchData}
        className="retry-btn"
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {popularMoviesList} = this.state
    return (
      <div className="success-popular">
        <ul className="popular-items">
          {popularMoviesList.map(eachMovie => (
            <MovieItems eachMovie={eachMovie} key={eachMovie.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderSwitchView = () => {
    const {renderStatus} = this.state
    switch (renderStatus) {
      case renderConstraints.loading:
        return this.renderLoaderView()
      case renderConstraints.success:
        return this.renderSuccessView()
      case renderConstraints.fail:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular">
        <Header isPopular={isPopular} />
        {this.renderSwitchView()}
        <Footer />
      </div>
    )
  }
}

export default Popular
