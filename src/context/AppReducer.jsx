// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case "REMOVE_FORM":
      return state.filter((form) => form.id !== action.payload);
    case "ADD_FORM":
      return [action.payload, ...state];
    case "EDIT_FORM":{
      const updateForms = state.map((form) => {
        if (form.id === action.payload.id) {
          return action.payload;
        }
        return form;
      });
      return updateForms;
    }

    default:
      return state;
  }
};
