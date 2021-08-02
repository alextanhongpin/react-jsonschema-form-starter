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

      <div>
        {users.map((user) => (
          <div key={user._id}>
            <span>
              {user.firstName} {user.lastName}
            </span>
            <Link
              to={generatePath(routes.Update, {
                formName: "users",
                entityId: user._id,
              })}
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
