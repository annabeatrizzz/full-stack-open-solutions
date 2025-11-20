import { ME, ALL_BOOKS } from '../queries' 
import { useQuery, useLazyQuery } from '@apollo/client/react';
import { useEffect } from 'react';

const RecommendedBooks = (props) => {
  const { data: meData, loading: meLoading } = useQuery(ME);
  const [getBooks, result] = useLazyQuery(ALL_BOOKS);

  const favoriteGenre = meData?.me?.favoriteGenre;
  const books = result?.data?.allBooks || []

  useEffect(() => {
    if (favoriteGenre) {
      getBooks({ variables: { genre: favoriteGenre } })
    }
  }, [favoriteGenre, getBooks])

  if (!props.show || result.loading ) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>

      <p>books in your favorite genre: {favoriteGenre}</p>

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

export default RecommendedBooks
