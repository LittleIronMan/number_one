'use strict';
import React from "react";
import {Motion, StaggeredMotion, spring} from 'react-motion';
import {Link} from "react-router-dom";
import Icon from "./ElyaIcons.jsx";
import cssVariables from "../vars.scss";
import style from "./ElyaMenu.scss";

const M_X = parseFloat(cssVariables.menuBtnLeft);//em
const M_Y = parseFloat(cssVariables.menuBtnTop);
const MENU_BUTTON_HEIGHT = parseFloat(cssVariables.menuBtnHeight);
const MENU_ITEM_HEIGHT = parseFloat(cssVariables.menuItemHeight);

const MENU_ITEM_WIDTH = 7;
const TRIGGER_DISTANCE = 0.7;

const HIDDEN = false;
const VISIBLE = true;

const SPRING_CONFIG = {stiffness: 80, damping: 18};

function getItemStyle(pos, buttonIndex, animated=true) {
    let x = M_X + ((pos === HIDDEN) ? -MENU_ITEM_WIDTH : 0);
    let y = M_Y + MENU_BUTTON_HEIGHT + (MENU_ITEM_HEIGHT * buttonIndex) + 0.5; //em
    return {
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
        const itemsTargetStyles = this.props.menuItems.map((item, i) => {
            return getItemStyle(currentPos, i, false);
        });

        // Здесь определяем анимированные целевые стили для кнопок.
        // По-сути это те-же стили, только в них изменяемые величины обернуты в функцию spring()
        const itemsTargetStylesSpring = this.props.menuItems.map((item, i) => {
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
                                const item = this.props.menuItems[index];
                                return <div className={style.menuItem}
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
            <div className={style.elyaMenu}>
                <Motion style={mainButtonRotation}>
                    {({rotate}) =>
                        <div className={style.menuButton} onClick={this.toggleMenu}
                             style={{transform: `rotate(${rotate}deg)`}}>
                            <Icon.hamburger className={style.icon}/>
                        </div>
                    }
                </Motion>
                {this.renderItems()}
            </div>
        );
    }
}

export default ElyaMenu;
