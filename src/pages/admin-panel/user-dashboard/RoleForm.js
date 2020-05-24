import React, { useState } from 'react'
import OverlayPopup from '../../../components/common/OverlayPopup'
import TextBox from '../../../components/common/TextBox'
import { useDispatch } from 'react-redux';
import { createRoleAsync, updateRoleAsync } from '../../../redux/actions/admin-panel/user-dashboard/role.actions';
import ErrorMessage from '../../../components/common/ErrorMessage';


const defaultPermissions = {
    user: {
        read: false,
        write: false
    },
    category: {
        read: false,
        write: false
    },
    product: {
        read: false,
        write: false
    },
    order: {
        read: false,
        write: false
    },
    customer: {
        read: false,
        write: false
    },
    inquiry: {
        read: false,
        write: false
    },
    sales: {
        read: false,
        write: false
    },

}
export default function RoleForm({ closePopup, roleToUpdate }) {

    const dispatch = useDispatch();
    const [roleName, setRoleName] = useState(roleToUpdate ? roleToUpdate.name : '')
    const [permissions, setPermissions] = useState(roleToUpdate ? roleToUpdate.permissions : defaultPermissions)

    const [validationError, setValidationError] = useState("")

    const onCheckChange = (permission, mode, checked) => {
        const newPermission = permissions;
        newPermission[permission][mode] = checked
        setPermissions({ ...newPermission })
    }

    const handleSubmit = () => {
        setValidationError('')
        if (roleName.length === 0) {
            setValidationError('Role name is required');
            return;
        }
        if (roleToUpdate) {
            dispatch(updateRoleAsync(roleToUpdate._id, { name: roleName, permissions })).then(success => {
                if (success) {
                    closePopup();
                }
            })
        } else {

            dispatch(createRoleAsync({ name: roleName, permissions })).then((success) => {
                if (success) {
                    closePopup();
                }
            })
        }
    }

    return (
        <OverlayPopup
            title={roleToUpdate ? 'Update role' : 'Add new role'}
            onClosing={closePopup}
            onSubmit={handleSubmit}
            primaryActionText={roleToUpdate ? 'Update role' : 'Add new role'}
        >

            <div>
                <TextBox
                    label="Role name"
                    onTextChange={(text) => setRoleName(text)}
                    value={roleName}
                    placeholder="Enter role name here" />

                <table class="table table-borderless">
                    <thead>
                        <tr>
                            <th scope="col">Permission name</th>
                            <th scope="col">Read</th>
                            <th scope="col">Write</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>User</td>
                            <td>
                                <input type="checkbox" checked={permissions.user.read} onChange={(e) => onCheckChange('user', 'read', e.target.checked)} />
                            </td>
                            <td>
                                <input type="checkbox" checked={permissions.user.write} onChange={(e) => onCheckChange('user', 'write', e.target.checked)} />
                            </td>
                        </tr>
                        <tr>
                            <td>Category</td>
                            <td>
                                <input type="checkbox" checked={permissions.category.read} onChange={(e) => onCheckChange('category', 'read', e.target.checked)} />
                            </td>
                            <td>
                                <input type="checkbox" checked={permissions.category.write} onChange={(e) => onCheckChange('category', 'write', e.target.checked)} />
                            </td>
                        </tr>
                        <tr>
                            <td>Product</td>
                            <td>
                                <input type="checkbox" checked={permissions.product.read} onChange={(e) => onCheckChange('product', 'read', e.target.checked)} />
                            </td>
                            <td>
                                <input type="checkbox" checked={permissions.product.write} onChange={(e) => onCheckChange('product', 'write', e.target.checked)} />
                            </td>
                        </tr>
                        <tr>
                            <td>Order</td>
                            <td>
                                <input type="checkbox" checked={permissions.order.read} onChange={(e) => onCheckChange('order', 'read', e.target.checked)} />
                            </td>
                            <td>
                                <input type="checkbox" checked={permissions.order.write} onChange={(e) => onCheckChange('order', 'write', e.target.checked)} />
                            </td>
                        </tr>
                        <tr>
                            <td>Customer</td>
                            <td>
                                <input type="checkbox" checked={permissions.customer.read} onChange={(e) => onCheckChange('customer', 'read', e.target.checked)} />
                            </td>
                            <td>
                                <input type="checkbox" checked={permissions.customer.write} onChange={(e) => onCheckChange('customer', 'write', e.target.checked)} />
                            </td>
                        </tr>
                        <tr>
                            <td>Inquiry</td>
                            <td>
                                <input type="checkbox" checked={permissions.inquiry.read} onChange={(e) => onCheckChange('inquiry', 'read', e.target.checked)} />
                            </td>
                            <td>
                                <input type="checkbox" checked={permissions.inquiry.write} onChange={(e) => onCheckChange('inquiry', 'write', e.target.checked)} />
                            </td>
                        </tr>
                        <tr>
                            <td>Sales</td>
                            <td>
                                <input type="checkbox" checked={permissions.sales.read} onChange={(e) => onCheckChange('sales', 'read', e.target.checked)} />
                            </td>
                            <td>
                                <input type="checkbox" checked={permissions.sales.write} onChange={(e) => onCheckChange('sales', 'write', e.target.checked)} />
                            </td>
                        </tr>
                    </tbody>

                </table>
                {validationError.length > 0 && <ErrorMessage msg={validationError} />}
            </div>
        </OverlayPopup>
    )
}
