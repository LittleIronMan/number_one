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
        if (this.state.redirect) {
            return <Redirect push to={`/product/${this.props.item.name}`} />;
        }
        else {
            let images = this.props.item.images;
            let id = this.props.item.name;
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
                        <Motion style={{selectedImgSpring: spring(this.state.selectedImage)}}>
                            {({selectedImgSpring}) =>
                                <div className="img-container" onClick={this.onClick} onMouseDown={this.onMouseDown}
                                    onMouseOver={() => this.setState({...this.state, showSliderArrows: true})}
                                    onMouseLeave={() => this.setState({...this.state, showSliderArrows: false})}
                                >
                                    {/*Непосредсвенно сами изображения, стоят бок-о-бок, в зоне видимости только selectedImage*/}
                                    {images.map((img, index) =>
                                        <div className="img" id={id + index} style={{
                                            backgroundImage: `url("${img}")`,
                                            left: `${(index - selectedImgSpring) * 100}%`
                                        }}
                                        />
                                    )}

                                    {/*Стрелки для переключения слайдов*/}
                                    <CSSTransition
                                        in={this.state.showSliderArrows}
                                        // unmountOnExit="true"
                                        timeout={300}
                                        classNames="slider-arrows"
                                    >
                                        {/* Стрелки будут отображаться только на десктопах и только при наведении указателя мыши на слайдер. */}
                                        <div className="slider-arrows">
                                            {sliderArrows.map((dir) =>
                                                <div className={`arrow ${dir}`}
                                                     onTouchStart = {() => {
                                                         // при обнаружении касания пальцем(что означает использование мобильного устройства) -
                                                         // - делаем стрелки невидимыми.
                                                         console.log("Mobile touch detected");
                                                         let arr = document.getElementsByClassName("slider-arrows");
                                                         for (let i = 0; i < arr.length; i++)
                                                             arr[i].className += " mobile";
                                                     }}
                                                     onClick={(e) => {
                                                         // при клике на стрелку меняем слайд
                                                         if (this.state.showSliderArrows) {
                                                             this.switchImg(dir === "left"? -1: 1);
                                                             e.stopPropagation();
                                                         }
                                                     }}
                                                >
                                                    <div className="for-icon">
                                                        <i className={`icon fa fa-arrow-${dir} fa-fw`}></i>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </CSSTransition>

                                    {/*Полоски(точки) слайдера - показывают сколько всего изображений, и которое из них сейчас выделено*/}
                                    <div className="slider-dots">
                                        {images.map((img, idx) =>
                                            <div className={`dot${idx === this.state.selectedImage ? " active" : ""}`}/>
                                        )}
                                    </div>
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