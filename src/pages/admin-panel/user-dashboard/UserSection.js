import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllUsersAsync,
  deleteUserAsync,
} from "../../../redux/actions/admin-panel/user-dashboard/user.actions";
import { UserForm } from "./UserForm";
import {
  displayOverlayPopup,
  displayPopup,
} from "../../../components/common/OverlayPopup";
import { openPopup } from "../../../redux/actions/popup.actions";
import { POPUP_KEYS } from "../../../constants";
import { usePopup } from "../../../hooks/Popup.hooks";

const UserEntry = ({
  user,
  onEditClick,
  onDeleteClick,
  isCurrentAdmin = false,
}) => {
  const styles = {
    card: {
      margin: "10px 0px",
    },
    roleName: {
      backgroundColor: "#b3ddff",
      padding: "1px 11px",
      borderRadius: "10px",
      fontSize: "13px",
      marginBottom: "5px",
      display: "inline-block",
    },
  };

  const handleDeleteClick = () => {
    onDeleteClick(user);
  };

  const handleUpdateClick = () => {
    onEditClick(user);
  };

  return (
    <div className="card" style={styles.card}>
      <div className="flex justify-content-between align-items-center">
        <div>
          <span className="role-name" style={styles.roleName}>
            {user.role.name}
          </span>
          <h4>{`${user.fName} ${user.lName}`}</h4>
        </div>
        {!isCurrentAdmin && (
          <div className="action-group ">
            <button onClick={handleUpdateClick} className="btn btn-info">
              <i className="fas fa-pen"></i>
            </button>
            <button onClick={handleDeleteClick} className="btn btn-info ml-1">
              <i className="far fa-trash-alt"></i>
            </button>
          </div>
        )}
      </div>

      {user.deleting && (
        <div>
          <span>Deleting user</span>
        </div>
      )}
    </div>
  );
};

export default function UserSection() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userDashboard.users);
  const loggedInUserId = useSelector(
    (state) => state.staffLogin.auth.userInfo.id
  );


  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, []);



  const toggleDisplayUserForm = () => {
    dispatch(openPopup(POPUP_KEYS.USER_POPUP));
  };

  const handleDeleteClick = (user) => {
    dispatch(deleteUserAsync(user._id));
  };

  const handleUpdateClick = (user) => {
    toggleDisplayUserForm();
    dispatch(openPopup(POPUP_KEYS.USER_POPUP, { userToUpdate: user }));
  };

  return (
    <div className="tab-page">
      <button onClick={toggleDisplayUserForm}>Add user</button>

      {users.loading && <span>Loading</span>}

      {users.items &&
        users.items.map((user, i, a) => (
          <UserEntry
            key={i}
            user={user}
            onDeleteClick={handleDeleteClick}
            onEditClick={handleUpdateClick}
            isCurrentAdmin={user._id === loggedInUserId}
          />
        ))}


    </div>
  );
}
