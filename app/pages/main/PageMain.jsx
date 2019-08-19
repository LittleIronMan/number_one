import {Component} from 'react';
import ElyaMenu from 'components/menu/ElyaMenu.jsx';
import {ElyaNavbar, ElyaTitleYoutube, ElyaFooter} from 'components/ui/ElyaUI.jsx';
import style from './PageMain.scss';
import page from 'styles/ElyaPage.scss';

class ElyaCatalogMini extends Component {
    render() {
        return <div className={style.elyaCatalog}>
            images Gallery
        </div>;
    }
}

class ElyaPageMain extends Component {
    render() {
        return <div className={page.elya}>
            <ElyaNavbar/>
            <ElyaMenu menuItems={menuItems}/>
            <ElyaTitleYoutube/>
            <ElyaCatalogMini/>
            <ElyaFooter/>
        </div>;
    }
}

export default ElyaPageMain;
