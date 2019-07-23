'use strict';
var React = require('react');
var {Motion, StaggeredMotion, spring} = require('react-motion');
const Link = require("react-router-dom").Link;

// Эти данные заданы в css, скопируй их оттуда
const M_X = 0.5;
const M_Y = 0.5;
const MENU_BUTTON_HEIGHT = 2;//em
const MENU_ITEM_HEIGHT = 2;

const MENU_ITEM_WIDTH = 7;
const TRIGGER_DISTANCE = 2;

const HIDDEN = false;
const VISIBLE = true;

const SPRING_CONFIG = {stiffness: 400, damping: 25};

function getItemStyle(pos, buttonIndex, animated=true) {
    let x = M_X + ((pos === HIDDEN) ? -MENU_ITEM_WIDTH : 0);
    let y = M_Y + MENU_BUTTON_HEIGHT + (MENU_ITEM_HEIGHT * buttonIndex) + 0.5; //em
    return {
        //width: MENU_ITEM_WIDTH,
        //height: MENU_ITEM_HEIGHT,
        left: animated ? spring(x, SPRING_CONFIG) : x,
        top: y
    };
}

class ElyaMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstRender: true,
            targetPos: HIDDEN
        };

        // Привязываем this к функции
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        console.log("Toggle Menu Button!");
        let{targetPos} = this.state;
        this.setState({
            firstRender: false,
            targetPos: !targetPos
        });
    }

    renderItems() {
        const {targetPos, firstRender} = this.state;
        let currentPos = firstRender ? HIDDEN : (!targetPos);
        let newPos = firstRender ? HIDDEN : targetPos;
        // Определяем целевые стили для кнопок. Эти стили не анимированные, а фиксированные.
        // Т.е. если меню открыто, то целевым стилем для них будет скрытая позиция за пределами экрана.
        // И наоборот, если меню скрыто, то целевым стилем для них будет видимая позиция в верхней-правой части экрана.
        const itemsTargetStyles = this.props.items.map((item, i) => {
            return getItemStyle(currentPos, i, false);
        });

        // Здесь определяем анимированные целевые стили для кнопок.
        // По-сути это те-же стили, только в них изменяемые величины обернуты в функцию spring()
        const itemsTargetStylesSpring = this.props.items.map((item, i) => {
            return getItemStyle(newPos, i, true);
        });

        const mostLeftPos = getItemStyle(HIDDEN, 0, false).left;
        const mostRightPos = getItemStyle(VISIBLE, 0, false).left;

        let calculateStylesForNextFrame = prevFrameItemsStyles => {
            let nextFrameTargetStyles = prevFrameItemsStyles.map((itemStyleInPreviousFrame, i) => {
                // движение для первой кнопки будет включаться сразу после изменения состояния
                if (i === 0) {
                    return itemsTargetStylesSpring[i];
                }

                // Каждая из остальных кнопок дожидается пока предыдущая кнопка
                // преодолеет определенную дистанцию, чтобы начать свое движение.
                const itemPrevPos = prevFrameItemsStyles[i - 1].left;
                const shouldApplyTargetStyle = () => {
                    return (newPos === HIDDEN) ?
                        itemPrevPos <= mostRightPos - TRIGGER_DISTANCE:
                        itemPrevPos >= mostLeftPos + TRIGGER_DISTANCE;
                };

                return shouldApplyTargetStyle() ? itemsTargetStylesSpring[i] : itemStyleInPreviousFrame;
            });

            return nextFrameTargetStyles;
        };

        return(
            <StaggeredMotion defaultStyles={itemsTargetStyles} styles={calculateStylesForNextFrame}>
                {interpolatedStyles =>
                    <div>
                        {interpolatedStyles.map(({width, height, top, left}, index) => {
                                const item = this.props.items[index];
                                return <div className="menu-item"
                                            key={index}
                                            style={{top: `${top}em`, left: `${left}em`}}>
                                    <Link to={item.path}>{item.text}</Link>
                                </div>
                            }
                        )}
                    </div>
                }
            </StaggeredMotion>
        );
    }

    render() {
        let {targetPos, firstRender} = this.state;
        let mainButtonRotation;
        if (firstRender) { mainButtonRotation = {rotate: 0}}
        else {
            mainButtonRotation =
                targetPos === HIDDEN ?
                    {rotate: spring(0, SPRING_CONFIG)} :
                    {rotate: spring(-180, SPRING_CONFIG)};
        }
        return (
            <div className="elya-menu">
                <Motion style={mainButtonRotation}>
                    {({rotate}) =>
                        <div className="menu-button" onClick={this.toggleMenu}
                             style={{transform: `rotate(${rotate}deg)`}}>
                            <i className="fa fa-bars"/>
                        </div>
                    }
                </Motion>
                {this.renderItems()}
            </div>
        );
    }
}

module.exports = ElyaMenu;