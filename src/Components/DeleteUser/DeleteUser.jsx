import { Drawer, message } from "antd";
import Password from "antd/es/input/Password";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../Redux/auth/action";
import "./DeleteAccount.css";
const DeleteUser = () => {
    const [open, setOpen] = useState(false);
    const [password, setText] = useState("");
    const [messageApi, contextHolder] = message.useMessage();

    const info = (text) => {
        messageApi.info(text);
    };
    const success = (text) => {
        messageApi.success(text);
    };

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const {
        data: { user },
        deleteMessage,
    } = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (deleteMessage === "Kullanıcı Başarıyla Silindi") {
            success("Kullanıcı Başarıyla Silindi");
            dispatch({ type: "RESET_CHANGE_PASSWORD_SUCCESS" });
            dispatch({ type: "AUTH_LOGOUT" });
        }
        if (deleteMessage === "Kullanıcı mevcut değil") {
            info("Kullanıcı mevcut değil");
            dispatch({ type: "RESET_CHANGE_PASSWORD_SUCCESS" });
        }
        if (deleteMessage === "Şifre eşleşmiyor.") {
            info("Hatalı Şifre");
            dispatch({ type: "RESET_CHANGE_PASSWORD_SUCCESS" });
        }
    }, [dispatch, deleteMessage]);

    const handleUserDelete = () => {
        if (password === "") {
            info("Şifrenizi Giriniz");
        } else {
            dispatch(deleteUser(password, user._id));
        }
    };

    return (
        <>
            <p onClick={showDrawer}>Hesabı Sil </p>
            {contextHolder}
            <Drawer
                title="HESABI SİL"
                placement="left"
                onClose={onClose}
                open={open}
                className="deleteDrawer"
            >
                <p>Şifrenizi Giriniz</p>
                <input
                    value={password}
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                    placeholder="Password"
                />
                <br />
                <button onClick={handleUserDelete} className="deleteButton">
                    Sil
                </button>
            </Drawer>
        </>
    );
};

export default DeleteUser;
