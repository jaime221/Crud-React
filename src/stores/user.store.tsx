import React, { useState, useEffect } from 'react';
import {
    get_all_users,
    create_user,
    delete_user,
    update_user,

} from '../services/user.service';
import { CreateUser, GetUser, UpdateUser } from '../types/user.type';

const UseUserStore = () => {

    const [users, setUser] = useState<GetUser[]>([]);

    useEffect(() => {
        GetAllUser();
    }, []);
    const GetAllUser = async () => {
        try {
            const data = await get_all_users();
            setUser(data.users);
        } catch {

        }
    };
    const CreateUser = async (user: CreateUser) => {
        try {
            const data = await create_user(user);

            if (data.ok) {

                await GetAllUser();
            } else {

            }
        } catch (error) {

        }
    };
    const DeleteUser = async (id: number) => {
        try {
            const data = await delete_user(id);

            if (data.ok) {
                  await GetAllUser();
            }
        } catch {

        }
    };
    const UpdateUser = async (id: number, user: UpdateUser) => {
        try {
            const data = await update_user(id, user);

            if (data.ok) {

                await GetAllUser();
            } else {
            }
        } catch (error) {

        }
    };
    return {
        users,
        GetAllUser,
        CreateUser,
        DeleteUser,
        UpdateUser,
    };
};

export default UseUserStore;
