import {Link} from 'react-router-dom'

import './index.css'

const MovieItems = props => {
  const {eachMovie} = props
  const {backdropPath, title, id} = eachMovie

  return (
    <Link to={`/movies/${id}`}>
      <li>
        <img className="popular-img" alt={title} src={backdropPath} />
      </li>
    </Link>
  )
}

export default MovieItems
