import {Component} from 'react';
import Icon from './ElyaIcons.jsx';
import style from './ElyaUI.scss';

class ElyaNavbar extends Component {
    render() {
        return <div className={style.elyaNavbar + ' container-fluid'}>
            <div className='row'>
                <div className={style.menuButton + ' col'}/>
                <div className={style.logo + ' col'}/>
                <div className='unused col'/>
                <div className={style.cart + ' col'}>
                    <Icon.cart className={style.icon}/>
                </div>
                <div className={style.eMail + ' col'}>
                    <Icon.email className={style.icon}/>
                </div>
            </div>
            <hr/>
        </div>;
    }
}

class ElyaTitleYoutube extends Component {
    constructor(props) {
        super(props);
        this.state = {userClicked: false};

        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        if (!this.state.userClicked) {
            this.setState({userClicked: true});
            const obj = youtubePlayers[this.props.id] = {player: null, ready: false};
            obj.player = new YT.Player('elyaVideoPlayer', {
                height: '360',
                width: '640',
                videoId: 'cpSJF2FDP2A',
                playerVars: {
                    autoplay: 1,
                    controls: 0, // Player controls do not display in the player.
                    showinfo: 0, // Hide the video title(deprecated - больше не работает)
                    rel: 0, // If the parameter's value is set to 0, then the player does not show related videos.
                    modestbranding: 1, /* Set the parameter value to 1 to prevent the
                                        YouTube logo from displaying in the control bar.*/
                    cc_load_policy: 0, // выключить субтитры('closed captions' - их и так нет)
                    iv_load_policy: 3, // выключить аннотацию(её и так нет)
                },
                events: {
                    'onReady': () => {
                        console.log('onPlayerReady event');
                        youtubePlayers[this.props.id].ready = true;
                        const player = youtubePlayers[this.props.id].player;
                        player.mute(); // выключить звук у видео
                        player.playVideo();
                    },
                    'onStateChange': () => {
                        // для информации - все возможные состояния плеера
                        // YT.PlayerState.ENDED
                        // YT.PlayerState.PLAYING
                        // YT.PlayerState.PAUSED
                        // YT.PlayerState.BUFFERING
                        // YT.PlayerState.CUED
                        if (event.data === YT.PlayerState.ENDED) {
                            event.target.playVideo();
                        }
                    },
                },
            });
        // eslint-disable-next-line camelcase
        } else if (youtubeAPI_ready && youtubePlayers.hasOwnProperty(this.props.id)) {
            if (youtubePlayers[this.props.id].ready) {
                const player = youtubePlayers[this.props.id].player;
                const state = player.getPlayerState();
                if (state === YT.PlayerState.PLAYING) {
                    player.pauseVideo();
                } else {
                    player.playVideo();
                }
            }
        }
    }
    render() {
        return <div className={style.elyaVideo}>
            {/* Youtube video*/}
            <div className={this.state.userClicked ? style.stubYoutube : style.youtubePreview} onClick={this.onClick}>
                {this.state.userClicked ? null :
                    <Icon.youtubePlay className={style.icon}/> /* иконка play у превьюшки */
                }
            </div>
            <div id='elyaVideoPlayer' className={style.youtube}/>
            {/* <iframe*/}
            {/*    id='elyaVideoPlayer'*/}
            {/*    className='youtube'*/}
            {/*    src='https://www.youtube.com/embed/cpSJF2FDP2A' >*/}
            {/* </iframe>*/}
            {/*    // width='420'*/}
            {/*    // height='315'*/}
            {/*    // src='https://www.youtube.com/embed/cpSJF2FDP2A'*/}
            {/*    // frameborder='0'*/}
            {/*    // allowfullscreen*/}
            {/*    // className='video'*/}

            {/*    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'*/}
            {/*    title='YouTube video player' width='640' height='360'*/}
            {/*    allowFullScreen*/}
            {/*    className='youtube'*/}
            {/* eslint-disable-next-line max-len*/}
            {/*    // src='https://www.youtube.com/embed/cpSJF2FDP2A?autoplay=1&amp;controls=0&amp;rel=0&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fen.past-indicator.com&amp;widgetid=1'*/}
            {/* // чтобы видео заработало нужно будет обязательно передать в origin полный домен сайта*/}
        </div>;
    }
}

class ElyaFooter extends Component {
    render() {
        return <div className={style.elyaFooter}>
            Users feedbacks and comments
        </div>;
    }
}

export {ElyaNavbar, ElyaTitleYoutube, ElyaFooter};
