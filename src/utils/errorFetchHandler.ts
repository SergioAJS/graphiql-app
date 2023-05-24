import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export const errorFetchHandler = (error: FetchBaseQueryError | SerializedError) => {
  if (error) {
    if ('status' in error) {
      // you can access all properties of `FetchBaseQueryError` here
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data, null, '\t');
      return errMsg;
    } else {
      // you can access all properties of `SerializedError` here
      return error.message;
    }
  }
};
