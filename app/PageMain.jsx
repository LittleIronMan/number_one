import React from "react";
import ElyaMenu from './components/ElyaMenu.jsx';
import {ElyaNavbar, ElyaTitleYoutube, ElyaFooter} from './components/ElyaUI.jsx';

class ElyaCatalogMini extends React.Component {
    render() {
        return <div className="elyaCatalog">
            images Gallery
        </div>;
    }
}

class ElyaPageMain extends React.Component {
    render() {
        return <div className="elya">
            <ElyaNavbar/>
            <ElyaMenu menuItems={menuItems}/>
            <ElyaTitleYoutube/>
            <ElyaCatalogMini/>
            <ElyaFooter/>
        </div>;
    }
}

export default ElyaPageMain;