import {Link} from 'react-router-dom'

import './index.css'

const MovieCardItem = props => {
  const {item} = props
  const {title, id, backdropPath} = item
  return (
    <div className="center">
      <Link to={`/movies/${id}`}>
        <img className="thumbnail-img" alt={title} src={backdropPath} />
      </Link>
    </div>
  )
}

export default MovieCardItem
