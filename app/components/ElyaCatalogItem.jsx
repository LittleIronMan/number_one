'use strict';
var React = require('react');
var {Redirect} = require('react-router-dom');

class ElyaCatalogItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedImage: 0, redirect: false}; // по-умолчанию показывается первое изображение
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        // some action...
        // then redirect
        this.setState({redirect: true});
    };
    render() {
        if (this.state.redirect) {
            return <Redirect push to={`/product/${this.props.item.name}`} />;
        }
        else {
            let images = this.props.item.images;
            let id = this.props.item.name;
            let focusWidth = 100 / images.length;
            return <div className="elyaCatalogItem col-6 col-lg-4">
                <div className="context">
                    <div className="img-container" onClick={this.onClick}>
                        {images.map((img, index) =>
                            <div className="img" id={id + index} style={{
                                backgroundImage: `url("${img}")`,
                                //selectedImage будет отрисовываться поверх других изображений
                                zIndex: `${index === this.state.selectedImage ? 10 : 1}`
                            }}
                            />)}
                        {images.map((img, index) =>
                            <div className={`focus-capture${index === this.state.selectedImage ? " active" : ""}`}
                                 style={{width: `${focusWidth}%`, left: `${focusWidth * index}%`}}
                                 onMouseOver={() => {
                                     this.setState({selectedImage: index});
                                 }}
                            />)}
                    </div>

                    <hr/>
                    <div className="footer">
                        <button>
                            купить
                        </button>
                        <div className="price">
                            {this.props.item.price}
                        </div>
                    </div>
                </div>
            </div>;
        }
    }
}
module.exports = ElyaCatalogItem;