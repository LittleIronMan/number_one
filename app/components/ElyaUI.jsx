var React = require('react');

class ElyaNavbar extends React.Component {
    render() {
        return <div className="elyaNavbar">
        </div>;
    }
}

class ElyaTitleYoutube extends React.Component {
    render() {
        return <div className="elyaVideo">
            {/*Youtube video*/}
            <div className="stub-youtube"/>
            <div id="elyaVideoPlayer" className="youtube"/>
            {/*<iframe*/}
            {/*    id="elyaVideoPlayer"*/}
            {/*    className="youtube"*/}
            {/*    src="https://www.youtube.com/embed/cpSJF2FDP2A" >*/}
            {/*</iframe>*/}
                {/*    // width="420"*/}
                {/*    // height="315"*/}
                {/*    // src="https://www.youtube.com/embed/cpSJF2FDP2A"*/}
                {/*    // frameborder="0"*/}
                {/*    // allowfullscreen*/}
                {/*    // className="video"*/}

                {/*    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"*/}
                {/*    title="YouTube video player" width="640" height="360"*/}
                {/*    allowFullScreen*/}
                {/*    className="youtube"*/}
                {/*    // src="https://www.youtube.com/embed/cpSJF2FDP2A?autoplay=1&amp;controls=0&amp;rel=0&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fen.past-indicator.com&amp;widgetid=1"*/}
                {/*// чтобы видео заработало нужно будет обязательно передать в origin полный домен сайта*/}
        </div>;
    }
    componentDidMount() {
        // если компонент был удален, а затем заново установлен(на другую страницу, например) - нужно повторно вызвать youtube api, чтобы загрузить в него плеер
        if (youtubeAPI_ready && youtubePlayer == null) {
            createYoutubePlayer();
        }
        // переключение воиспроизведения по нажатию на зону с видео(при этом не контактируем с самой iframe напрямую)
        let stub = document.getElementsByClassName("stub-youtube")[0];
        stub.addEventListener('click', function() {
            if (elyaPlayer != null) {
                let state = elyaPlayer.getPlayerState();
                if (state === YT.PlayerState.PLAYING) {
                    elyaPlayer.pauseVideo();
                }
                else if (state === YT.PlayerState.PAUSED){
                    elyaPlayer.playVideo();
                }
            }
        });
    }
    componentWillUnmount() {
        youtubePlayer = null;
        elyaPlayer = null;
    }
}

class ElyaFooter extends React.Component {
    render() {
        return <div className="elyaFooter">
            Users feedbacks and comments
        </div>;
    }
}

module.exports = {ElyaNavbar, ElyaTitleYoutube, ElyaFooter};
