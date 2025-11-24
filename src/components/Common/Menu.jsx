import { useLocation, useNavigate } from "react-router-dom";
import useUserStore from "../../store/authState";

export function Menu({ onOpenAuthModal }) {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const isSquarePage = location.pathname === "/square";
  const buttonText = isSquarePage ? "집가기" : "광장가기";
  const redirectToPath = isSquarePage ? "/" : "/square";

  const handleClick = () => {
    if (isSquarePage) {
      navigate(redirectToPath);
    } else {
      if (user) {
        navigate(redirectToPath);
      } else {
        const confirmLogin = window.confirm(
          "광장으로 가시려면 로그인이 필요합니다. 로그인하시겠습니까?"
        );
        if (confirmLogin) {
          onOpenAuthModal();
        }
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 p-4  flex items-center justify-center z-40">
      <button
        onClick={handleClick}
        className="w-28 h-16 shadow-lg bg-yellow50 rounded-full text-xl font-bold border-8 border-yellow300 duration-300 ease-in-out hover:bg-yellow75 flex items-center justify-center  "
      >
        {buttonText}
      </button>
    </div>
  );
}
