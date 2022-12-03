import * as React from "react";
import Shot from "./Shot";

interface VideoHandlerProp {
  stream: MediaStream;
}

const VideoHandler: React.FC<VideoHandlerProp> = function (
  props: VideoHandlerProp
) {
  const videoRef = React.useRef(null as HTMLVideoElement | null);
  const [imageBlob, setImageBlob] = React.useState(null as Blob | null);

  React.useEffect(() => {
    const video = videoRef.current!;
    video.srcObject = props.stream;
    video.addEventListener("loadedmetadata", () => video.play(), {
      once: true,
    });

    const clickHandler = async () => {
      setImageBlob(await snapVideoToPng(video));
      console.log("Snap");
    };
    document.addEventListener("pointerdown", clickHandler);

    return () => document.removeEventListener("pointerdown", clickHandler);
  }, []);

  return (
    <>
      <div id="video-div">
        <video ref={videoRef} />
      </div>
      <Shot image={imageBlob} />
    </>
  );
};

export default VideoHandler;

async function snapVideoToPng(video: HTMLVideoElement) {
  const canva = document.createElement("canvas");
  canva.height = video.videoHeight;
  canva.width = video.videoWidth;
  canva.getContext("2d")!.drawImage(video, 0, 0);
  return await new Promise((resolve: BlobCallback) =>
    canva.toBlob(resolve, "image/png")
  );
}
