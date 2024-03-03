import React from "react";
import "./musicplayer.css";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.state = {
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      palyList: [
        { MovieName: "Leo", songTitle: "Naa ready tha", mp3: require("./assets/naa ready.mp3"), image: require("./songimage/naa ready.jpg") },
        { MovieName: "Vikram", songTitle: "Pathala", mp3: require("./assets/pathala.mp3"), image: require("./songimage/Vikram.jpg") },
        { MovieName: "Kaithi", songTitle: "Kaithi Track", mp3: require("./assets/kaithiThemme.mp3"), image: require("./songimage/kathi.jpg") },
        { MovieName: "jailler", songTitle: "jailler Track", mp3: require("./assets/jalierThemme.mp3"), image: require("./songimage/jailler.jpg") }
      ],
      currentSongIndex: 0,
    };
  }

  //update the current Date & time use reactlifecycle
  componentDidMount() {
    const audio = this.audioRef.current;
    audio.addEventListener("timeupdate", this.updateTime);
    audio.addEventListener("loadedmetadata", this.setDuration);
    

    this.palyCurrentSong();
  }
  

  //remove the music lead memorys
  componentWillUnmount() {
    const audio = this.audioRef.current;
    audio.removeEventListener("timeupdate", this.updateTime);
    audio.removeEventListener("loadedmetadata", this.setDuration);
  }

  updateTime = () => {
    const audio = this.audioRef.current;
    this.setState({ currentTime: audio.currentTime });
  };

  //audio play function
  togglePlay = () => {
    const audio = this.audioRef.current;
    if (audio.paused) {
      audio.play();
      this.setState({ isPlaying: true });
    } else {
      audio.pause();
      this.setState({ isPlaying: false });
    }
  };

  setDuration = () => {
    const audio = this.audioRef.current;
    this.setState({ duration: audio.duration });
  };

  handleSeek = (e) => {
    const audio = this.audioRef.current;
    audio.currentTime = e.target.value;
    this.setState({ currentTime: e.target.value });
  };

  //playNextSong 
  palyNextSong = () => {
    const { palyList, currentSongIndex } = this.state;
    const nextIndex = (currentSongIndex + 1) % palyList.length;
    this.setState({ currentSongIndex: nextIndex }, () => {
      this.palyCurrentSong();
    })
  }

  //playPreviousSong
  playPreviousSong = () => {
    const { palyList, currentSongIndex } = this.state;
    const previousIndex = (currentSongIndex - 1 + palyList.length) % palyList.length;
    this.setState({ currentSongIndex: previousIndex }, () => {
      this.palyCurrentSong();
    })
  }

  //playCurrentSong
  palyCurrentSong = () => {
    const { palyList, currentSongIndex } = this.state;
    const audio = this.audioRef.current;
    audio.src = palyList[currentSongIndex].mp3; 
    audio.play();
    this.setState({ isPlaying: true });
  }
  

  render() {
    const { currentTime, duration, isPlaying, palyList, currentSongIndex } = this.state;
    const currentSong = palyList[currentSongIndex];
    return <>
      <h1>music player</h1>
      <div className="MusicPlayer-container">
        <div>
          <img src={currentSong.image} alt="Not available" />
          <p>
            Move: <b>{currentSong.MovieName}</b> <br />
            Song: {currentSong.songTitle}
          </p>
        </div>
        <input
          type="range"
          value={currentTime}
          max={duration}
          onChange={this.handleSeek} />
        <div className="Music-components">
          <BiSkipPrevious className="back-button" onClick={this.playPreviousSong} />
          {isPlaying ? (
            <AiFillPauseCircle className="back-button" onClick={this.togglePlay} />
          ) : (
            <AiFillPlayCircle className="back-button" onClick={this.togglePlay} />
          )}
          <BiSkipNext className="back-button" onClick={this.palyNextSong} />
          <audio ref={this.audioRef}></audio>
        </div>
      </div>
    </>
  }
}

export default MusicPlayer;
