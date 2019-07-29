'use strict';
var React = require('react');
var {Redirect} = require('react-router-dom');
var {Motion, spring} = require('react-motion');
var {Swipeable} = require('react-swipeable');
var CSSTransition = require('react-transition-group').CSSTransition;

// var styles = require('../../stylesheets/screen.css');

class ElyaCatalogItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedImage: 0, redirect: false, showSliderArrows: false}; // по-умолчанию показывается первое изображение
        this.onClick = this.onClick.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
    }
    onMouseDown(event) {
        this.x = event.screenX;
    }
    onClick(event) {
        let dist = Math.abs(this.x - event.screenX);
        if (dist > 10) {
            // ignore
        }
        else {
            this.setState({redirect: true}); // then redirect
        }
        this.x = 0;
    };
    switchImg(dir) {
        let newIdx = this.state.selectedImage + dir;
        let last = this.props.item.images.length - 1;
        if (newIdx > last) { newIdx = 0; }
        else if (newIdx < 0) { newIdx = last; }
        this.setState({...this.state, selectedImage: newIdx});
    }
    render() {
        console.log("Render item, showSliderArrows = ", this.state.showSliderArrows);
        if (this.state.redirect) {
            return <Redirect push to={`/product/${this.props.item.name}`} />;
        }
        else {
            let images = this.props.item.images;
            let id = this.props.item.name;
            let sliderState = {
                selectedImgSpring: spring(this.state.selectedImage)
            }
            const swipeConfig = {
                onSwipedLeft: (eventData) => this.switchImg(1),
                onSwipedRight: (eventData) => this.switchImg(-1),
                preventDefaultTouchmoveEvent: true,
                trackMouse: true
            };
            const sliderArrows = ["left", "right"];
            return <div className="elyaCatalogItem col-6 col-lg-4">
                <div className="context">
                    <Swipeable {...swipeConfig}>
                        <Motion style={sliderState}>
                            {({selectedImgSpring}) =>
                                    <div className="img-container" onClick={this.onClick} onMouseDown={this.onMouseDown}
                                        onMouseOver={() => { console.log("onMouseOver"); this.setState({...this.state, showSliderArrows: true})}}
                                        onMouseLeave={() => { console.log("onMouseLeave"); this.setState({...this.state, showSliderArrows: false})}}
                                    >
                                        {images.map((img, index) =>
                                            <div className="img" id={id + index} style={{
                                                backgroundImage: `url("${img}")`,
                                                //selectedImage будет отрисовываться поверх других изображений
                                                // zIndex: `${index === this.state.selectedImage ? 10 : 1}`,
                                                left: `${(index - selectedImgSpring) * 100}%`
                                            }}
                                            />
                                        )}
                                        <CSSTransition
                                            in={this.state.showSliderArrows}
                                            // unmountOnExit="true"
                                            timeout={300}
                                            classNames="slider-arrows"
                                        >
                                            <div className="slider-arrows">
                                                {sliderArrows.map((dir) =>
                                                    <div className={`arrow ${dir}`}
                                                         onClick={(e) => {
                                                             if (this.state.showSliderArrows) {
                                                                 this.switchImg(-1);
                                                                 e.stopPropagation();
                                                             }
                                                         }}
                                                    >
                                                        <i className={`icon fa fa-arrow-${dir} fa-fw`}></i>
                                                    </div>
                                                )}
                                            </div>
                                        </CSSTransition>
                                    </div>
                            }
                        </Motion>
                    </Swipeable>

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