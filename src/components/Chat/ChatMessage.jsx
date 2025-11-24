import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function ChatMessage({ message, currentUserId }) {
  const [nickname, setNickname] = useState("익명");
  const navigate = useNavigate();
  const isMyMessage = message.uid === currentUserId;

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", message.uid));
        if (userDoc.exists()) {
          setNickname(userDoc.data().nickname || "익명");
        }
      } catch (err) {
        console.error("닉네임 가져오기 실패", err);
        navigate("/");
      }
    };
    fetchNickname();
  }, [message.uid, navigate]);
  return (
    <div className={`flex ${isMyMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex flex-col max-w-xs md:max-w-md ${
          isMyMessage ? "items-end" : "items-start"
        }`}
      >
        <span
          className={`text-xs font-semibold mb-1 ${
            isMyMessage ? "text-green300" : "text-gray-500"
          }`}
        >
          {nickname}
        </span>

        <div
          className={`p-3 rounded-lg shadow-md ${
            isMyMessage
              ? "bg-green100 text-white rounded-br-none"
              : "bg-gray-200 text-black rounded-bl-none"
          }`}
        >
          {message.text}
        </div>
      </div>
    </div>
  );
}
