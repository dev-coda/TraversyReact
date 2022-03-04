import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import googleIcon from "../assets/svg/googleIcon.svg";

function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (e) {
      console.log(e);
      toast.error("Could not sign in with Google");
    }
  };
  return (
    <div className="socialLogin">
      <p>
        Sign {location.pathname === "/sign-up" ? "up" : "in"} with
        <button className="socialIconDiv">
          <img
            className="socialIconImg"
            src={googleIcon}
            alt="google"
            onClick={onGoogleClick}
          />
        </button>
      </p>
    </div>
  );
}

export default OAuth;
