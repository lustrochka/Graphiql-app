import  {handleSubmit}  from '../../../components/Auth/handleSubmit';
import { logInWithEmailAndPassword, registerWithEmailAndPassword } from '../../../lib/firebase';
import { NextRouter } from 'next/router';


jest.mock('../../../lib/firebase', () => ({
  logInWithEmailAndPassword: jest.fn(),
  registerWithEmailAndPassword: jest.fn(),
}));

describe('handleSubmit', () => {
  const mockRouter = {
    push: jest.fn(),
  } as unknown as NextRouter;

  const mockSetSubmitting = jest.fn();
  const mockSetErrors = jest.fn();

  const formikHelpers = {
    setSubmitting: mockSetSubmitting,
    setErrors: mockSetErrors,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call registerWithEmailAndPassword and router.push when isSignUp is true', async () => {
    const values = { email: 'test@example.com', password: 'password123' };

    await handleSubmit(values, formikHelpers, mockRouter, true);

    expect(registerWithEmailAndPassword).toHaveBeenCalledWith(values.email, values.password);
    expect(logInWithEmailAndPassword).not.toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith('/');
    expect(mockSetSubmitting).toHaveBeenCalledWith(false);
  });

  it('should call logInWithEmailAndPassword and router.push when isSignUp is false', async () => {
    const values = { email: 'test@example.com', password: 'password123' };

    await handleSubmit(values, formikHelpers, mockRouter, false);

    expect(logInWithEmailAndPassword).toHaveBeenCalledWith(values.email, values.password);
    expect(registerWithEmailAndPassword).not.toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith('/');
    expect(mockSetSubmitting).toHaveBeenCalledWith(false);
  });

  it('should set errors when an error occurs', async () => {
    const values = { email: 'test@example.com', password: 'password123' };
    const errorMessage = 'An error occurred';
    (logInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await handleSubmit(values, formikHelpers, mockRouter, false);

    expect(mockSetErrors).toHaveBeenCalledWith({ email: errorMessage });
    expect(mockSetSubmitting).toHaveBeenCalledWith(false);
  });
});
