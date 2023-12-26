import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';

// Login user
const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);

  const { user, accessToken } = result;

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User login successful',
    data: {
      user,
      token: accessToken,
    },
  });
});


// change password 
const changePassword = catchAsync(async (req, res) => {

  const result = await authServices.changePassword(req.body);


  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Password changed successfully',
    data: result
  });
})

export const authControllers = {
  loginUser,
  changePassword
};
