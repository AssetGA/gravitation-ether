export const globalActions = {
  setConnect: (state, action) => {
    state.connect = action.payload;
  },
  setWallet: (state, action) => {
    state.wallet = action.payload;
  },
  setTokenBalance: (state, action) => {
    state.tokenBalance = action.payload;
  },
  setCrowdsaleBalance: (state, action) => {
    state.crowdsaleBalance = action.payload;
  },
  setAccountBalance: (state, action) => {
    state.accountBalance = action.payload;
  },
  setProjectNames: (state, action) => {
    state.projectNames = action.payload;
  },
  setPermission: (state, action) => {
    state.permission = action.payload;
  },
  setError: (state, action) => {
    state.error = action.payload;
  },
};
