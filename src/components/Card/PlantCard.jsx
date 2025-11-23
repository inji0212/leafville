export default function PlantCard({
  setIsZoomed,
  setIsCardOpen,
  setIsDragging,
  isDragging,
}) {
  const handleClose = () => {
    setIsZoomed(false);
    setIsCardOpen(false);
  };

  const handleDragStart = (event) => {
    setIsDragging(true);

    const dragImg = new Image();
    dragImg.src = "/icons/wateringcan.png";
    dragImg.width = 40;
    dragImg.height = 40;
    dragImg.style.position = "absolute";
    dragImg.style.top = "-100px";
    document.body.appendChild(dragImg);

    event.dataTransfer.setDragImage(dragImg, 20, 20);
    setTimeout(() => document.body.removeChild(dragImg), 0);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    document.body.style.cursor = "auto";
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 p-6 z-40 overflow-y-auto transition-opacity duration-300 ${
        isDragging ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* 닫기 버튼 컨테이너 */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleClose}
          className="text-white bg-red100 hover:text-gray-400 transition duration-300 ease-in-out pt-[3px] pr-[3px] pb-0 pl-[3px] rounded-lg hover:bg-red200 border-[6px] border-lg  border-yellow200"
          aria-label="닫기"
        >
          <img src="/icons/close.svg" alt="닫기 아이콘" className="w-6 h-6" />
        </button>
      </div>

      {/* 레벨 정보 카드 */}

      <div className="shadow-lg w-full bg-yellow50 p-4 rounded-3xl mb-4 border-green200 border-8">
        <h2 className="text-xl font-bold mb-2">레벨 1. 새싹 🌱</h2>
        <p className="text-lg">123/3000</p>
      </div>

      {/* 물 주기 카드 */}
      <div className="w-full">
        <button
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          className="w-full shadow-lg bg-yellow50 rounded-3xl text-xl font-bold hover:bg-yellow-200 py-4 pl-4 pr-10 border-8 border-green200 duration-300 ease-in-out flex items-center justify-between"
        >
          <span>물 주기</span>
          {/* 이미지 */}
          <img
            src="/icons/wateringcan.png"
            alt="주전자 아이콘"
            className="w-18 h-16 p-0"
          />
        </button>
      </div>
    </div>
  );
}
