import pkg from '@reduxjs/toolkit';
const { createSlice, configureStore } = pkg;

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    incremented: state => {
      state.value += 1;
    },
    decremented: state => {
      state.value -= 1;
    }
  }
});

console.log(counterSlice, "<<cs");
export const { incremented, decremented } = counterSlice.actions;

const store = configureStore({
  reducer: counterSlice.reducer
});

store.subscribe(() => console.log(store.getState()));

store.dispatch(incremented());
// {value: 1}
store.dispatch(incremented());
// {value: 2}
store.dispatch(decremented());
// {value: 1}