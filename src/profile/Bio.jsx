import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useProfile from "../hooks/useProfile";
import editIcon from "../assets/icons/edit.svg";
import { useAxios } from "../hooks/useAxios";
import { actions } from "../actions";
import checkIcon from "../assets/checkIcon.png";
import useAuth from "../hooks/useAuth";
export default function Bio() {
  const { state, dispatch } = useProfile();
  const [edit, setShowEdit] = useState(false);
  const [bio, setBio] = useState(state?.user?.bio);
  const { api } = useAxios();
  const { auth } = useAuth();
  const handleEditProfile = async () => {
    const formData = new FormData();
    formData.append("bio", bio);

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_BASE_URL}/profile`,
        formData
      );
      if (response.status == 200) {
        alert(`${response.data.message}`);
        console.log("edited ", response.data.user);
        dispatch({
          type: actions.profile.USER_BIO_UPDATE,
          user: response.data.user,
          bio: response.data.user.bio,
        });
        setShowEdit(false);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div>
      <div className="mt-4 flex items-start gap-2 lg:mt-6">
        <div className="flex-1">
          {!edit ? (
            <p className="leading-[188%] text-gray-400 lg:text-lg">
              {state?.user?.bio}
            </p>
          ) : (
            <form>
              <textarea
                name="bio"
                rows={4}
                cols={55}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-[#030317]  border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                placeholder="Write your bio here.."
                defaultValue={bio}
              ></textarea>
            </form>
          )}
        </div>

        {auth?.user?.id === state?.user?.id && (
          <div>
            <button className="flex-center h-7 w-7 rounded-full">
              {!edit ? (
                <img
                  src={editIcon}
                  alt="Edit"
                  onClick={() => setShowEdit(true)}
                />
              ) : (
                <img src={checkIcon} onClick={handleEditProfile} />
              )}
            </button>
          </div>
        )}
      </div>

      {edit && (
        <button type="submit" className="mx-8">
          Update
        </button>
      )}
    </div>
  );
}
