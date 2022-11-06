import './index.css'

const SimilarMovies = props => {
  const {eachMovie} = props
  const {backdropPath, title} = eachMovie

  return <img className="similar-movies-img" alt={title} src={backdropPath} />
}

export default SimilarMovies
