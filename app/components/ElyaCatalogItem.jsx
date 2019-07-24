'use strict';
var React = require('react');

class ElyaCatalogItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let images = this.props.item.images;
        let id = this.props.item.name;
        let focusWidth = 100/images.length;
        return <div className="elyaCatalogItem">
            <div className="img-container">
            {
                // несколько изображений накладываются друг на друга,
                // выше всех самое первое изображение, остальные в порядке убывания
                images.map((img, index) =>
                    <div>
                        <div className="img" id={id + index} style={{backgroundImage: `url("${img}")`, zIndex: `${images.length - index}`}}/>
                        <div className="focus-capture" style={{width: `${focusWidth}%`, left: `${focusWidth * index}%`}}
                             onMouseOver={()=> {
                                 // когда курсор попадает на зону прямоугольника -
                                 // поднимаем соответствующую картинку над остальными
                                 document.getElementById(id + index).style.zIndex = 10;
                             }}
                             onMouseLeave={()=> {
                                 // когда курсор выходит из зоны - устанавливаем соответствую картинку в порядке по умолчанию
                                 document.getElementById(id + index).style.zIndex = images.length - index;
                             }}
                        />
                    </div>
            )}
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
        </div>;
    }
}
module.exports = ElyaCatalogItem;