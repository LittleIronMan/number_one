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

class ElyaNavbar extends React.Component {
    render() {
        return <div className="elyaNavbar">
        </div>;
    }
}
class ElyaTitle extends React.Component {
    render() {
        return <div className="elyaVideo">
            {/*Youtube video*/}
            <div className="stub-youtube"/>
            <div id="elyaVideoPlayer" className="youtube"></div>
            {/*<iframe*/}
            {/*    // width="420"*/}
            {/*    // height="315"*/}
            {/*    // src="https://www.youtube.com/embed/cpSJF2FDP2A"*/}
            {/*    // frameborder="0"*/}
            {/*    // allowfullscreen*/}
            {/*    // className="video"*/}

            {/*    id="elyaVideoPlayer"*/}
            {/*    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"*/}
            {/*    title="YouTube video player" width="640" height="360"*/}
            {/*    allowFullScreen*/}
            {/*    className="youtube"*/}
            {/*    // src="https://www.youtube.com/embed/cpSJF2FDP2A?autoplay=1&amp;controls=0&amp;rel=0&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fen.past-indicator.com&amp;widgetid=1"*/}
            {/*// чтобы видео заработало нужно будет обязательно передать в origin полный домен сайта*/}
            {/*    src="https://www.youtube.com/embed/cpSJF2FDP2A"*/}
            {/*    >*/}
            {/*</iframe>*/}
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
        <ElyaNavbar/>
        <ElyaMenu items={menuItems.items}/>
        <ElyaTitle/>
        <ElyaCatalog/>
        <ElyaFooter/>
    </div>,
    document.getElementById("app")
)