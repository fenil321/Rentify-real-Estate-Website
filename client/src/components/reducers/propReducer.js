export const INITIAL_STATE = {
    userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
    title: "",
    type: "",
    house_Image: "",
    photos: [],
    desc: "",
    city: "",
    adress: "",
    BHK: "",
    distance: "",
    features: [],
    price: 0,
  };
  
  export const propReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_INPUT":
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      case "ADD_IMAGES":
        return {
          ...state,
          house_Image: action.payload.house_Image,
          photos: action.payload.photos,
        };
      case "ADD_FEATURE":
        return {
          ...state,
          features: [...state.features, action.payload],
        };
      case "REMOVE_FEATURE":
        return {
          ...state,
          features: state.features.filter(
            (feature) => feature !== action.payload
          ),
        };
  
      default:
        return state;
    }
  };
  