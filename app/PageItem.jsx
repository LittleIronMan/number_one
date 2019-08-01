var React = require('react');
var ElyaMenu = require('./components/ElyaMenu.jsx');
var {ElyaNavbar, ElyaFooter} = require('./components/ElyaUI.jsx');
var cssVariables = require('../sass/variables.scss').locals;

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
                                    <img src={img} alt="" style={{maxHeight: `${oneImgHeight}vh`}}/>
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-12 col-lg-9 img-main">
                            <img src={images[0]} alt=""/>
                        </div>
                    </div>
                </div>
                <div className="description col-12 col-lg-3">
                    description
                    Product Page for "{this.props.item.name}"
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