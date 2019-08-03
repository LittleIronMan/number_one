import React from 'react';
import ElyaMenu from './components/ElyaMenu.jsx';
import {ElyaNavbar, ElyaTitleYoutube, ElyaFooter} from './components/ElyaUI.jsx';
import ElyaCatalogItem from './components/ElyaCatalogItem.jsx';

class ElyaCatalog extends React.Component {
    render() {
        return <div className="elyaCatalogWrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="catalog-title col-12"> CATALOG </div>
                </div>
                <div className="row">
                {catalogItems.map((item, index) =>
                    <ElyaCatalogItem item={item} key={item.name}/>
                )}
                </div>
            </div>
        </div>;
    }
}

class ElyaPageCatalog extends React.Component {
    render() {
        return <div className="elya">
            <ElyaNavbar/>
            <ElyaMenu menuItems={menuItems}/>
            {/*<ElyaTitleYoutube/>*/}
            <ElyaCatalog/>
            <ElyaFooter/>
        </div>;
    }
}

export default ElyaPageCatalog;