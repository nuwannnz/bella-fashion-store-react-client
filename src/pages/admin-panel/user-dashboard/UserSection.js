import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsersAsync } from "../../../redux/actions/admin-panel/user-dashboard/user.actions";
import OverlayPopup from "../../../components/common/OverlayPopup";

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

  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, []);

  const handleAddUserBtnClick = () => {};

  return (
    <div className="tab-page">
      <button onClick={handleAddUserBtnClick}>Add user</button>

      {users.loading && <span>Loading</span>}

      {users.items &&
        users.items.map((user, i, a) => <UserEntry key={i} user={user} />)}

      <OverlayPopup>
        <div>
          <span>Add user</span>
        </div>
      </OverlayPopup>
    </div>
  );
}
