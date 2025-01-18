import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 10, 
	like: false,
  },
  reducers: {
    increment: state => {
      state.value++
    },
    decrement: state => {
      state.value--
    },
    liked: state => {
		state.like = true
    },
    disLiked: state => {
		state.like = false
    }
    
  }
})

export const { increment, decrement, liked, disLiked } = counterSlice.actions

export default counterSlice.reducer