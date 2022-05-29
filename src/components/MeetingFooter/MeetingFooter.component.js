import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faVideo,
  faDesktop,
  faVideoSlash,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import "./MeetingFooter.css";
const MeetingFooter = (props) => {

  console.log('recive action audio -->', props.handelControllAudio)
  console.log('recive action video -->', props.handelControllVideo)
  const [smic, setSmic] = useState(false)
  const [svideo, setSvideo] = useState(false)
  const [streamState, setStreamState] = useState({
    mic: false,
    video: false,
    screen: false,
  });


  const micClick = () => {
    setSmic(!smic)
    setStreamState((currentState) => {
      return {
        ...currentState,
        mic: !currentState.mic,

      };
    })



  };
  const demoll = () => {
    setStreamState({
      ...streamState,
      mic: !streamState.mic,

    })
  };



  const onVideoClick = () => {
    setSvideo(!svideo)

    setStreamState((currentState) => {
      return {
        ...currentState,
        video: !currentState.video,
      };
    });
  };

  const onScreenClick = () => {
    props.onScreenClick(setScreenState);
  };

  const setScreenState = (isEnabled) => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        screen: isEnabled,
      };
    });
  };
  /**
   * mic controll from admin 
   */
  useEffect(() => {
    setSmic(props.handelControllAudio)
    props.onMicClick(props.handelControllAudio);


    setSvideo(props.handelControllVideo)
    props.onVideoClick(props.handelControllVideo);

  }, [props.handelControllAudio, props.handelControllVideo]);



  useEffect(() => {

    props.onMicClick(streamState.mic);

  }, [streamState.mic]);

  useEffect(() => {

    props.onVideoClick(streamState.video);

  }, [streamState.video]);


  return (
    <div className="meeting-footer">
      <div
        className={"meeting-icons " + (!smic ? "active" : "")}
        data-tip={streamState.mic ? "Mute Audio" : "Unmute Audio"}
        onClick={micClick}
      >
        <FontAwesomeIcon
          icon={!smic ? faMicrophoneSlash : faMicrophone}
          title="Mute"
        />
      </div>
      <div
        className={"meeting-icons " + (!svideo ? "active" : "")}
        data-tip={svideo ? "Hide Video" : "Show Video"}
        onClick={onVideoClick}
      >
        <FontAwesomeIcon icon={!svideo ? faVideoSlash : faVideo} />
      </div>
      <div
        className="meeting-icons"
        data-tip="Share Screen"
        onClick={onScreenClick}
        disabled={streamState.screen}
      >
        <FontAwesomeIcon icon={faDesktop} />
      </div>
      <ReactTooltip />
    </div>
  );
};

export default MeetingFooter;
