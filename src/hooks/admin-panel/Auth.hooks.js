import { useSelector } from "react-redux";


export function useUserLoggedIn() {
    const userToken = useSelector((state) => state.staff.token);

    return userToken !== null;
}