'use strict';
var React = require('react');
var {Motion, spring} = require('react-motion');

const MENU_WIDTH = 200;
const MENU_ITEM_HEIGHT = 60;
// Жестко заданные значения позиции главной кнопки
const M_X = 0;
const M_Y = 0;

function initDeltaPosition(childIdx) {
    return {
        dx: -MENU_WIDTH,
        dy: MENU_ITEM_HEIGHT * (childIdx + 1),
    }
}

function finalDeltaPosition(childIdx) {
    return {
        dx: 0,
        dy: MENU_ITEM_HEIGHT * (childIdx + 1),
    }
}

function getButtonStyle(dx, dy, animated=true) {
    if (animated) {
        return {
            width: MENU_WIDTH,
            height: MENU_ITEM_HEIGHT,
            left: spring(M_X + dx),
            top: spring(M_Y + dy)
        };
    }
    else {
        return {
            width: MENU_WIDTH,
            height: MENU_ITEM_HEIGHT,
            left: M_X + dx,
            top: M_Y + dy
        };
    }
}

class ElyaMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };

        // Привязываем this к функции
        this.openMenu = this.openMenu.bind(this);
    }

    initialChildButtonStyles(childIdx) {
        let {dx, dy} = initDeltaPosition(childIdx);
        return getButtonStyle(dx, dy);
    }

    finalChildButtonStyles(childIndex) {
        let{dx, dy} = finalDeltaPosition(childIndex);
        return getButtonStyle(dx, dy);
    }

    mainButtonStyle() {
        return getButtonStyle(0, 0, false);
    }

    openMenu() {
        console.log("Open Menu Button!");
        let{isOpen} = this.state;
        this.setState({
            isOpen: !isOpen
        });
    }

    render() {
        let {isOpen} = this.state;
        console.log("Render Menu! Current \"isOpen\" state == ", isOpen);
        return (
            <div className="elya-menu">
                <div className="main-button" onClick={this.openMenu} style={this.mainButtonStyle()}>
                    <i className="fa fa-bars"/>
                </div>
                {this.props.items.map((item, index) => {
                    let style = isOpen ? this.finalChildButtonStyles(index) : this.initialChildButtonStyles(index);
                    return (
                        <Motion style={style} key={index}>
                            {({width, height, top, left}) =>
                                <div className="child-button" style={{width, height, top, left}}>
                                    {item}
                                </div>
                            }
                        </Motion>
                    );
                })}
            </div>
        );
    }
}

module.exports = ElyaMenu;