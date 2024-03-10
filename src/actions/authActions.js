import * as api from '../api/authApi';

export const register = ({ username, password, role, navigateTo }) => async (dispatch) => {
  try {
    const data = await api.registerUser({ username, password, role });
    dispatch({ type: 'REGISTER_SUCCESS', payload: data });
    navigateTo('/authentication/sign-in')

  } catch (error) {
    dispatch({ type: 'REGISTER_FAILURE', payload: error });
  }
};
export const login = ({ username, password, navigateTo}) => async (dispatch) => {
  try {
    const data = await api.loginUser({ username, password });
    dispatch({ type: 'LOGIN_SUCCESS', payload: data });
    localStorage.setItem("currentUser", JSON.stringify(data))
    navigateTo('/profile')
    
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error });
  }
};

