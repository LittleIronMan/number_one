'use strict';
import React from 'react';
import {Redirect} from 'react-router-dom';
import {Motion, spring} from 'react-motion';
import {Swipeable} from 'react-swipeable';
import {CSSTransition} from 'react-transition-group';
import Icon from './ElyaIcons.jsx';

class SliderImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedImage: 0};
    }
    render() {
        let name = this.props.name;
        return <Motion style={{selectedImgSpring: spring(this.state.selectedImage)}}>
            {({selectedImgSpring}) =>
                <div className="slider-img" key="img-box">
                    {this.props.images.map((img, index) =>
                        <img className="img" src={`./${img}`} style={{ left: `${(index - selectedImgSpring) * 100}%` }} key={"img" + name + index}/>
                    )}
                </div>}
        </Motion>
    }
}

class SliderDots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedImage: 0};
    }
    render() {
        return <div className="slider-dots">
            {this.props.images.map((img, idx) =>
                <div key={"dot" + idx} className={`dot${idx === this.state.selectedImage ? " active" : ""}`}/>
            )}
        </div>
    }
}

class SliderArrows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showSliderArrows: false};
    }
    render() {
        const sliderArrows = ["left", "right"];
        return <CSSTransition
            in={this.state.showSliderArrows}
            // unmountOnExit="true"
            timeout={300}
            classNames="slider-arrows"
            onMouseOver={() => this.setState({showSliderArrows: true})}
            onMouseLeave={() => this.setState({showSliderArrows: false})}
        >
            {/* Стрелки будут отображаться только на десктопах и только при наведении указателя мыши на слайдер. */}
            <div className="slider-arrows">
                {sliderArrows.map((dir) =>
                    <div key={"arrow_" + dir} className={"arrow " + dir}
                         onTouchStart={() => {
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
                                 this.props.switchImg(dir === "left" ? -1 : 1);
                                 e.stopPropagation();
                             }
                         }}
                    >
                        <Icon.left mirror={dir === "right" ? "true" : undefined}/>
                    </div>
                )}
            </div>
        </CSSTransition>
    }
}

class ElyaCatalogItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {redirect: false}; // по-умолчанию показывается первое изображение
        this.onClick = this.onClick.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);

        this.setSliderImages = this.setSliderImages.bind(this);
        this.setSliderDots = this.setSliderDots.bind(this);
    }

    setSliderImages(e) { this._sliderImages = e; }
    setSliderDots(e) { this._sliderDots = e; }

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
        let newIdx = this._sliderImages.state.selectedImage + dir;
        let last = this.props.item.images.length - 1;
        if (newIdx > last) { newIdx = 0; }
        else if (newIdx < 0) { newIdx = last; }
        this._sliderImages.setState({selectedImage: newIdx});
        this._sliderDots.setState({selectedImage: newIdx});
        console.log("Switch img ", newIdx);
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
            return <div className="elyaCatalogItem col-6 col-lg-4">
                <div className="context">
                    <div className="slider" onMouseDown={this.onMouseDown} onClick={this.onClick}>
                        <Swipeable {...swipeConfig} className="slider-swipeable">
                            {/*Непосредсвенно сами изображения, стоят бок-о-бок, в зоне видимости только selectedImage*/}
                            <SliderImages name={id} images={images} ref={this.setSliderImages}/>
                            {/*Стрелки для переключения слайдов*/}
                            <SliderArrows switchImg={(dir) => this.switchImg(dir)}/>
                        </Swipeable>
                        {/*Полоски(точки) слайдера - показывают сколько всего изображений, и которое из них сейчас выделено*/}
                        <SliderDots images={images} ref={this.setSliderDots}/>
                    </div>

                    <hr/>
                    <div className="footer">
                        <button onClick={(e) => this.setState({redirect: true})}>
                            Details
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
export default ElyaCatalogItem;