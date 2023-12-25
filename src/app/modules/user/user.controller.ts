import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';

const registerUser = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await userServices.registerUser(user);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  });
});

export const userControllers = {
  registerUser,
};
