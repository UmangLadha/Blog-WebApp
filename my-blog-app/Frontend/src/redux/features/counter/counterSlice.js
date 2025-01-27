import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 10, 
	like: false,
  },
  reducers: {
    liked: (state) => {
		state.like = true
		state.value++
    },
    disLiked: state => {
		state.like = false
		state.value--
    }
    
  }
})

export const { increment, decrement, liked, disLiked } = counterSlice.actions

export default counterSlice.reducer