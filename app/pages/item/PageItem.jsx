import {Component} from 'react';
import ElyaMenu from 'components/menu/ElyaMenu.jsx';
import {ElyaNavbar, ElyaFooter} from 'components/ui/ElyaUI.jsx';
import cssVariables from 'styles/vars.scss';
import Icon from 'components/icons/ElyaIcons.jsx';

import style from './PageItem.scss';
import page from 'styles/ElyaPage.scss';

class ElyaItemFull extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {images, name, price, materials, description} = this.props.item;
        const oneImgHeight = parseFloat(cssVariables.mainContextHeight)/images.length;
        return <div className={style.elyaItemFull + ' container'}>
            <div className='row'>
                <div className={style.images + ' col-12 col-lg-8'}>
                    <div className='row'>
                        <div className={'d-none d-lg-block col-lg-2 ' + style.thumbs}>
                            <div className={style.wrapperCenter} style={{width: `${oneImgHeight}vh`}}>
                                <div className={style.wrapperFlex}>
                                    {images.map((img, idx) =>
                                        <div key={idx} className={style.imgBox} style={{maxWidth: `${oneImgHeight}vh`}}>
                                            <img src={img} alt=''/>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={'col-12 col-lg-10 ' + style.imgMain}>
                            <img src={images[0]} alt=''/>
                        </div>
                    </div>
                </div>
                <div className={style.itemInfo + ' col-12 col-lg-4'}>
                    <h1 className={style.name}>{name}</h1>
                    <h1 className={style.price}>{price}</h1>
                    <div className={style.freeShipping}>
                        <p className={style.rightAlign}>Free shipping</p>
                    </div>
                    <button className={style.addToCart}>Add to cart</button>
                    <ul className={style.materials}>
                        Materials:
                        {materials.map((material, idx) =>
                            <li key={idx}>{material}</li>
                        )}
                    </ul>
                    <hr/>
                    <p className={style.description}>
                        {description}
                    </p>
                    <div className={style.handmade}>
                        <Icon.handmade2 className={style.icon}/>
                        <h1 className='label'>100% Handmade</h1>
                    </div>
                    {/* <p className='package-shipping'></p>*/}
                </div>
            </div>
            <div className='row'>
                <div className={style.text + ' col-12'}>
                    any text
                </div>
            </div>
        </div>;
    }
}

class ElyaPageItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const itemID = this.props.match.params.id;
        const item = catalogItems.find((item) => item.name.toLowerCase() === itemID.toLowerCase());
        return <div className={page.elya}>
            <ElyaNavbar/>
            <ElyaMenu menuItems={menuItems}/>
            <ElyaItemFull item={item}/>
            <ElyaFooter/>
        </div>;
    }
}

export default ElyaPageItem;
