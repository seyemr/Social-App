import React, { useEffect, useState } from "react";
import "./ChatBox.css";
import { useDispatch } from "react-redux";
import { getSingleUser } from "../../Redux/auth/action";
import { getUserMessage } from "../../Redux/chats/action";
import { format } from "timeago.js";

const ChatBox = () => {
    const [userData, setFormData] = useState(null);
    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = () => {
        //console.log(newMessage)
    }

    const chatId = data?.member?.find((id) => id !== userId);
    useEffect(() => {
        const getUserData = async () => {
            await dispatch(getSingleUser(chatId)).then((res) => {
                setUserData(res.data);
            });
        };
        if (data !== null) {
            getUserData();
        }
    }, [chatId, dispatch, data]);

    useEffect(() => {
        const fetchMessage = async () => {
            await dispatch(getUserMessage(data._id)).then((res) => {
                setMessage(res.data.chat);
            });
        };
        if (data !== nul) {
            fetchMessage();
        }
    }, [dispatch, userId, chatId, data])
    return (
        <div>
            {data ? (
                <>
                    <div className="chatHead">
                        <div className="conversation">
                            <div className="conImg">
                                <img src={userData?.profilePicture} alt="" />
                                <div></div>
                            </div>
                            <div className="convStatus">
                                <div>{userData?.name}</div>
                            </div>
                        </div>
                    </div>
                    <div className="chatBody">
                        {message.map((item, i) => (
                            <div
                                className={item.senderId == userId ? "message own" : "message"}
                                key={i}
                            >
                                <span>{item.text}</span>
                                <span>{format(item.createdAt)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="chatSender">
                        <input value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button
                            onClick={handleSubmit} className='chatSendBtn'>
                            Gönder
                        </button>
                    </div>
                </>
            ) : (
                <>Sohbete başlamak için herhangi bir kullanıcıya tıklayın !!!</>
            )}
        </div>
    )
}

export default ChatBox;