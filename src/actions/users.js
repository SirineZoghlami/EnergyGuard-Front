import * as api from '../api/userApi';

 export const getUsers = () => async (dispatch) => {
    
    try { 
        const { data } = await api.fetchUsers();
        dispatch({ type: 'FETCH_ALL', payload: data});
    }
    catch (error){
        console.log(error.message);
    }
}
// export const createUser = (user) => async (dispatch) => {
// try {
// const { data } = await api.createUser(user);
// dispatch({ type: 'CREATE', payload: data });
// } catch (error) {
// console.log(error);
// }
// }
export const updateUser = (id, user) => async (dispatch) => {
    try {
        const { data } = await api.updateUser(id, user);
        dispatch({ type: 'UPDATE', payload: data });

    } catch (error) {
       console.log(error); 
    }
}
export const getUser = (id, user) => async (dispatch) => {
    try {
        const { data } = await api.fetchUser(id);
        dispatch({ type: 'GETUSER', payload: data });

    } catch (error) {
       console.log(error); 
    }
}
export const deleteUser = (id) => async (dispatch) => {
    try {
       await api.deleteUser(id);
       dispatch({ type: 'DELETE', payload: id});
       // Navigate to the sign-in page after successfully deleting the user
       navigateTo('/authentication/sign-in');
    } catch (error) {
        console.log(error);
    }
}

