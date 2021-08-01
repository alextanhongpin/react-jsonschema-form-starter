import { Link, generatePath } from "react-router-dom";

import { useFetchUsers } from "features/users/hooks";

export const UserList = () => {
  const { data, loading, error } = useFetchUsers();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  const users = data?.data ?? [];

  return (
    <div>
      <h1>Users</h1>
      <Link to="/user/create">Create User</Link>

      <div>
        {users.map((user) => (
          <div key={user._id}>
            <span>
              {user.firstName} {user.lastName}
            </span>
            <Link
              to={generatePath("/user/:id/update", {
                id: user._id,
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
