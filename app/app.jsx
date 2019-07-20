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

ReactDOM.render(
    <div className="elya container-fluid">
        <nav>
            <button>logo</button>
            <button>main</button>
            <button>catalog</button>
            <button>about</button>
        </nav>
        <div className="row">
            <div className="title col-12">
                {/*Youtube video*/}
                <iframe width="420" height="315"
                        src="https://www.youtube.com/embed/i9OVmXQDZH0">
                </iframe>
            </div>
            <div className="info col-12">
                images Gallery
            </div>
            <div className="feedbacks col-12">
                Users feedbacks and comments
            </div>
        </div>
    </div>,
    document.getElementById("app")
)