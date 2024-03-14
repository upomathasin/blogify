import React, { useState } from "react";
import dots from "../assets/icons/3dots.svg";
import deleteIcon from "../assets/icons/delete.svg";
import editIcon from "../assets/icons/edit.svg";
import axios from "axios";
import { useAxios } from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
export default function BlogActions({ blog, handleDeleteBlog, handleEdit }) {
  const [showOption, setShowOption] = useState(false);

  const handleShowOption = (e) => {
    e.stopPropagation();
    setShowOption(!showOption);
  };

  return (
    <div className="absolute right-0 top-0">
      <button onClick={handleShowOption}>
        <img src={dots} alt="3dots of Action" />
      </button>

      {showOption && (
        <div className="action-modal-container">
          <button
            className="action-menu-item hover:text-lwsGreen"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(blog);
            }}
          >
            <img src={editIcon} alt="Edit" />
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteBlog(blog?.id);
            }}
            className="action-menu-item hover:text-red-500"
          >
            <img src={deleteIcon} alt="Delete" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
