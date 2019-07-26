var React = require('react');
var ElyaMenu = require('./components/ElyaMenu.jsx');
var {ElyaNavbar, ElyaTitleYoutube, ElyaFooter} = require('./components/ElyaUI.jsx');
var ElyaCatalogItem = require('./components/ElyaCatalogItem.jsx');

class ElyaCatalog extends React.Component {
    render() {
        return <div className="elyaCatalogWrapper">
            <div className="container-fluid">
                images Gallery
                <div className="row">
                {catalogItems.map((item, index) =>
                    <ElyaCatalogItem item={item}/>
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

module.exports = ElyaPageCatalog;