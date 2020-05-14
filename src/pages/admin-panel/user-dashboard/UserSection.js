import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsersAsync } from "../../../redux/actions/admin-panel/user-dashboard/user.actions";
import OverlayPopup from "../../../components/common/OverlayPopup";
import UserForm from "./UserForm";

const UserEntry = ({ user, onEditClick, onDeleteClick }) => {
  const styles = {
    card: {
      margin: "10px 0px",
    },
  };

  return (
    <div className="card" style={styles.card}>
      <h4>{`${user.fName} ${user.lName}`}</h4>
      <span className="role-name">{user.role.name}</span>
    </div>
  );
};

export default function UserSection() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userDashboard.users);

  const [displayUserForm, setDisplayUserForm] = useState(false);

  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, []);

  const toggleDisplayUserForm = () => {
    setDisplayUserForm(!displayUserForm);
  };

  return (
    <div className="tab-page">
      <button onClick={toggleDisplayUserForm}>Add user</button>

      {users.loading && <span>Loading</span>}

      {users.items &&
        users.items.map((user, i, a) => <UserEntry key={i} user={user} />)}

      {displayUserForm && (
        <UserForm closeFormClickHandler={toggleDisplayUserForm} />
      )}
    </div>
  );
}
