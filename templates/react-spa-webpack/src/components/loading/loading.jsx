import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/store/slices/loadingSlice';

function LoadingComponent() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading?.isLoading);

  const toggleLoading = () => {
    dispatch(setLoading(!isLoading));
  };

  return (
    <div>
      {isLoading ? <p>Loading...</p> : <p>Not Loading</p>}
      <button onClick={toggleLoading}>Toggle Loading</button>
    </div>
  );
}

export default LoadingComponent;
