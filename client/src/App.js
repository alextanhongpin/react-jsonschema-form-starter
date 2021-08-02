import { Switch, Route, Link } from "react-router-dom";

import { routes } from "ports/route";
// Features.
import { CreateForm, UpdateForm } from "features/forms";
import { UserList } from "features/users";

function App() {
  return (
    <>
      <header>
        <Link to="/">Home</Link>
      </header>
      <Switch>
        <Route path="/" exact component={UserList} />
        <Route path={routes.Create} exact component={CreateForm} />
        <Route path={routes.Update} exact component={UpdateForm} />
      </Switch>
    </>
  );
}

export default App;
