import * as React from "react";

interface ShotProps {
  image: Blob | null;
}

const Shot: React.FC<ShotProps> = function (props: ShotProps) {
  const imgUrl = props.image ? URL.createObjectURL(props.image) : "";
  const frameRef = React.useRef(null as HTMLDivElement | null);

  React.useEffect(() => {
    const frame = frameRef.current!;
    const timerId = setTimeout(() => frame.classList.add("hidden"), 3000);
    return () => {
      clearTimeout(timerId);
      frame.classList.remove("hidden");
    };
  }, [props.image]);

  function handleClick(ev: React.PointerEvent<HTMLDivElement>) {
    ev.stopPropagation();
    console.log("Downloading picture");
    const a = document.createElement("a");
    a.href = imgUrl;
    a.download = "photo.png"
    a.click();
  }

  return (
    <>
      <div ref={frameRef} id="shot-div" className={imgUrl == "" ? "hidden" : ""} onPointerDown={handleClick}>
        <img src={imgUrl} />
      </div>
    </>
  );
};

export default Shot;
