const initialState = {
    isLogin:false,
    userData: {},
    openPanel:false
  };
  
  const reduce = (state = initialState, action) => {
    switch (action.type) {
      case "IS_LOGIN": {
        return {
          ...state,
          isLogin: !state.isLogin
        };
      }

      case "OPEN_PANEL": {
        return {
          ...state,
          openPanel: !state.openPanel
        };
      }

      case "SET_DATA": {
        return {
          ...state,
          userData: action.payload
        };
      }
  
      default:
        return state;
    }
  };
  
  export default reduce;