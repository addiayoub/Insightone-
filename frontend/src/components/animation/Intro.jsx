import React from "react";
import intro1 from "../../assets/vids/Intro1.mp4";
import intro2 from "../../assets/vids/Intro2.mp4";
import intro3 from "../../assets/vids/Intro3.mp4";

function Intro({ setIsHide }) {
  const intros = [intro1, intro2, intro3];
  const intro = intros[Math.floor(Math.random() * intros.length)];
  return (
    <div className="h-screen w-full" onClick={() => setIsHide(false)}>
      <video
        src={intro}
        muted
        autoPlay
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default Intro;
