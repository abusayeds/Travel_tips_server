import { TErrorSoureces, TGenericErrorResponse } from "../interface/error";


const handleDuplicateError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any): TGenericErrorResponse => {
    
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const  errorSoures: TErrorSoureces = [
    {
        path: '',
        message: `${extractedMessage} is already exists`,
    }
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: " value alreday exists  ",
     errorSoures,
  };
};
export default handleDuplicateError ;