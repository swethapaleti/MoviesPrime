import {Component} from 'react'
import {format} from 'date-fns'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import SimilarMovies from '../SimilarMovies'
import Footer from '../Footer'

import './index.css'

const AvailableLanguages = props => {
  const {eachItem} = props
  const {englishName} = eachItem
  return (
    <li className="info-items list-item">
      <p>{englishName}</p>
    </li>
  )
}

const GenreList = props => {
  const {eachItem} = props
  const {name} = eachItem
  return (
    <li className="info-items list-item">
      <p>{name}</p>
    </li>
  )
}

const renderConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  fail: 'FAIL',
  loading: 'LOADING',
}

class MovieDetails extends Component {
  state = {movieDetailsList: [], renderStatus: renderConstraints.initial}

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({renderStatus: renderConstraints.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const movieDetailsApi = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(movieDetailsApi, options)
    if (response.ok) {
      const data = await response.json()
      const updatedGenreList = data.movie_details.genres.map(eachGenre => ({
        id: eachGenre.id,
        name: eachGenre.name,
      }))
      const updatedSimilarMovies = data.movie_details.similar_movies.map(
        eachMovie => ({
          backdropPath: eachMovie.backdrop_path,
          id: eachMovie.id,
          posterPath: eachMovie.poster_path,
          title: eachMovie.title,
        }),
      )
      const updatedSpokenLanguages = data.movie_details.spoken_languages.map(
        eachLanguage => ({
          id: eachLanguage.id,
          englishName: eachLanguage.english_name,
        }),
      )
      const updatedData = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        genres: updatedGenreList,
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        similarMovies: updatedSimilarMovies,
        spokenLanguages: updatedSpokenLanguages,
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      }
      this.setState({
        movieDetailsList: updatedData,
        renderStatus: renderConstraints.success,
      })
    } else {
      this.setState({renderStatus: renderConstraints.fail})
    }
  }

  tryAgainMoviesData = () => {
    this.getMovieDetails()
  }

  renderLoaderView = () => (
    <div className="details">
      <Header />
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  renderFailureView = () => (
    <>
      <Header />
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
    </>
  )

  renderSuccessView = () => {
    const {movieDetailsList} = this.state

    const {
      adult,
      backdropPath,
      budget,
      genres,
      overview,
      releaseDate,
      runtime,
      similarMovies,
      spokenLanguages,
      title,
      voteAverage,
      voteCount,
    } = movieDetailsList
    const inHours = Math.floor(runtime / 60)
    const inMinutes = runtime % 60
    const runTimeInHoursAndMinutes = `${inHours}h ${inMinutes}m`
    const certificateName = adult ? 'A' : 'U/A'
    const releaseYear = format(new Date(releaseDate), 'yyyy')
    const releaseDateFormat = format(new Date(releaseDate), 'do MMMM yyyy')
    return (
      <>
        <div
          style={{backgroundImage: `url(${backdropPath})`}}
          className="movie-detail-page"
        >
          <Header />
          <div className="movie-detail-movie-page">
            <h1 className="title">{title}</h1>
            <div className="more-details">
              <p className="duration">{runTimeInHoursAndMinutes}</p>
              <p className="certificate">{certificateName}</p>
              <p className="release-year">{releaseYear}</p>
            </div>
            <p className="over-view">{overview}</p>
            <button type="button" className="play-btn">
              Play
            </button>
          </div>
        </div>
        <div className="additional-information">
          <div className="movie-info">
            <div className="info">
              <h1 className="info-heading">Genres</h1>
              <ul className="list-items">
                {genres.map(eachItem => (
                  <GenreList eachItem={eachItem} key={eachItem.id} />
                ))}
              </ul>
            </div>
            <div className="info">
              <h1 className="info-heading">Audio Available</h1>
              <ul className="list-items">
                {spokenLanguages.map(eachItem => (
                  <AvailableLanguages eachItem={eachItem} key={eachItem.id} />
                ))}
              </ul>
            </div>
            <div className="info">
              <h1 className="info-heading">Rating Count</h1>
              <p className="info-items info-name">{voteCount}</p>
              <h1 className="info-heading">Rating Average</h1>
              <p className="info-items info-name">{voteAverage}</p>
            </div>
            <div className="info info1">
              <h1 className="info-heading">Budget</h1>
              <p className="info-items info-name">{budget}</p>
              <h1 className="info-heading">Release Date</h1>
              <p className="info-items info-name">{releaseDateFormat}</p>
            </div>
          </div>
          <div className="similar-movies-container">
            <h1 className="more-like-this-text">More like this</h1>
            <div className="similar-movies-list">
              {similarMovies.map(eachMovie => (
                <SimilarMovies eachMovie={eachMovie} key={eachMovie.id} />
              ))}
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  }

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
    return <div className="detail-container">{this.renderSwitchView()}</div>
  }
}

export default MovieDetails
