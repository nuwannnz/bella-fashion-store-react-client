import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRolesAsync, deleteRoleAsync } from "../../../redux/actions/admin-panel/user-dashboard/role.actions";
import { capitalizeString } from "../../../helpers/string.helper";
import AccentButton from "../../../components/common/AccentButton";
import { openPopup } from "../../../redux/actions/popup.actions";
import { POPUP_KEYS } from "../../../constants";

export default function RoleSection() {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.userDashboard.roles);


  const handleRoleUpdateClick = (role) => {
    dispatch(openPopup(POPUP_KEYS.ROLE_POPUP, { roleToUpdate: role }))
  }

  const handleRoleDeleteClick = (role) => {
    dispatch(deleteRoleAsync(role._id))
  }
  useEffect(() => {
    dispatch(getAllRolesAsync());
  }, []);
  return (
    <div className="tab-page">

      <div className="d-flex justify-content-end mb-3">
        <div style={{ width: '20%' }}>
          <AccentButton text="Add new role" onButtonClick={() => dispatch(openPopup(POPUP_KEYS.ROLE_POPUP))} />
        </div>
      </div>

      {roles.loading && <span>Loading</span>}


      <table className="orders-table table table-hover">

        <tr>
          <th scope="col">Role id</th>
          <th scope="col">Role name</th>
          <th scope="col">User count</th>
          <th scope="col">Actions</th>
        </tr>
        {roles.items &&
          roles.items.map((role) => (
            <RoleEntry
              role={role}
              handleDeleteClick={handleRoleDeleteClick}
              handleUpdateClick={handleRoleUpdateClick}
            />
          ))}
      </table>
    </div>
  );
}

function RoleEntry({ role, handleUpdateClick, handleDeleteClick }) {

  const [deleting, setDeleting] = useState(false);

  const onDeleteClick = () => {
    setDeleting(true);
    handleDeleteClick(role);
  }
  return (
    <tr>
      <td>
        {role._id}
      </td>
      <td>
        {capitalizeString(role.name)}
      </td>
      <td>
        {role.userCount || '0'}
      </td>
      <td>
        <button className="btn btn-sm btn-light mr-1" onClick={() => handleUpdateClick(role)}>

          <i className="fas fa-pen"></i>


        </button>

        <button className="btn btn-sm btn-danger" onClick={onDeleteClick}>
          {!deleting &&
            <i className="far fa-trash-alt"></i>
          }
          {deleting && (
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          )}
        </button>
      </td>
    </tr>
  )
}
