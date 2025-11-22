import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loader({ progress }) {
  const ProgressBarTotalFrames = 120;
  const progressBarCurrentFrames = (progress / 100) * ProgressBarTotalFrames;

  return (
    <div
      className={`fixed w-screen h-screen top-0 left-0 bg-[#f7f7f7] flex flex-col justify-center items-center z-50 transition-opacity duration-700 ${
        progress === 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <DotLottieReact
        src="/lottie/GrowingPlant.lottie"
        autoplay
        loop
        style={{ width: 180, height: 180 }}
      />
      <dotlottie-player
        src="/lottie/ProgressBar.lottie"
        style={{ width: 300, height: 50 }}
        animationCurrentTime={progressBarCurrentFrames}
      />
      <div className="mt-3 text-lg font-bold">{Math.floor(progress)}%</div>
    </div>
  );
}
