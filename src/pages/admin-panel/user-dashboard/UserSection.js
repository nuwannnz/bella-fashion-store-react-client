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
import { capitalizeString } from "../../../helpers/string.helper";
import AccentButton from "../../../components/common/AccentButton";

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

    <tr>
      <td>
        {user._id}
      </td>
      <td>
        {`${user.fName} ${user.lName}`}
      </td>
      <td>
        {user.email}
      </td>
      <td>
        <span class="badge badge-info">{capitalizeString(user.role.name)}</span>
      </td>
      <td>
        <button className="btn btn-sm btn-light mr-1" onClick={handleUpdateClick}>

          <i className="fas fa-pen"></i>


        </button>

        <button className="btn btn-sm btn-danger" onClick={handleDeleteClick}>
          {!user.deleting &&
            <i className="far fa-trash-alt"></i>
          }
          {user.deleting && (
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          )}
        </button>
      </td>
    </tr>
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
      <div className="d-flex justify-content-end mb-3">
        <div style={{ width: '20%' }}>

          <AccentButton
            text="Add user"
            onButtonClick={toggleDisplayUserForm} />
        </div>
      </div>

      {users.loading && <span>Loading</span>}


      <table className="orders-table table table-hover">

        <tr>
          <th scope="col">User id</th>
          <th scope="col">Full name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Actions</th>
        </tr>

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
      </table>

    </div>
  );
}
