import * as React from "react";
import VideoHandler from "./VideoHandler";
import "./style.scss"

const App: React.FC = function () {
  const [mediaStream, setMediaStream] = React.useState(
    null as MediaStream | null
  );

  React.useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((mediaStream) => setMediaStream(mediaStream))
      .catch(null);
  }, []);

  if (mediaStream === null)
    return (
      <>
        <h1>Please Allow Camera Use</h1>
      </>
    );

  return <>
    <VideoHandler stream={mediaStream} />
  </>;
};

export default App;