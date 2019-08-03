import React from 'react';
import ElyaMenu from './components/ElyaMenu.jsx';
import {ElyaNavbar, ElyaFooter} from './components/ElyaUI.jsx';
import cssVariables from "./vars.scss";
import Icon from "./components/ElyaIcons.jsx";

import style from "./PageItem.scss";
import page from "./ElyaPage.scss";

class ElyaItemFull extends React.Component {
    constructor(props) {
       super(props);
    }
    render() {
        let images = this.props.item.images;
        let oneImgHeight = parseFloat(cssVariables.mainContextHeight)/images.length;
        return <div className={style.elyaItemFull + " container"}>
            <div className="row">
                <div className={style.images + " col-12 col-lg-8"}>
                    <div className="row">
                        <div className={"d-none d-lg-block col-lg-2 " + style.thumbs}>
                            <div className={style.wrapperCenter} style={{width: `${oneImgHeight}vh`}}>
                                <div className={style.wrapperFlex}>
                                    {images.map((img, idx) =>
                                        <div className={style.imgBox} style={{maxWidth: `${oneImgHeight}vh`}}>
                                            <img src={img} alt=""/>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={"col-12 col-lg-10 " + style.imgMain}>
                            <img src={images[0]} alt=""/>
                        </div>
                    </div>
                </div>
                <div className={style.itemInfo + " col-12 col-lg-4"}>
                    <h1 className={style.name}>{this.props.item.name}</h1>
                    <h1 className={style.price}>{this.props.item.price}</h1>
                    <p className={style.freeShipping}>
                        <p className={style.rightAlign}>Free shipping</p>
                    </p>
                    <button className={style.addToCart}>Add to cart</button>
                    <ul className={style.materials}>
                        Materials:
                        {this.props.item.materials.map(material =>
                            <li>{material}</li>
                        )}
                    </ul>
                    <hr/>
                    <p className={style.description}>{this.props.item.description}</p>
                    <div className={style.handmade}><Icon.handmade2 className={style.icon}/><h1 className="label">100% Handmade</h1></div>
                    {/*<p className="package-shipping"></p>*/}
                </div>
            </div>
            <div className="row">
                <div className={style.text + " col-12"}>
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
        return <div className={page.elya}>
            <ElyaNavbar/>
            <ElyaMenu menuItems={menuItems}/>
            <ElyaItemFull item={catalogItems.filter(item => item.name.toLowerCase() === itemID.toLowerCase())[0]}/>
            <ElyaFooter/>
        </div>;
    }
}

export default ElyaPageItem;