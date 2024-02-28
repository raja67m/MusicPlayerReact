import React from "react";
import  "./musicplayer.css";
import Leo from "./naa ready.jpg";
import NaaReady from "./assets/naa ready.mp3";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";


class MusicPlayer extends React.Component{

   constructor(props){
      super(props);
      this.state={
         isPlaying:false,

    

      }
   }

   render(){

      return<>
      <h1>music palyer</h1>
      <div className="MusicPlayer-container">

     <img src={Leo} alt="Not Available"/>
     <p> Move: Leo <br></br>
       <b>
       Song : Naa ready
         </b> 
     </p>
   
     <input type="range"/>

<div className="Music-components">

  <BiSkipPrevious className="back-button"/>
  {this.state.isPlaying?(
 <AiFillPauseCircle  className="back-button" />
  ):(
<AiFillPlayCircle  className="back-button"/>
  )}




  <BiSkipNext  className="back-button"/>





     </div>

        

      </div>
      
      </>
   }
}

export default MusicPlayer;





