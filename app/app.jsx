var ReactDOM = require('react-dom');
var React = require('react');
var ItemsList = require('./components/ItemsList.jsx');

const propsValues = {
    title: "Список смартфонов",
    items: [
        "HTC U Ultra",
        "iPhone 7",
        "Google Pixel",
        "Huawei P9",
        "Meizu Pro 6",
        "Asus Zenfone 3"
    ]
};

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
        <ElyaTitle/>
        <ElyaCatalog/>
        <ElyaFooter/>
    </div>,
    document.getElementById("app")
)