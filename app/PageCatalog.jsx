var React = require('react');
var ElyaMenu = require('./components/ElyaMenu.jsx');
var {ElyaNavbar, ElyaTitleYoutube, ElyaFooter} = require('./components/ElyaUI.jsx');
var ElyaCatalogItem = require('./components/ElyaCatalogItem.jsx');

const menuItems = [
    {text: "main", path: "/"},
    {text: "catalog", path: "/catalog"},
    {text: "package", path: "/"},
    {text: "delivery", path: "/"},
    {text: "about", path: "/"}
]

const catalogItems = [
    {name: "first", price: "$100",
        images: [
            "../img/45_2.jpg",
            "../img/46_2.jpg",
            "../img/49_2.jpg",
            "../img/50_2.jpg"
        ]
    },
    {name: "second", price: "$200",
        images: [
            "../img/47_2.jpg",
            "../img/48_2.jpg",
            "../img/52_2.jpg"
        ]
    }
]

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
            <ElyaMenu items={menuItems}/>
            {/*<ElyaTitleYoutube/>*/}
            <ElyaCatalog/>
            <ElyaFooter/>
        </div>;
    }
}

module.exports = ElyaPageCatalog;