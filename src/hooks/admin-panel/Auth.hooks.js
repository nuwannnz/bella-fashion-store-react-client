import { useSelector } from "react-redux";


export function useUserLoggedIn() {
    const userToken = useSelector((state) => state.staffLogin.auth.token);

    return userToken !== null;
}

export function useUserRole() {
    const userRole = useSelector(state => state.staffLogin.auth.userInfo.user.role);
    return userRole;
}