import { Link, generatePath } from "react-router-dom";

import { useFetchBooks } from "features/books/hooks";
import { routes } from "ports/route";

export const BookList = () => {
  const { data, loading, error } = useFetchBooks();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  const books = data?.data ?? [];

  return (
    <div>
      <h1>Books</h1>
      <Link
        to={generatePath(routes.Create, {
          formName: "books",
        })}
      >
        Create Book
      </Link>

      <table className="table">
        <thead>
          {books.length && (
            <tr>
              {Object.keys(books[0]).map((name) => (
                <th key={name}>{name}</th>
              ))}
              <th>Action</th>
            </tr>
          )}
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              {Object.values(book).map((value) => (
                <td>{value}</td>
              ))}
              <td>
                <Link
                  to={generatePath(routes.Update, {
                    formName: "books",
                    entityId: book._id,
                  })}
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
