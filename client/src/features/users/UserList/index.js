import { Link, generatePath } from "react-router-dom";

import { useFetchUsers } from "features/users/hooks";
import { routes } from "ports/route";

export const UserList = () => {
  const { data, loading, error } = useFetchUsers();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  const users = data?.data ?? [];

  return (
    <div>
      <h1>Users</h1>
      <Link
        to={generatePath(routes.Create, {
          formName: "users",
        })}
      >
        Create User
      </Link>

      <table className="table">
        <thead>
          {users.length && (
            <tr>
              {Object.keys(users[0]).map((name) => (
                <th key={name}>{name}</th>
              ))}
              <th>Action</th>
            </tr>
          )}
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              {Object.values(user).map((value) => (
                <td>{value}</td>
              ))}
              <td>
                <Link
                  to={generatePath(routes.Update, {
                    formName: "users",
                    entityId: user._id,
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
