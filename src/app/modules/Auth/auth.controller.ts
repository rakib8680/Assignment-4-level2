import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User login successful',
    data: {
      user: result,
      token: null,
    },
  });
});

export const authControllers = {
  loginUser,
};
