'use strict';
var React = require('react');

class ElyaCatalogItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let images = this.props.item.images;
        let focusWidth = 100/images.length;
        return <div className="elyaCatalogItem">
            <div className="img-container">
            {
                // несколько изображений накладываются друг на друга,
                // выше всех самое первое изображение, остальные в порядке убывания
                images.map((img, index) =>
                    <div>
                        <div className="img" style={{backgroundImage: `url("${img}")`, zIndex: `${images.length - index}`}}/>
                        <div className="focus-capture" style={{width: `${focusWidth}%`, left: `${focusWidth * index}%`}} />
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