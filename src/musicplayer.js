import React from "react";
import  "./musicplayer.css";
import Leo from "./naa ready.jpg";
import NaaReady from "./assets/naa ready.mp3";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";


class MusicPlayer extends React.Component{

   constructor(props){
      super(props);
      this.audioRef = React.createRef();
      this.state={
         isPlaying:false,
        currentTime:0,
        duration:0
    };
   }

//update the current Date & time use reactlifecycle

componentDidMount(){
   const audio=this.audioRef.current;
   audio.addEventListener("timeupdate",this.updateTime);
   audio.addEventListener("loadedmetadata",this.setDuration);
}

//remove the music lead memorys

componentWillUnmount(){
   const audio=this.audioRef.current;
   audio.removeEventListener("timeupdate",this.updateTime);
   audio.removeEventListener("loadedmetadata",this.setDuration);
}

updateTime=()=>{
   const audio=this.audioRef.current;
   this.setState({currentTime:audio.currentTime})
}

//audio paly funciton
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
 } 
render(){
   const { currentTime, duration, isPlaying } = this.state;
      return<>
      <h1>music palyer</h1>
      

     
      <div className="MusicPlayer-container">

     <img src={Leo} alt="Not Available"/>
     <p> Move: <b> Leo </b> <br></br>
       
       Song : Naa ready
          
     </p>
   
     <input type="range"
            value={currentTime}
            max={duration}
            onChange={this.handleSeek}/>

<div className="Music-components">

  <BiSkipPrevious className="back-button"/>
  {isPlaying?(
 <AiFillPauseCircle  className="back-button" 
 onClick={this.togglePlay}/>
  ):(
<AiFillPlayCircle  className="back-button"
onClick={this.togglePlay}/>
  )}




  <BiSkipNext  className="back-button"/>

<audio ref={this.audioRef} src={NaaReady}></audio>



     </div>

        

      </div>
      
      
      </>
   }
}

export default MusicPlayer;





