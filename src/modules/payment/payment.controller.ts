import httpStatus from "http-status";
import sendResponse from "../../app/middlwares/responseHandle";
import catchAsync from "../../app/utils/catechAsync-funtion";
import { paymentService } from "./payment.servise";
import { Request, Response } from "express";

const payment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await paymentService.cratePaymentDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "payment successfully ! ",
    data: result,
  });
});

const confirmationController = async (req: Request, res: Response) => {
  const { id } = req.query;
  await paymentService.confirmationService(id as string);
  res.setHeader("Content-Type", "text/html");
  res.send(`
      <div
        style="position:fixed;top:0;left:0;right:0;bottom:0;padding:16px;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;width:100%;height:100%;z-index:1000;overflow:auto;font-family:sans-serif;background-color:rgba(0,0,0,0.5);">
        <div style="width:100%;max-width:28rem;background-color:white;box-shadow:0 4px 6px rgba(0,0,0,0.1);border-radius:0.5rem;padding:24px;position:relative;box-sizing:border-box;">
         
          <div style="margin-top:32px;margin-bottom:32px;text-align:center;">
            <svg xmlns="http://www.w3.org/2000/svg" style="width:56px;fill:green;" viewBox="0 0 512 512">
              <path
                d="M383.841 171.838c-7.881-8.31-21.02-8.676-29.343-.775L221.987 296.732l-63.204-64.893c-8.005-8.213-21.13-8.393-29.35-.387-8.213 7.998-8.386 21.137-.388 29.35l77.492 79.561a20.687 20.687 0 0 0 14.869 6.275 20.744 20.744 0 0 0 14.288-5.694l147.373-139.762c8.316-7.888 8.668-21.027.774-29.344z"
                data-original="#000000" />
              <path
                d="M256 0C114.84 0 0 114.84 0 256s114.84 256 256 256 256-114.84 256-256S397.16 0 256 0zm0 470.487c-118.265 0-214.487-96.214-214.487-214.487 0-118.265 96.221-214.487 214.487-214.487 118.272 0 214.487 96.221 214.487 214.487 0 118.272-96.215 214.487-214.487 214.487z"
                data-original="#000000" />
            </svg>
            <h4 style="font-size:1.25rem;color:#2d3748;font-weight:600;margin-top:16px;">Payment Successfully completed!</h4>
            <p style="font-size:0.875rem;color:#718096;margin-top:16px;">Your order is completely successful and thank you for the next one </p>
          </div>
          <div style="display: flex; justify-content: center; margin-top: 16px;">



            <a href="https://travel-tips-client-delta.vercel.app/profile" style="text-decoration: none; background-color: #2d3748; color: white; padding: 10px 20px; border-radius: 5px; transition: background-color 0.3s;">
              Back to Profile
            </a>


          </div>
        </div>
      </div>
      <style>
        @media (max-width: 600px) {
          div {
            padding: 8px; /* Smaller padding on small devices */
          }
          .modal-content {
            padding: 16px; /* Smaller padding for the modal */
            width: 90%; /* Allow modal to take more width */
            max-width: 90%; /* Ensure it doesn't exceed screen width */
          }
          h4 {
            font-size: 1.1rem; /* Slightly smaller heading */
          }
          p {
            font-size: 0.8rem; /* Slightly smaller text */
          }
        }
      </style>
    `);
};

const failedController = async (req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/html");
  res.send(`
      <div
        style="position:fixed;top:0;left:0;right:0;bottom:0;padding:16px;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;width:100%;height:100%;z-index:1000;overflow:auto;font-family:sans-serif;background-color:rgba(0,0,0,0.5);">
        <div style="width:100%;max-width:28rem;background-color:white;box-shadow:0 4px 6px rgba(0,0,0,0.1);border-radius:0.5rem;padding:24px;position:relative;box-sizing:border-box;">
          
  
        <div style="margin-top:32px;margin-bottom:32px;text-align:center;">
    <svg xmlns="http://www.w3.org/2000/svg" style="width:56px;" viewBox="0 0 512 512">
      <!-- X Path in red -->
      <path style="fill:red;" d="M331.31 331.31c8.49-8.49 8.49-22.26 0-30.75L274.75 256l56.56-56.56c8.49-8.49 8.49-22.26 0-30.75s-22.26-8.49-30.75 0L256 225.25l-56.56-56.56c-8.49-8.49-22.26-8.49-30.75 0s-8.49 22.26 0 30.75L225.25 256l-56.56 56.56c-8.49 8.49-8.49 22.26 0 30.75s22.26 8.49 30.75 0L256 286.75l56.56 56.56c8.49 8.49 22.26 8.49 30.75 0z" />
      
      <!-- Circle Path -->
      <path d="M256 0C114.84 0 0 114.84 0 256s114.84 256 256 256 256-114.84 256-256S397.16 0 256 0zm0 470.487c-118.265 0-214.487-96.214-214.487-214.487 0-118.265 96.221-214.487 214.487-214.487 118.272 0 214.487 96.221 214.487 214.487 0 118.272-96.215 214.487-214.487 214.487z" />
    </svg>
    <h4 style="font-size:1.25rem;color:#2d3748;font-weight:600;margin-top:16px;">Order Failed!</h4>
    <p style="font-size:0.875rem;color:#718096;margin-top:16px;">Something went wrong. Please try again later.</p>
  </div>
  
  
          <div style="display: flex; justify-content: center; margin-top: 16px;">


            <a href="https://travel-tips-client-delta.vercel.app/profile" style="text-decoration: none; background-color: #2d3748; color: white; padding: 10px 20px; border-radius: 5px; transition: background-color 0.3s;">
              Back to home 
            </a>



          </div>
        </div>
      </div>
      <style>
        @media (max-width: 600px) {
          div {
            padding: 8px; /* Smaller padding on small devices */
          }
          .modal-content {
            padding: 16px; /* Smaller padding for the modal */
            width: 90%; /* Allow modal to take more width */
            max-width: 90%; /* Ensure it doesn't exceed screen width */
          }
          h4 {
            font-size: 1.1rem; /* Slightly smaller heading */
          }
          p {
            font-size: 0.8rem; /* Slightly smaller text */
          }
        }
      </style>
    `);
};

export const paymentController = {
  payment,
  confirmationController,
  failedController,
};
