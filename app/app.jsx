var ReactDOM = require('react-dom');
var React = require('react');
const Router = require("react-router-dom").BrowserRouter;
const Route = require("react-router-dom").Route;
const Switch = require("react-router-dom").Switch;

var MainPage = require('./PageMain.jsx');
var CatalogPage = require('./PageCatalog.jsx');

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/catalog" component={CatalogPage} />
            <Route component={() => <div>Not found</div>} />
        </Switch>
    </Router>,
    document.getElementById("app")
)