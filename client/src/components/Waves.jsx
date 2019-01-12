import React from 'react';
import styles from '../styles/Waves.css';

class Waves extends React.Component {
  constructor(props) {
    super(props);
    //needs to make a state to keep track of hovering: mouseEnter?
      //hovering effect only affects top wave
      //hovering background effect only active when song is playing
        //when hovering left or right, changes to lighter shade of orange
      //currentTime stamp changes time accordingly when hovering while song is playing
    this.state = {
      hover: false
    }
    this.hovered = this.hovered.bind(this);
  }

  hovered() {
    console.log('this is hovered');
  }

  render() {
    return (
      <div>
        <div className={styles.BarWrapper}>
          {this.props.wave.map((data, i) => {
            // not hovering over wave forms. playing
            // if (this.props.play && this.props.currentTime > i) {
            //   console.log('this is currentTime in wave comp', this.props.currentTime)
            //   console.log('is it true', this.props.currentTime === i)
            //   return ( 
            //     <div 
            //       key={i} 
            //       className={styles.AnimatedBar}
            //       style={{height: data, animationDuration: `${this.props.duration}s`}}
            //       onClick={() => this.props.skipToSegment(i)}
            //       onMouseEnter={this.hovered}
            //       >
            //     </div>
            //   )
            // }
            if (this.props.currentTime > i) {
              // played
              return ( 
                <div 
                  key={i} 
                  className={styles.Bar} 
                  style={{height: data, background: 'linear-gradient(#ff6400, #ff3500)'}}
                  onClick={() => this.props.skipToSegment(i)}
                  >
                </div>
              )
            } else {
              // not played
              return (
                <div 
                  key={i}
                  className={styles.Bar} 
                  style={{height: data}}
                  onClick={() => this.props.skipToSegment(i)}
                  >
               </div> 
              )
            }
          })}
        </div>

        <div className={styles.MirrorWrapper}>
          {this.props.wave.map((data, i) => {
            // // playing
            // if (this.props.play && this.props.currentTime === i) {
            //   return ( 
            //     <div 
            //       key={i} 
            //       className={styles.AnimatedMirror} 
            //       style={{height: data / 3, animationDuration: `${this.props.duration}s`}}
            //       >
            //     </div>
            //   )
            // } 
            if (this.props.currentTime > i) {
              // played
              return ( 
                <div 
                  key={i} 
                  className={styles.Mirror} 
                  style={{height: data / 3, background: 'linear-gradient(#f7b589, #f7b4a3)'}}
                  >
                </div>
              )
            } else {
              // not played
              return (
                <div 
                  key={i}
                  className={styles.Mirror} 
                  style={{height: data / 3}}
                  >
                </div> 
              )
            }
          })}
          </div>
      </div>
    )
  }
}

export default Waves;
