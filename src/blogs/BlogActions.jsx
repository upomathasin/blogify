import React from "react";

export default function BlogActions({ blog }) {
  return (
    <div className="absolute right-0 top-0">
      <button>
        <img src={dots} alt="3dots of Action" />
      </button>

      <div className="action-modal-container">
        <button className="action-menu-item hover:text-lwsGreen">
          <img src="./assets/icons/edit.svg" alt="Edit" />
          Edit
        </button>
        <button className="action-menu-item hover:text-red-500">
          <img src="./assets/icons/delete.svg" alt="Delete" />
          Delete
        </button>
      </div>
    </div>
  );
}
