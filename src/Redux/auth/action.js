import * as types from "./types";
import axios from "axios";

// Kullanıcı Kaydı
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_USER_REQUEST });
    const res = await axios.post(
      `https://busy-jade-sawfish-cape.cyclic.app/auth/register`,
      userData
    );

    dispatch({
      type: types.REGISTER_USER_SUCCESS,
      payload: {
        message: res.data.message,
        user: res.data.user,
        token: res.data.token,
      },
    });
  } catch (error) {
    dispatch({
      type: types.REGISTER_USER_ERROR,
      payload: {
        message: error.response.data.message,
      },
    });
  }
};

// Kullanıcı girişi
export const authLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_USER_REQUEST });
    const res = await axios.post(
      "https://busy-jade-sawfish-cape.cyclic.app/auth/login",
      data
    );
    dispatch({
      type: types.LOGIN_USER_SUCCESS,
      payload: {
        message: res.data.message,
        user: res.data.user,
        token: res.data.token,
      },
    });
  } catch (error) {
    dispatch({
      type: types.LOGIN_USER_ERROR,
      payload: {
        message: error.response.data.message,
      },
    });
  }
};

//kullanıcıyı güncelle
export const updateUser = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_USER_REQUEST });
    const res = await axios.put(
      `https://busy-jade-sawfish-cape.cyclic.app/user/${id}`,
      data
    );
    dispatch({ type: types.UPDATE_USER_SUCCESS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

//get all user
export const getUser = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://busy-jade-sawfish-cape.cyclic.app/user/alluser"
    );
    dispatch({ type: types.GET_USER_SUCCESS, payload: res.data.Alluser });
  } catch (error) {
    console.log(error);
  }
};

//tek kullanıcı al
export const getSingleUser = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://busy-jade-sawfish-cape.cyclic.app/user/${id}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Hesabı Sil
export const deleteUser = (password, id) => async (dispatch) => {
  try {
    const res = await fetch(
      `https://busy-jade-sawfish-cape.cyclic.app/user/${id}`,
      {
        method: "DELETE",
        body: JSON.stringify({ password, id }),
        headers: { "Content-Type": "application/json" },
      }
    );
    let data = await res.json();
    dispatch({
      type: types.DELETE_USER_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    console.log(error);
  }
};

//şifreyi değiştir
export const changePassword =
  (oldpassword, id, newpassword) => async (dispatch) => {
    try {
      let res = await axios.put(
        `https://busy-jade-sawfish-cape.cyclic.app/user`,
        { id, oldpassword, newpassword }
      );
      dispatch({
        type: types.CHANGE_PASSWORD_SUCCESS,
        payload: res.data.message,
      });
    } catch (error) {
      console.log(error);
    }
  };

//Takip Edenler
export const followUser = (followId, user) => async (dispatch) => {
  dispatch({
    type: types.FOLLOW_USER_REQUEST,
  });
  try {
    await axios.put(
      `https://busy-jade-sawfish-cape.cyclic.app/user/${followId}/follow`,
      {
        currentuserid: user._id,
      }
    );
    dispatch({ type: types.FOLLOW_USER_SUCCESS, payload: followId });
  } catch (error) {
    console.log(error);
  }
};

//Takibi Bırakanlar
export const unfollowUser = (followId, user) => async (dispatch) => {
  dispatch({
    type: types.UNFOLLOW_USER_REQUEST,
    payload: followId,
  });
  try {
    await axios.put(
      `https://busy-jade-sawfish-cape.cyclic.app/user/${followId}/unfollow`,
      {
        currentuserid: user._id,
      }
    );
    dispatch({ type: types.UNFOLLOW_USER_SUCCESS, payload: followId });
  } catch (error) {
    console.log(error);
  }
};

// Kullanıcı Çıkışı
export const authLogout = () => async (dispatch) => {
  try {
    dispatch({
      type: types.AUTH_LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};
