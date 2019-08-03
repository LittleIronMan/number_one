import ReactDOM from "react-dom";
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import MainPage from "./PageMain.jsx";
import CatalogPage from "./PageCatalog.jsx";
import ItemPage from "./PageItem.jsx";

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/catalog" component={CatalogPage} />
            <Route path="/product/:id" component={ItemPage} />
            <Route component={() => <div>Not found</div>} />
        </Switch>
    </Router>,
    document.getElementById("app")
)