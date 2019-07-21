'use strict';
var React = require('react');
var {Motion, StaggeredMotion, spring} = require('react-motion');

const MENU_BUTTON_WIDTH = 60;
const MENU_BUTTON_HEIGHT = 60;
const MENU_ITEM_WIDTH = 200;
const MENU_ITEM_HEIGHT = 60;
// Жестко заданные значения позиции главной кнопки
const M_X = 5;
const M_Y = 5;

const HIDDEN = false;
const VISIBLE = true;
const TRIGGER_DISTANCE = 30;

const SPRING_CONFIG = {stiffness: 400, damping: 28};

function getItemStyle(pos, buttonIndex, animated=true) {
    let x = M_X + ((pos === HIDDEN) ? -MENU_ITEM_WIDTH -10 : 0);
    let y = M_Y + MENU_BUTTON_HEIGHT + 10 + (MENU_ITEM_HEIGHT * buttonIndex);
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

    mainButtonStyle() {
        return {
            width: MENU_BUTTON_WIDTH,
            height: MENU_BUTTON_HEIGHT,
            left: M_X,
            top: M_Y
        };
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
                        {interpolatedStyles.map(({width, height, top, left}, index) =>
                            <div className="menu-item" key={index} style={{top, left}} >
                                {this.props.items[index]}
                            </div>
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
                             style={{...this.mainButtonStyle(), transform: `rotate(${rotate}deg)`}}>
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