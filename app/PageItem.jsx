var React = require('react');
var ElyaMenu = require('./components/ElyaMenu.jsx');
var {ElyaNavbar, ElyaFooter} = require('./components/ElyaUI.jsx');
var cssVariables = require('../sass/variables.scss').locals;
var Icon = require("./components/ElyaIcons.jsx");

class ElyaItemFull extends React.Component {
    constructor(props) {
       super(props);
    }
    render() {
        let images = this.props.item.images;
        let oneImgHeight = parseInt(cssVariables.mainContextHeight)/images.length;
        return <div className="elyaItemFull container-fluid">
            <div className="row">
                <div className="images col-12 col-lg-9">
                    <div className="row">
                        <div className="d-none d-lg-block col-lg-3 thumbs">
                            <div className="wrapper">
                                {images.map((img, idx) =>
                                    <div className="img-box" style={{maxWidth: `${oneImgHeight}vh`}}>
                                        <img src={img} alt=""/>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-12 col-lg-9 img-main">
                            <img src={images[0]} alt=""/>
                        </div>
                    </div>
                </div>
                <div className="item-info col-12 col-lg-3">
                    <h1 className="name">{this.props.item.name}</h1>
                    <h1 className="price">{this.props.item.price}</h1>
                    <h1 className="free-shiping">Free shipping</h1>
                    <button className="add-to-cart">Add to cart</button>
                    <p className="materials">{this.props.item.materials}</p>
                    <p className="handmade"><Icon.handmade/></p>
                    <p className="description">{this.props.item.description}</p>
                    <p className="package-shipping"></p>
                </div>
            </div>
            <div className="row">
                <div className="text col-12">
                    any text
                </div>
            </div>
        </div>;
    }
}

class ElyaPageItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const itemID = this.props.match.params.id;
        return <div className="elya">
            <ElyaNavbar/>
            <ElyaMenu menuItems={menuItems}/>
            <ElyaItemFull item={catalogItems.filter(item => item.name === itemID)[0]}/>
            <ElyaFooter/>
        </div>;
    }
}

module.exports = ElyaPageItem;