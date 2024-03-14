import React, { useRef, useState } from "react";
import useProfile from "../hooks/useProfile";
import editIcon from "../assets/icons/edit.svg";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import ProfileImage from "./ProfileImage";
import Bio from "./Bio";

export default function ProfileInfo() {
  const { state } = useProfile();

  const [edit, setShowEdit] = useState(false);
  
  const { register, handleSubmit } = useForm();
  const ref = useRef();
  const [photo, setPhoto] = useState(null);
 
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <ProfileImage></ProfileImage>
      <div>
        <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
          {state?.user?.firstName} {state?.user?.lastName}
        </h3>
        <p className="leading-[231%] lg:text-lg">{state?.user?.email}</p>
      </div>

      <Bio></Bio>
      <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
    </div>
  );
}
