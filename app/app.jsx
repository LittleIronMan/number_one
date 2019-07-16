var ReactDOM = require('react-dom');
var React = require('react');
var ItemsList = require('./components/ItemsList.jsx');

const propsValues = {
    title: "Список смартфонов",
    items: [
        "HTC U Ultra",
        "iPhone 7",
        "Google Pixel",
        "Huawei P9",
        "Meizu Pro 6",
        "Asus Zenfone 3"
    ]
};

ReactDOM.render(
    <div className="SuperWrapper">

        <div className="SuperHeader">
            {/*<div className="SuperHeaderLogo">Elya Boz-Ali Store</div>*/}
        </div>
        <div className="SuperContentsWrapper">
            <div className="SuperContents" style={{/*marginTop: -50*/}}>
                <div className="SuperContentsSub"
                     style={{position: 'absolute', marginTop: -200, width: 800, boxSizing: 'border-box'}}>
                    <h1 className="WelcomeLabel">Welcome to my store!</h1>
                    <p>
                        <br/>
                            Hi :) I'm Elya! And I make a decorations by myself hand with love &#10084;<br/>
                            This pendant is 100% handmade.<br/>
                            <br/>
                                Materials:<br/>
                                &nbsp; &nbsp; &#8226; Czech beads of first grade<br/>
                                &nbsp; &nbsp; &#8226; Wood<br/>
                                <br/>
                    </p>
                </div>
                <div className="SuperContentsSub">
                    <p>
                        Size of the pedant ~ 14x9,5 cm<br/>
                        Lenght of the rope 50 cm + the additional rope 12 cm<br/>
                        Color: multicolor(turquoise, blue, white, brown, golden, wooden)<br/>
                        I don't know how much weight, but it is heavy enought(~80gr)
                    </p>
                    <p style={{/*textAlign: center,*/ fontSize: 20}}>
                        Design of these decorations were create by me and haven't analogs.<br/>
                        The each decoration is unique and haven't a copy.
                    </p>
                    <h1>Images Gallery</h1>
                    <p></p>
                    <ul>
                        <li>
                            <div href="#"
                                 style={{backgroundImage: 'url(https://d.radikal.ru/d39/1907/8c/90bce2acb19f.jpg)'}}/>
                        </li>
                        <li>
                            <div href="#"
                                 style={{backgroundImage: 'url(https://a.radikal.ru/a33/1907/de/4c138f6f6bad.jpg)'}}/>
                        </li>
                        <li style={{width: '100%', height: 780}}>
                            <div href="#"
                                 style={{backgroundImage: 'url(https://c.radikal.ru/c33/1907/df/d152127e536a.jpg)'}}/>
                        </li>
                        <li style={{width: '100%', height: 530}}>
                            <div href="#"
                                 style={{backgroundImage: 'url(https://d.radikal.ru/d02/1907/3b/d07406a61543.jpg)'}}/>
                        </li>
                    </ul>
                    <p>&nbsp;</p>
                </div>
                <div className="SuperPaymentShippingEtc">
                    <div className="SuperPaymentShippingEtcTop">PAYMENT</div>
                    <div className="SuperPaymentShippingEtcContents">
                        <div className="SuperBoxContents">
                            I accept <i>PayPal</i> only
                        </div>
                    </div>
                    <div className="SuperPaymentShippingEtcBottom"></div>
                </div>

                <div className="SuperPaymentShippingEtc">
                    <div className="SuperPaymentShippingEtcTop">SHIPPING</div>
                    <div className="SuperPaymentShippingEtcContents">
                        <div className="SuperBoxContents">
                            Delivery is FREE to anywhere in the world
                        </div>
                    </div>
                    <div className="SuperPaymentShippingEtcBottom"></div>
                </div>
            </div>
        </div>
        <ItemsList data={propsValues} />
    </div>,
    document.getElementById("app")
)