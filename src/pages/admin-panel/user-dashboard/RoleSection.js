import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRolesAsync } from "../../../redux/actions/admin-panel/user-dashboard/role.actions";

export default function RoleSection() {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.userDashboard.roles);

  useEffect(() => {
    dispatch(getAllRolesAsync());
  }, []);
  return (
    <div className="tab-page">
      {roles.loading && <span>Loading</span>}
      {roles.items &&
        roles.items.map((role) => (
          <div>
            <h3>{role.name}</h3>
            <span>{role.userCount}</span>
          </div>
        ))}
    </div>
  );
}
