import { Switch, Route, Link } from "react-router-dom";

// Features.
import { CreateUserForm, UpdateUserForm } from "features/forms";
import { UserList } from "features/users";

function App() {
  return (
    <>
      <header>
        <Link to="/">Home</Link>
      </header>
      <Switch>
        <Route path="/" exact component={UserList} />
        <Route path="/user/create" exact component={CreateUserForm} />
        <Route path="/user/:userId/update" exact component={UpdateUserForm} />
      </Switch>
    </>
  );
}

export default App;
