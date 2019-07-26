var React = require('react');
var ElyaMenu = require('./components/ElyaMenu.jsx');
var {ElyaNavbar, ElyaTitleYoutube, ElyaFooter} = require('./components/ElyaUI.jsx');

class ElyaCatalogMini extends React.Component {
    render() {
        return <div className="elyaCatalog">
            images Gallery
        </div>;
    }
}

class ElyaPageMain extends React.Component {
    render() {
        return <div className="elya">
            <ElyaNavbar/>
            <ElyaMenu items={menuItems}/>
            <ElyaTitleYoutube/>
            <ElyaCatalogMini/>
            <ElyaFooter/>
        </div>;
    }
}

module.exports = ElyaPageMain;