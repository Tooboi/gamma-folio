import { useReducer } from 'react';

export const reducer = (state, action) => {
    
}


export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
  }