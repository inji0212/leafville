// Firebase Auth Modal Example (React)
// - 로그인/회원가입 모달
// - 로그인 <-> 회원가입 전환
// - 닉네임(10자 이내) + 중복확인
// - Firestore 저장 구조 예시 포함

import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "framer-motion";
import { auth, db } from "../../firebase";

export default function AuthModal({ isOpen, onClose }) {
  const [mode, setMode] = useState("login"); // login | register

  // 공통 입력값
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 회원가입용
  const [nickname, setNickname] = useState("");
  const [nickValid, setNickValid] = useState(null); // null | true | false

  const reset = () => {
    setEmail("");
    setPassword("");
    setNickname("");
    setNickValid(null);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!isOpen) reset();
  }, [isOpen]);

  const handleNickCheck = async () => {
    console.log("test");
    if (!nickname.trim()) return alert("닉네임을 입력해주세요.");
    if (nickname.length > 10) return alert("닉네임은 10자 이내여야 합니다.");

    const ref = doc(db, "nicknames", nickname);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      setNickValid(false);
    } else {
      setNickValid(true);
    }
  };

  const handleRegister = async () => {
    if (!nickValid) return alert("닉네임 중복확인이 필요합니다.");

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const uid = user.user.uid;

      // 유저 데이터 저장
      await setDoc(doc(db, "users", uid), {
        email,
        nickname,
      });

      // 닉네임 중복방지 테이블에 저장
      await setDoc(doc(db, "nicknames", nickname), { uid });

      alert("회원가입 성공! 로그인 해주세요.");
      setMode("login");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("로그인 성공!");
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 배경 어둡게 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* 모달 */}
      <AnimatePresence>
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 180 }}
          className="relative bg-yellow50 p-6 rounded-3xl w-[350px]   border-8 border-yellow200  shadow-xl"
        >
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute -top-16 -right-2 z-50 text-white bg-red100 transition duration-300 ease-in-out pt-1 pr-1 pb-[-1px] pl-1 rounded-lg hover:bg-red200 border-[6px] border-lg  border-yellow200"
          >
            <img
              src="/icons/close.svg" 
              alt="닫기 아이콘"
              className="w-6 h-6"
            />
          </button>

          <h2 className="text-2xl font-medium mb-4 text-center">
            {mode === "login" ? "로그인" : "회원가입"}
          </h2>

          {/* 이메일 */}
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded mb-2 "
          />

          {/* 비밀번호 */}
          <input
            autocomplete="current-password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded mb-4 text-black font-custom placeholder-custom"
          />

          {mode === "register" && (
            <div className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="닉네임 (10자 이내)"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="flex-1 border p-2 rounded"
                />
                <button
                  className="px-3 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={handleNickCheck}
                >
                  중복확인
                </button>
              </div>

              {nickValid === true && (
                <p className="text-green-600 text-sm mt-1">
                  사용 가능한 닉네임입니다.
                </p>
              )}
              {nickValid === false && (
                <p className="text-red-600 text-sm mt-1">
                  이미 사용 중인 닉네임입니다.
                </p>
              )}
            </div>
          )}

          {/* 버튼 */}
          {mode === "login" ? (
            <button
              className="w-full bg-yellow200 text-white py-2 hover:opacity-80  duration-200 ease-in-out  rounded mb-3"
              onClick={handleLogin}
            >
              로그인하기
            </button>
          ) : (
            <button
              className="w-full bg-yellow300  text-white py-2  hover:opacity-80  duration-200 ease-in-out rounded mb-3"
              onClick={handleRegister}
            >
              회원가입하기
            </button>
          )}

          {/* 모드 전환 */}
          <p
            className="text-center text-sm cursor-pointer text-gray-600 hover:underline"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login" ? "회원가입하러 가기" : "로그인하러 가기"}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
