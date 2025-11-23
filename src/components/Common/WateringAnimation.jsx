export default function WateringAnimation({ isWatering }) {
  if (!isWatering) return null;

  return (
    <div
      className="pointer-events-none fixed top-1/2 left-1/2 z-[9999]"
      style={{
        transform: "translate(-50%, -50%)",
        width: "220px",
        height: "220px",
      }}
    >
      <lottie-player
        autoplay
        src="/lottie/GrowingPlant.lottie"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
