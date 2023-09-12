import axios from 'axios';
import { CreateUser, GetUser, UpdateUser } from '../types/user.type';
import { API_URL } from '../utils/constants';


export const create_user = async (user: CreateUser) => {
    const response = await axios.post(`${API_URL}/user`, user);
    return response.data;
}

export const get_all_users = async () => {
    const response = await axios.get<{ users: GetUser[] }>(`${API_URL}/user`);
    return response.data;
}

export const update_user= async (id: number, user: UpdateUser) => {
    const { data } = await axios.put<{ ok: boolean }>(
        API_URL + '/user/' + id,
        user

    )
    return data;
}

export const delete_user = async (id: number) => {
    const response = await axios.delete(`${API_URL}/user/${id}`);
    return response.data;
}

