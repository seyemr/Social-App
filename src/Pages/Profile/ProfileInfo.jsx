import React, { useState } from "react";
import "./ProfileInfo.css";
import { BiEdit } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Button, Drawer, Modal } from "antd";
import { updateUser } from "../../Redux/auth/action";
import DeleteUser from "../../Components/DeleteUser/DeleteUser";
import ChangePassword from "../../Components/ChangePassword/ChangePassword";
import { message } from "antd";
const ProfileInfo = () => {
    const {
        data: { user },
    } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: user.name,
        username: user.username,
        gender: user.gender,
        relationship: user.relationship,
        livesin: user.livesin,
        workAt: user.workAt,
        userid: user._id,
        admin: user.isAdmin,
    });

    const [on, setOn] = useState(false);

    const showDrawer = () => {
        setOn(true);
    };

    const onClose = () => {
        setOn(false);
    };

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const [messageApi, contextHolder] = message.useMessage();

    const success = (text) => {
        messageApi.success(text);
    };
    const error = (text) => {
        messageApi.error(text);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleFormSubmit = () => {
        if (
            formData.name.trim() !== "" &&
            formData.workAt.trim() !== "" &&
            formData.livesin.trim() !== "" &&
            formData.relationship.trim() !== "" &&
            formData.username.trim() !== ""
        ) {
            if (formData.name.trim().length < 4) {
                error("Name must be at least of 4 characters");
            } else {
                dispatch(updateUser(formData, user._id));
                success("user updated");
                handleOk();
            }
        } else {
            error("Please enter all required fields");
        }
    };

    return (
        <div className="profileInfo">
            {contextHolder}
            <div className="infoHead">
                <h3>Bilgileriniz</h3>
                <p onClick={showModal}>
                    Bilgileri Düzenle <BiEdit />
                </p>
                <Modal
                    title="Detayları düzenle"
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            İptal
                        </Button>,
                        <Button key="submit" onClick={handleFormSubmit}>
                            Düzenle
                        </Button>,
                    ]}
                >
                    <form className="inputForm">
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleFormChange}
                            type="text"
                            placeholder="Tam Ad"
                        />
                        <input
                            name="username"
                            value={formData.username}
                            onChange={handleFormChange}
                            type="text"
                            placeholder="@kullanıcıAdı"
                        />
                        <select name="gender" onChange={handleFormChange}>
                            <option value="">Cinsiyet</option>
                            <option value="male">Erkek</option>
                            <option value="female">Kadın</option>
                            <option value="other">Diğer</option>
                        </select>
                        <input
                            name="relationship"
                            value={formData.relationship}
                            onChange={handleFormChange}
                            type="text"
                            placeholder="İlişki durumunu girin"
                        />
                        <input
                            name="workAt"
                            value={formData.workAt}
                            onChange={handleFormChange}
                            type="text"
                            placeholder="İş yeri"
                        />
                        <input
                            name="livesin"
                            value={formData.livesin}
                            onChange={handleFormChange}
                            type="text"
                            placeholder="Konum"
                        />
                    </form>
                </Modal>
            </div>
            <div className="info">
                <span>
                    <b>Durum</b>
                </span>
                <span>{user.relationship ? user.relationship : "Veri yok"}</span>
            </div>
            <div className="info">
                <span>
                    <b>Cinsiyet</b>
                </span>
                <span>{user.gender !== "empty" ? user.gender : "Veri yok"}</span>
            </div>
            <div className="info">
                <span>
                    <b>Konum</b>
                </span>
                <span>{user.livesin ? user.livesin : "Veri yok"}</span>
            </div>
            <div className="info">
                <span>
                    <b>İş Yeri</b>
                </span>
                <span>{user.workAt ? user.workAt : "Veri yok"}</span>
            </div>
            <div className="info" onClick={showDrawer}>
                <p>
                    Hesap Ayarları
                    <IoMdSettings />
                </p>
            </div>
            <Drawer
                title="Account Settings"
                placement="left"
                onClose={onClose}
                open={on}
                className="accountDrawer"
            >
                <DeleteUser />
                <ChangePassword />
                <p
                    onClick={() => {
                        dispatch({ type: "AUTH_LOGOUT" });
                    }}
                >
                    Çıkış Yap
                </p>
            </Drawer>
        </div>
    );
};

export default ProfileInfo;
