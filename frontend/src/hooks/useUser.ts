import {useDispatch, useSelector} from "react-redux";

import {createUser, findUserList, updateUser} from "../services/userService";
import {loadUserList, loadUserSelected} from "../slices/userSlice"

const useUser = () => {
    const dispatch = useDispatch();

    const {userList, userSelected} = useSelector((state: any) => state.user);

    const getUserList = () => {
        try {
            findUserList()
                .then((res: any) => {
                    dispatch(loadUserList(res));
                    console.log(res);
                });
        } catch (error) {
            throw error;
        }
    }

    const postUser = async (user: any) => {
        try {
            const record = await createUser(user);
            await getUserList();
            return record;
        } catch (error) {
            throw error;
        }
    }

    const putUser = async (user: any) => {
        try {
            const record = await updateUser(user);
            await getUserList();
            return record;
        } catch (error) {
            throw error;
        }
    }

    const setUserSelected = (user: any) => {
        dispatch(loadUserSelected(user));
    }

    return {
        userList,
        userSelected,
        getUserList,
        postUser,
        putUser,
        setUserSelected
    }
}

export default useUser;