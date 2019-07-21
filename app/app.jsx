var ReactDOM = require('react-dom');
var React = require('react');
var ElyaMenu = require('./components/ElyaMenu.jsx');

const menuItems = {
    items: [
        "main",
        "catalog",
        "package",
        "delivery",
        "about"
    ]
}

class ElyaTitle extends React.Component {
    render() {
        return <div className="elyaVideoContainer">
            {/*Youtube video*/}
            <iframe
                width="420"
                height="315"
                src="https://www.youtube.com/embed/cpSJF2FDP2A"
                frameborder="0"
                allowfullscreen
                className="video">
            </iframe>
        </div>;
    }
}
class ElyaCatalog extends React.Component {
    render() {
        return <div className="elyaCatalog">
            images Gallery
        </div>;
    }
}
class ElyaFooter extends React.Component {
    render() {
        return <div className="elyaFooter">
            Users feedbacks and comments
        </div>;
    }
}
ReactDOM.render(
    <div className="elya">
        <ElyaMenu items={menuItems.items}/>
        <ElyaTitle/>
        <ElyaCatalog/>
        <ElyaFooter/>
    </div>,
    document.getElementById("app")
)