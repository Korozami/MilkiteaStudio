// const GET_ALL_IMAGES = "image/GET_ALL_IMAGES";
const GET_IMAGE_ID = "image/GET_IMAGE_ID";
const CREATE_IMAGE = "image/CREATE_IMAGE";
const DELETE_IMAGE = "image/DELETE_IMAGE";


// const setAllImages = (images) => ({
//     type: GET_ALL_IMAGES,
//     images
// })

const getImageId = (image) => ({
    type: GET_IMAGE_ID,
    image
})

const createImageAction = (image) => ({
    type: CREATE_IMAGE,
    image
})

const deleteImageAction = (image) => ({
    type: DELETE_IMAGE,
    image
})


export const fetchImageId = (imageId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/store/products/${imageId}/images`)

        if (res.ok) {
            const data = await res.json();
            dispatch(getImageId(data))
            return data;
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.error("Error fetching image", error)
        return error
    }
}


export const createImage = (productId, imageData) => async (dispatch) => {
    try {
        const res = await fetch(`/api/store/products/${productId}/images`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(imageData)
        })
        if (res.ok) {
            const data = await res.json();
            dispatch(createImageAction(data))
            return data;
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.error("Error creating image", error)
        return error
    }
}


export const deleteImage = (productId, imageId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/store/products/${productId}/images/${imageId}`, {
            method: "DELETE",
        });

        if (res.ok) {
            dispatch(deleteImageAction(imageId))
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.error("Error deleting image", error)
        return error
    }
}


const initialState = {};

export default function imageReducer(state = initialState, action) {
    let newState = { ...state };
    switch(action.type) {
        case GET_IMAGE_ID:
            newState[action.image.id] = action.image;
            return newState
        case CREATE_IMAGE:
            newState[action.image.id] = action.image;
            return newState
        case DELETE_IMAGE:
            delete newState[action.image];
            return newState;
        default:
            return newState;
    }
}
