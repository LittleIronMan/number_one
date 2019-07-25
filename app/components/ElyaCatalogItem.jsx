'use strict';
var React = require('react');

class ElyaCatalogItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedImage: 0}; // по-умолчанию показывается первое изображение
    }
    render() {
        let images = this.props.item.images;
        let id = this.props.item.name;
        let focusWidth = 100/images.length;
        return <div className="elyaCatalogItem col-6 col-lg-4">
            <div className="context">
                <div className="img-container">
                {
                    // несколько изображений накладываются друг на друга,
                    // выше всех самое первое изображение, остальные в порядке убывания
                    images.map((img, index) =>
                        <div>
                            <div className="img" id={id + index} style={{backgroundImage: `url("${img}")`,
                                //selectedImage будет отрисовываться поверх других изображений
                                zIndex: `${index === this.state.selectedImage ? 10 : 1}`}}/>
                            <div className={`focus-capture${index === this.state.selectedImage ? " active" : ""}`}
                                 style={{width: `${focusWidth}%`, left: `${focusWidth * index}%`}}
                                 onMouseOver={()=> {
                                     this.setState({selectedImage: index});
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
            </div>
        </div>;
    }
}
module.exports = ElyaCatalogItem;