import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import MainPage from 'pages/main/PageMain.jsx';
import CatalogPage from 'pages/catalog/PageCatalog.jsx';
import ItemPage from 'pages/item/PageItem.jsx';
import 'styles/main.scss';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path='/' component={MainPage} />
            <Route path='/catalog' component={CatalogPage} />
            <Route path='/product/:id' component={ItemPage} />
            <Route component={() => <div>Not found</div>} />
        </Switch>
    </Router>,
    document.getElementById('app')
);
