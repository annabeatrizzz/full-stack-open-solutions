import { ALL_BOOKS, ALL_GENRES } from '../queries' 
import { useQuery, useLazyQuery } from '@apollo/client/react';
import { useState, useEffect } from 'react';

const Books = (props) => {

  const [genre, setGenre] = useState(null);
  const genreOptions = useQuery(ALL_GENRES);
  const [getBooks, result] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    getBooks({ variables: { genre: null } })
  }, [])

  if (!props.show || result.loading || genreOptions.loading) {
    return null
  }

  const genres = genreOptions?.data?.allGenres || []
  const books = result?.data?.allBooks || []

  const handleGenreChange = (g) => {
    setGenre(g);
    getBooks({ variables: { genre: g } });
  };

  return (
    <div>
      <h2>books</h2>

      <p>filter by genre: {genre || "all"}</p>

      <div>
        {genres.map(g => (
          <button key={g} onClick={() => handleGenreChange(g)}>
            {g}
          </button>
        ))}
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
