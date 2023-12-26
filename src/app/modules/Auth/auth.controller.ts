import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';

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

export const authControllers = {
  loginUser,
};
