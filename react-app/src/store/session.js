// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GET_ALL_USER = "session/GET_ALL_USER";
const UPDATE_USER_INFO = "session/UPDATE_USER_INFO";
const UPDATE_CREDENTIALS = "session/UPDATE_CREDENTIALS";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const setAllUser = (user) => ({
	type: GET_ALL_USER,
	user
});

const updateUserInfoAction = (user) => ({
	type: UPDATE_USER_INFO,
	user
});

const updateCredentialAction = (user) => ({
	type: UPDATE_CREDENTIALS,
	user
});

const initialState = { user: null };

export const fetchUsers = () => async (dispatch) => {
	try{
		const res = await fetch("/api/users");

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


export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (first_name, last_name, username, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			first_name,
			last_name,
			username,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export default function reducer(state = initialState, action) {
	let newState = { ...state };
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case GET_ALL_USER:
			const allUser = action.users;
			newState.user = allUser;
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
