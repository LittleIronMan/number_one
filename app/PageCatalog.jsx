var React = require('react');
var ElyaMenu = require('./components/ElyaMenu.jsx');
var {ElyaNavbar, ElyaTitleYoutube, ElyaFooter} = require('./components/ElyaUI.jsx');

const menuItems = [
    {text: "main", path: "/"},
    {text: "catalog", path: "/catalog"},
    {text: "package", path: "/"},
    {text: "delivery", path: "/"},
    {text: "about", path: "/"}
]

class ElyaCatalog extends React.Component {
    render() {
        return <div className="elyaCatalog">
            images Gallery
        </div>;
    }
}

class ElyaPageCatalog extends React.Component {
    render() {
        return <div className="elya">
            <ElyaNavbar/>
            <ElyaMenu items={menuItems}/>
            {/*<ElyaTitleYoutube/>*/}
            <ElyaCatalog/>
            <ElyaFooter/>
        </div>;
    }
}

module.exports = ElyaPageCatalog;