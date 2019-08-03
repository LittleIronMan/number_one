import React from 'react';
import ElyaMenu from './components/ElyaMenu.jsx';
import {ElyaNavbar, ElyaFooter} from './components/ElyaUI.jsx';
import {locals as cssVariables} from '../sass/variables.scss';
import Icon from "./components/ElyaIcons.jsx";

class ElyaItemFull extends React.Component {
    constructor(props) {
       super(props);
    }
    render() {
        let images = this.props.item.images;
        let oneImgHeight = parseFloat(cssVariables.mainContextHeight)/images.length;
        return <div className="elyaItemFull container">
            <div className="row">
                <div className="images col-12 col-lg-8">
                    <div className="row">
                        <div className="d-none d-lg-block col-lg-2 thumbs">
                            <div className="wrapper-center" style={{width: `${oneImgHeight}vh`}}>
                                <div className="wrapper-flex">
                                    {images.map((img, idx) =>
                                        <div className="img-box" style={{maxWidth: `${oneImgHeight}vh`}}>
                                            <img src={img} alt=""/>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-10 img-main">
                            <img src={images[0]} alt=""/>
                        </div>
                    </div>
                </div>
                <div className="item-info col-12 col-lg-4">
                    <h1 className="name">{this.props.item.name}</h1>
                    <h1 className="price">{this.props.item.price}</h1>
                    <p className="free-shipping">
                        <p className="right-align">Free shipping</p>
                    </p>
                    <button className="add-to-cart">Add to cart</button>
                    <ul className="materials">
                        Materials:
                        {this.props.item.materials.map(material =>
                            <li>{material}</li>
                        )}
                    </ul>
                    <hr/>
                    <p className="description">{this.props.item.description}</p>
                    <div className="handmade"><Icon.handmade2/><h1 className="label">100% Handmade</h1></div>
                    {/*<p className="package-shipping"></p>*/}
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
            <ElyaItemFull item={catalogItems.filter(item => item.name.toLowerCase() === itemID.toLowerCase())[0]}/>
            <ElyaFooter/>
        </div>;
    }
}

export default ElyaPageItem;