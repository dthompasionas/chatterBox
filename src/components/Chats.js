import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

export default function Chats() {
  
  const didMountRef = useRef(false)
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    await auth.signOut();
    history.push("/");
  }

  async function getFile(url) {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  }

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current= true

    if (!user || user === null) {
      if (user == null) {
        history.push("/");
      } else {
        history.push("/chats");
      }

      return;
    }

      // Get-or-Create should be in a Firebase Function
        axios.get("https://api.chatengine.io/users/me/", {
            headers: {
            "project-id": '923aafb5-9c41-409a-bcaf-07129b69c64e',
            "user-name": user.email,
            "user-secret": user.uid,
            },
        })
        .then(() => setLoading(false))
        .catch(() => {
          let formdata = new FormData();
          formdata.append("email", user.email);
          formdata.append("username", user.email);
          formdata.append("secret", user.uid);

          getFile(user.photoURL)
            .then((avatar) => {
              formdata.append("avatar", avatar, avatar.name);

              axios.post("https://api.chatengine.io/users/", formdata, {
                headers: {
                  "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
                },
              })
              .then(() => setLoading(false))
              .catch((error) => console.log(error));
            })
        })
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    }
  }, [user, history]);

  if (!user || loading) return ( 
  <div className='loading-page'>
      Loading...
  </div>);

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">ChatterBox</div>

        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>

      <ChatEngine
        height="calc(100vh - 66px)"
        projectID='923aafb5-9c41-409a-bcaf-07129b69c64e'
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
}
