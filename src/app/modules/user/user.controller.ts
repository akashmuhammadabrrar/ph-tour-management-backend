/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response, } from "express";
import httpStatus from "http-status-codes"
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/CatchAsync";
import { sendResponse } from "../../utils/sendResponse";
// import AppError from "../../errorHelpers/AppError";



// const createUser = async (req: Request,res:Response,next: NextFunction) => {
//   try {
//     // throw new Error ("Fake error")
//     // throw new AppError(httpStatus.BAD_REQUEST,"Fake Error")
    
//     const user = await UserServices.createUser(req.body)
    
//     res.status(httpStatus.CREATED).json({
//         message: "User Created successfully",
//         user
//     })
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     console.log(error)
//    next(error)
//   }
// }

const createUser = catchAsync( async (req: Request,res:Response,next: NextFunction) => {
  const user = await UserServices.createUser(req.body)
  // res.status(httpStatus.CREATED).json({
  //   message: "User created successfullyl",
  //   user
  // })

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Created Successfull",
    data:user,
  })
})

const getAllUsers = catchAsync( async(req: Request,res:Response,next: NextFunction) => {
  const result = await UserServices.getAllUsers ();

 sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "All Users RetriveSuccessfull",
    data:result.data,
    meta: result.meta
  })
})



export const userController ={
    createUser,
    getAllUsers
}

// route matching -> controller -> service -> model -> DB