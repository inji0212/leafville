import { useState, useEffect, useRef } from "react";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import useUserStore from "../../store/authState";
import { db } from "../../firebase";

import ChatMessage from "./ChatMessage";

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const user = useUserStore((state) => state.user);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "chats"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetched = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetched);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!user || input.trim() === "") return;

    await addDoc(collection(db, "chats"), {
      uid: user.uid,
      text: input,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <>
      <div
        className={`
          z-40 w-72 h-72 rounded-2xl shadow-xl flex flex-col border-8 border-green200
          transition-all duration-300
          ${
            isFocused
              ? "bg-yellow50 opacity-100 scale-100"
              : "opacity-60 scale-95 "
          }
        `}
      >
        <div className="flex-1 p-3 overflow-y-auto space-y-3">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} currentUserId={user?.uid} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSendMessage}
          className="p-2 bg-green200 flex gap-2"
        >
          <input
            type="text"
            value={input}
            placeholder="메시지를 입력하세요"
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 p-2 rounded-md bg-white text-black border font-medium"
          />

          <button
            type="submit"
            className="px-3 py-2 rounded-md bg-yellow-400 font-medium active:opacity-80"
            onMouseDown={(e) => e.preventDefault()}
          >
            전송
          </button>
        </form>
      </div>
    </>
  );
}
