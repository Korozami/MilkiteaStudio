const GET_ALL_USER = "session/GET_ALL_USER";
const UPDATE_USER_INFO = "session/UPDATE_USER_INFO";
const UPDATE_CREDENTIALS = "session/UPDATE_CREDENTIALS";

const setAllUser = (users) => ({
	type: GET_ALL_USER,
	users
});

const updateUserInfoAction = (user) => ({
	type: UPDATE_USER_INFO,
	user
});

const updateCredentialAction = (user) => ({
	type: UPDATE_CREDENTIALS,
	user
});

export const fetchUsers = () => async (dispatch) => {
	try{
		const res = await fetch("/api/users/");

		if (res.ok) {
			const data = await res.json();
			dispatch(setAllUser(data));
			return data;
		} else {
			const errors = await res.json();
			return errors;
		}
	} catch (error) {
		console.error("Error fetching users", error)
		return error;
	}
}


export const updateUserInfo = (updateInfoData) => async (dispatch) => {
	try {
		const res = await fetch("/api/auth/update/info", {
			method: "PUT",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(updateInfoData)
		});

		if (res.ok) {
			const updatedData = await res.json();
			dispatch(updateUserInfoAction(updatedData))
			return updatedData;
		} else {
			const errors = await res.json();
			return errors;
		}
	} catch (error) {
		console.error("Error updating user info", error)
		return error;
	}
}


export const updateCredential = (updateInfoData) => async (dispatch) => {
	try {
		const res = await fetch("/api/auth/update/credential", {
			method: "PUT",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(updateInfoData)
		});

		if (res.ok) {
			const updatedData = await res.json();
			dispatch(updateCredentialAction(updatedData))
			return updatedData;
		} else {
			const errors = await res.json();
			return errors;
		}
	} catch (error) {
		console.error("Error updating user credential", error)
		return error;
	}
}

const initialState = {};

export default function userReducer(state = initialState, action) {
	let newState = { ...state };
	switch (action.type) {
		case GET_ALL_USER:
			const allUser = action.users;
			newState.users = allUser;
			return newState;
		case UPDATE_USER_INFO:
			newState[action.user.id] = action.user;
			return newState;
		case UPDATE_CREDENTIALS:
			newState[action.user.id] = action.user;
			return newState;
		default:
			return state;
	}
}
