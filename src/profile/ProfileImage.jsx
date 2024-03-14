import React, { useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";
import editIcon from "../assets/icons/edit.svg";
import checkIcon from "../assets/checkIcon.png";
import { useAxios } from "../hooks/useAxios";
import { actions } from "../actions";
export default function ProfileImage() {
  const { auth } = useAuth();
  const { state } = useProfile();
  const { api } = useAxios();
  const [showPhotoEdit, setShowPhotoEdit] = useState(false);
  const [photo, setPhoto] = useState(state?.user?.avatar);
  const { dispatch } = useProfile();
  const ref = useRef();

  const handlePhotoChange = (e) => {
    console.log(e.target.files[0]);
    setPhoto(e.target.files[0]);
  };

  const handleUpdateAvatar = async () => {
    const formData = new FormData();
    formData.append("avatar", photo);

    try {
      const response = await api.post(
        `${import.meta.env.VITE_BASE_URL}/profile/avatar`,
        formData
      );
      if (response.status == 200) {
        alert(`${response.data.message}`);
        console.log("edited ", response.data.user);
        dispatch({
          type: actions.profile.IMAGE_UPDATED,
          avatar: response.data.user.avatar,
        });
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setShowPhotoEdit(!showPhotoEdit);
    }
  };

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      {state?.user?.avatar ? (
        <img
          className="rounded-full"
          src={`${import.meta.env.VITE_BASE_URL}/uploads/avatar/${
            state?.user?.avatar
          }`}
        />
      ) : (
        <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
          <span className="">{state?.user?.firstName?.slice(0, 1)}</span>
        </div>
      )}
      {auth?.user?.id === state?.user?.id && (
        <div>
          <div>
            <button class="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80">
              <img
                src={editIcon}
                alt="Edit"
                onClick={() => {
                  ref.current.click();
                  setShowPhotoEdit(true);
                }}
              />
            </button>

            <form>
              <input
                type="file"
                name="photo"
                ref={ref}
                hidden
                onChange={handlePhotoChange}
              />
            </form>
          </div>

          {showPhotoEdit && photo && (
            <button
              onClick={handleUpdateAvatar}
              className=" w-full flex justify-center items-center btn"
            >
              <h1>Update? </h1>
              <img src={checkIcon} className="  w-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
