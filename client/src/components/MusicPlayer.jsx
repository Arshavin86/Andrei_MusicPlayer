import React from 'react';
// import CSSModules from 'react-css-modules';
import Waves from './Waves.jsx';
import styles from '../styles/MusicPlayer.css';
import axios from 'axios';
import TimeAgo from 'react-timeago';

var audio;

 // create a function to generate random wave data in string form, later to be split into an array
const waveGenerator = () => {
  let waves = '';
  for (let i = 0; i <= 240; i += 1) {
    const wave = Math.floor((Math.random() + 1) * 35);
    waves += `${wave},`;
  }
  return waves;
};

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'play': false,
      'playerIcon': 'https://s3-us-west-1.amazonaws.com/democrituscloud/play.png',
      'album': '',
      'artist': 'Andrei',
      'duration': 0,
      'currentTime': 0,
      'id': 61,
      'image': '',
      'released': '',
      'song': '',
      'title': '',
      'wave': [52,50,51,64,67,36,69,56,50,46,46,39,53,62,53,56,49,36,49,37,38,58,40,69,35,69,67,43,37,60,66,58,37,56,51,41,64,65,49,38,42,59,68,64,42,40,50,61,35,59,58,68,55,66,43,60,56,51,67,42,69,40,54,47,39,65,65,60,63,59,50,38,45,58,68,55,67,53,36,44,59,35,43,38,44,42,59,56,67,68,36,54,57,51,57,61,58,48,62,52,63,35,62,63,57,44,59,57,49,37,36,68,36,44,52,64,55,65,45,35,64,58,41,36,61,44,62,66,43,38,52,46,42,45,65,64,55,60,69,54,55,38,61,46,63,55,39,66,46,35,66,43,35,59,48,47,49,63,57,53,57,39,55,39,55,42,58,53,46,42,63,36,52,58,57,63,61,50,53,44,59,51,63,51,57,56,38,50,45,53,47,63,62,51,68,69,66,67,57,61,47,45,60,51,58,35,62,63,50,39,46,56,45,60,44,46,51,58,62,69,48,37,62,65,46,60,63,42,55,42,46,69,40,68,42,57,62,49,51,40,39]
    }
    this.calculateTime = this.calculateTime.bind(this);
    this.calculateCurrentTime = this.calculateCurrentTime.bind(this);
    this.fetchSong = this.fetchSong.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.skipToSegment = this.skipToSegment.bind(this);
  }

  componentDidMount() {
    this.fetchSong();
  }

  calculateTime(length) {
    // calculates song length and puts it in the right format
    var minutes = Math.floor(length / 60);
    var seconds = (length - minutes * 60).toString().substr(0, 2);
    var time = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    return time;
  }

  calculateCurrentTime(currentTime) {
    // calculates currentTime and puts it in the right format
    var currentMin = parseInt(currentTime / 60) % 60;
    var currentSec = (currentTime % 60).toFixed();
    var currentTime = `${currentMin}:${currentSec < 10 ? '0' + currentSec : currentSec}`;
    return currentTime;
  }

  fetchSong() {
    var id = window.location.pathname.slice(1, window.location.pathname.length - 1);

    if (id) {
      id = Number(id);
    } else {
      id = this.state.id;
    }

    axios.get(`/api/jane/player/${id}`)
    .then((response) => { 
      audio = new Audio(response.data[0]['song_url']);
      audio.addEventListener('loadedmetadata', () => {
        this.setState({
          duration: audio.duration + 1
        });
      });
      console.log(response.data)
      this.setState({
        album: response.data[0].album,
        artist: response.data[0].artist,
        id: response.data[0].id,
        image: response.data[0].image,
        released: response.data[0].released,
        song: audio,
        title: response.data[0].title,
        wave: waveGenerator().split(',')
      });
    })
    .catch((error) => {
      console.log(error)
    });
  }

  clickHandler(event) {
    if (!this.state.play) {
      audio.play();
      this.setState({
        playerIcon: 'https://s3-us-west-1.amazonaws.com/democrituscloud/pause.png',
        play: true
      });
      
      // updates currentTime and updates playerIcon when song ends
      this.timer = setInterval(() => {
        this.setState({
          currentTime: audio.currentTime
        });

        if (audio.ended) {
          this.setState({
            playerIcon: 'https://s3-us-west-1.amazonaws.com/democrituscloud/play.png',
            play: false
          });
          clearInterval(this.timer);
        }
      }, 1000);
    } else {
      audio.pause();
      this.setState({
        playerIcon: 'https://s3-us-west-1.amazonaws.com/democrituscloud/play.png',
        play: false
      });
      clearInterval(this.timer);
    }
  }

  skipToSegment(position) {
    // jump to a new segment in the song based on the position in the wave form
    // divide the duration by number of bars in the wave
    audio.currentTime = position * (this.state.duration / 241);
    this.setState({
      currentTime: audio.currentTime
    });
  }

  render() {
    return(
      <div>
        <div className={styles.MusicPlayer}>
          <div className={styles.ButtonArea}>
            <img className={styles.Button} src={this.state.playerIcon} onClick={this.clickHandler}/>
          </div>

          <div className={styles.SongInfoArea}>
            <div className={styles.ArtistAlbum}>{this.state.artist}</div>
            <div className={styles.Title}>{this.state.title}</div>
            <div className={styles.ArtistAlbum}>{this.state.album}</div>
          </div>

          <img className={styles.Image} src={this.state.image}/>

          <div className={styles.TimeArea}>
            <TimeAgo date={this.state.released} className={styles.Timestamp}/>
          </div>
          
          <div className={styles.TimeWrapper}>
            <div className={styles.CurrentTime}> 
              {this.calculateCurrentTime(this.state.currentTime)}
            </div>
            <div className={styles.Duration}> 
              {this.calculateTime(this.state.duration)}
            </div>
          </div>

          <div className={styles.Equalizer}>
            <Waves 
              wave={this.state.wave} 
              duration={this.state.duration}
              play={this.state.play}
              currentTime={this.state.currentTime}
              skipToSegment={this.skipToSegment}
              calculateTime={this.calculateTime}
              calculateCurrentTime={this.calculateCurrentTime}
            />
          </div>      
        </div>         
      </div>
    )
  }
}

export default MusicPlayer;