var React = require('react');
var ElyaMenu = require('./components/ElyaMenu.jsx');
var {ElyaNavbar, ElyaFooter} = require('./components/ElyaUI.jsx');
var cssVariables = require('../sass/variables.scss').locals;

class ElyaItemFull extends React.Component {
    constructor(props) {
       super(props);
    }
    render() {
        return <div className="elyaItemFull">
            Product Page for "{this.props.item}"
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
            <ElyaItemFull item={itemID}/>
            <ElyaFooter/>
        </div>;
    }
}

module.exports = ElyaPageItem;