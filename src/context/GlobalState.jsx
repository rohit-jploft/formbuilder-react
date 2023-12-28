import PropTypes from 'prop-types';
import React, {useMemo,useReducer,useCallback, createContext} from "react";

import AppReducer from "./AppReducer";

// Initial State
const initialState = [
  {
    id: "10001",
    name: "Employee Form",
    createdate: "18 Feb, 2022",
    fields: [
      {
        title: "Firstname",
        name: "text",
      },
      {
        title: "Lastname",
        name: "text",
      },
      {
        title: "Gender",
        name: "radio",
      },
      {
        title: "Address",
        name: "multi line",
      },
    ],
  },
  {
    id: "10002",
    name: "Contact Form",
    createdate: "19 Feb, 2022",
    fields: [
      {
        title: "Firstname",
        name: "text",
      },
      {
        title: "Lastname",
        name: "text",
      },
      {
        title: "Gender",
        name: "radio",
      },
      {
        title: "Address",
        name: "multi line",
      },
    ],
  },
];

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component


export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  const removeForm = useCallback((id) => {
    dispatch({
      type: "REMOVE_FORM",
      payload: id,
    });
  },[]);
  const addForm = useCallback((form) => {
    dispatch({
      type: "ADD_FORM",
      payload: form,
    });
  }, [dispatch]);
  const editForm = useCallback((form) => {
    dispatch({
      type: "EDIT_FORM",
      payload: form,
    });
  }, [dispatch]);
 
  const contextValue = useMemo(() => ({
    state,
    removeForm,
    addForm,
    editForm,
  }), [state, removeForm, addForm, editForm]);

  return (
    <GlobalContext.Provider
      value={contextValue}
    >
      {children}
    </GlobalContext.Provider>
  );
};
GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
