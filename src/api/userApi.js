import axios from 'axios';

const url = 'http://localhost:8000/api/users';

export const fetchUsers = () => axios.get(url) ;
export const updateUser =(id, updatedUser) => axios.put(`${url}/${id}`, updatedUser);
export const deleteUser =(id) => axios.delete(`${url}/${id}`);
export const fetchUser = (id) =>axios.get(`${url}/${id}`);
