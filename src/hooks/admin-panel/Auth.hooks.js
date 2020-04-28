import { useSelector } from "react-redux";


export function useUserLoggedIn() {
    const userToken = useSelector((state) => state.staffLogin.auth.token);

    return userToken !== null;
}