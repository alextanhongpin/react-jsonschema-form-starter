import { Switch, Route, Link } from "react-router-dom";

import { routes } from "ports/route";
// Features.
import { CreateForm, UpdateForm } from "features/forms";
import { UserList } from "features/users";
import { BookList } from "features/books";

function Home() {
  return (
    <div className="container">
      <UserList />
      <BookList />
    </div>
  );
}

function App() {
  return (
    <>
      <header>
        <Link to="/">Home</Link>
      </header>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path={routes.Create} exact component={CreateForm} />
        <Route path={routes.Update} exact component={UpdateForm} />
      </Switch>
    </>
  );
}

export default App;
