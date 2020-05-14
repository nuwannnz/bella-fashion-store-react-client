import React, { useEffect, useState } from "react";
import OverlayPopup from "../../../components/common/OverlayPopup";
import TextBox from "../../../components/common/TextBox";
import SelectBox from "../../../components/common/SelectBox";
import { useSelector, useDispatch } from "react-redux";
import { getAllRolesAsync } from "../../../redux/actions/admin-panel/user-dashboard/role.actions";
import { addUserAsync } from "../../../redux/actions/admin-panel/user-dashboard/user.actions";

export default function UserForm({ closeFormClickHandler }) {
  const roles = useSelector((state) => state.userDashboard.roles);
  const users = useSelector((state) => state.userDashboard.users);
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    fName: "",
    lName: "",
    roleId: "",
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
    setUser(user);
  };

  const handleFnameChanged = (fName) => {
    user.fName = fName;
    setUser(user);
  };

  const handleEmailChanged = (email) => {
    user.email = email;
    setUser(user);
  };

  const handleLNameChanged = (lName) => {
    user.lName = lName;
    setUser(user);
  };

  const handleFormSubmit = () => {
    dispatch(addUserAsync(user));
  };

  return (
    <OverlayPopup
      title="Add new user"
      onClosing={closeFormClickHandler}
      onSubmit={handleFormSubmit}
      primaryActionText="Add user"
      isSubmitting={users.addingItem}
    >
      <div>
        <TextBox
          label="Email"
          animateTitle={false}
          placeholder="Enter the email here"
          onTextChange={handleEmailChanged}
        />
        <TextBox
          label="First name"
          animateTitle={false}
          placeholder="Enter the first name here"
          onTextChange={handleFnameChanged}
        />
        <TextBox
          label="Last name"
          animateTitle={false}
          placeholder="Enter the last name here"
          onTextChange={handleLNameChanged}
        />

        <span>{!roles.items && "Loading roles"}</span>
        {roles.items && (
          <SelectBox
            title="Role"
            onItemSelected={handleRoleSelected}
            optionValues={roles.items.map((role) => role.name)}
            placeholder="Select a role"
          />
        )}
      </div>
    </OverlayPopup>
  );
}
