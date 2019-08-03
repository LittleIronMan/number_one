import React from "react";
import ElyaMenu from './components/ElyaMenu.jsx';
import {ElyaNavbar, ElyaTitleYoutube, ElyaFooter} from './components/ElyaUI.jsx';
import style from "./PageMain.scss";

class ElyaCatalogMini extends React.Component {
    render() {
        return <div className={style.elyaCatalog}>
            images Gallery
        </div>;
    }
}

class ElyaPageMain extends React.Component {
    render() {
        return <div className={style.elya}>
            <ElyaNavbar/>
            <ElyaMenu menuItems={menuItems}/>
            <ElyaTitleYoutube/>
            <ElyaCatalogMini/>
            <ElyaFooter/>
        </div>;
    }
}

export default ElyaPageMain;