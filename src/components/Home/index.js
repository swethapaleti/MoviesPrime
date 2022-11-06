import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

import {IoIosWarning} from 'react-icons/io'
import Header from '../Header'
import Footer from '../Footer'
import MovieCardItem from '../MovieCardItem'

import './index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
}

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const isHome = true

class Home extends Component {
  state = {
    originals: [],
    trending: [],
    originalStatus: apiConstants.initial,
    trendingStatus: apiConstants.initial,
    randomOriginalIndex: 0,
  }

  componentDidMount() {
    this.originalData()
    this.trendingData()
  }

  originalData = async () => {
    this.setState({
      originalStatus: apiConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(apiUrl, options)
      if (response.ok === true) {
        const fetchedData = await response.json()
        const updatedData = fetchedData.results.map(movie => ({
          title: movie.title,
          id: movie.id,
          backdropPath: movie.backdrop_path,
          posterPath: movie.poster_path,
          overview: movie.overview,
        }))
        const index = Math.floor(updatedData.length * Math.random())
        this.setState({
          originals: updatedData,
          originalStatus: apiConstants.success,
          randomOriginalIndex: index,
        })
      } else {
        this.setState({
          originalStatus: apiConstants.failure,
        })
      }
    } catch (e) {
      console.log(e)
      this.setState({
        originalStatus: apiConstants.failure,
      })
    }
  }

  trendingData = async () => {
    this.setState({
      trendingStatus: apiConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(apiUrl, options)
      if (response.ok === true) {
        const fetchedData = await response.json()
        const updatedData = fetchedData.results.map(movie => ({
          title: movie.title,
          id: movie.id,
          backdropPath: movie.backdrop_path,
          posterPath: movie.poster_path,
          overview: movie.overview,
        }))
        this.setState({
          trending: updatedData,
          trendingStatus: apiConstants.success,
        })
      } else {
        this.setState({
          trendingStatus: apiConstants.failure,
        })
      }
    } catch (e) {
      console.log(e)
      this.setState({
        trendingStatus: apiConstants.failure,
      })
    }
  }

  renderFailureView = () => (
    <div>
      <IoIosWarning color="#D81F26" size={44} />
      <p>Something went wrong. Please try again</p>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderBannerLoading = () => (
    <div>
      <Header />
      <div className="banner-container" data-testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  renderBannerFailure = () => (
    <div>
      <Header />
      <div>
        <IoIosWarning color="#D81F26" size={44} />
        <p>Something went wrong. Please try again</p>
      </div>
    </div>
  )

  renderOriginalList = () => {
    const {originals} = this.state
    return (
      <div className="card-container">
        <h1 className="heading">Originals</h1>
        <Slider {...settings}>
          {originals.map(each => (
            <MovieCardItem item={each} key={each.id} />
          ))}
        </Slider>
      </div>
    )
  }

  renderTrendingList = () => {
    const {trending} = this.state
    return (
      <div className="card-container">
        <h1 className="heading">Trending Now</h1>
        <Slider {...settings}>
          {trending.map(each => (
            <MovieCardItem item={each} key={each.id} />
          ))}
        </Slider>
      </div>
    )
  }

  originalResult() {
    const {originalStatus} = this.state
    switch (originalStatus) {
      case apiConstants.success:
        return this.renderOriginalList()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  trendingResult() {
    const {trendingStatus} = this.state
    switch (trendingStatus) {
      case apiConstants.success:
        return this.renderTrendingList()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderBanner = () => {
    const {randomOriginalIndex, originals} = this.state
    const obj = originals[randomOriginalIndex]
    const {title, overview, backdropPath} = obj
    return (
      <div
        style={{backgroundImage: `url(${backdropPath})`}}
        className="home-page"
      >
        <Header isHome={isHome} />
        <div className="home-movie-page">
          <div className="text-container">
            <h1 className="text">{title}</h1>
            <p className="over-view">{overview}</p>
            <button type="button" className="play-btn">
              Play
            </button>
          </div>
        </div>
      </div>
    )
  }

  BannerResult() {
    const {originalStatus} = this.state
    switch (originalStatus) {
      case apiConstants.success:
        return this.renderBanner()
      case apiConstants.failure:
        return this.renderBannerFailure()
      case apiConstants.inProgress:
        return this.renderBannerLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        {this.BannerResult()}
        <div className="container">
          {this.trendingResult()}
          {this.originalResult()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
