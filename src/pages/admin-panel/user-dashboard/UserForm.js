import React, { useEffect, useState } from "react";
import OverlayPopup from "../../../components/common/OverlayPopup";
import TextBox from "../../../components/common/TextBox";
import SelectBox from "../../../components/common/SelectBox";
import { useSelector, useDispatch } from "react-redux";
import { getAllRolesAsync } from "../../../redux/actions/admin-panel/user-dashboard/role.actions";
import {
  addUserAsync,
  updateUserAsync,
} from "../../../redux/actions/admin-panel/user-dashboard/user.actions";
import ErrorMessage from "../../../components/common/ErrorMessage";

export function UserForm({ closeFormClickHandler, userToUpdate, closePopup }) {
  const roles = useSelector((state) => state.userDashboard.roles);
  const users = useSelector((state) => state.userDashboard.users);
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: userToUpdate ? userToUpdate.email : "",
    fName: userToUpdate ? userToUpdate.fName : "",
    lName: userToUpdate ? userToUpdate.lName : "",
    roleId: userToUpdate ? userToUpdate.roleId : "",
  });

  useEffect(() => {
    dispatch(getAllRolesAsync());
  }, []);



  const handleRoleSelected = (roleName) => {
    const selectedRole = roles.items.find((role) => role.name === roleName);
    if (!selectedRole) {
      return;
    }
    user.roleId = selectedRole._id;
    setUser({ ...user });
  };

  const handleFnameChanged = (fName) => {
    user.fName = fName;
    setUser({ ...user });
  };

  const handleEmailChanged = (email) => {
    user.email = email;
    setUser({ ...user });
  };

  const handleLNameChanged = (lName) => {
    user.lName = lName;
    setUser({ ...user });
  };

  const handleFormSubmit = () => {
    if (userToUpdate) {
      // update user
      dispatch(updateUserAsync(userToUpdate._id, user)).then(() => {
        closePopup();
      })
    } else {
      // add user
      dispatch(addUserAsync(user)).then(() => {
        closePopup();
      });;
    }
  };

  return (
    <OverlayPopup
      title={userToUpdate ? "Update user" : "Add new user"}
      onClosing={closePopup}
      onSubmit={handleFormSubmit}
      primaryActionText={userToUpdate ? "Update user" : "Add user"}
      isSubmitting={users.addingItem}
    >
      <div>
        <TextBox
          label="Email"
          animateTitle={false}
          placeholder="Enter the email here"
          value={user.email}
          onTextChange={handleEmailChanged}
        />
        <TextBox
          label="First name"
          animateTitle={false}
          value={user.fName}
          placeholder="Enter the first name here"
          onTextChange={handleFnameChanged}
        />
        <TextBox
          label="Last name"
          animateTitle={false}
          value={user.lName}
          placeholder="Enter the last name here"
          onTextChange={handleLNameChanged}
        />

        <span>{!roles.items && "Loading roles"}</span>
        {roles.items && (
          <SelectBox
            title="Role"
            onItemSelected={handleRoleSelected}
            optionValues={roles.items.map((role) => role.name)}
            selectedItem={userToUpdate ? userToUpdate.role?.name : null}
            placeholder="Select a role"
          />
        )}

        {users.addUserError && <ErrorMessage msg={users.addUserError} />}
      </div>
    </OverlayPopup>
  );
}
