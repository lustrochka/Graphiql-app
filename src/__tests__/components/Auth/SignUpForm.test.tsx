import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { validationSchema } from '../../utils/validationSchema';
import { useRouter } from 'next/router';
import { handleSubmit } from '../../../components/Auth/handleSubmit.ts';
import useAuth from '../../../hooks/useAuth';
import SignUpForm from '../../../components/Auth/SignUpForm';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../../hooks/useAuth', () => jest.fn());

jest.mock('../../../components/Auth/handleSubmit.ts', () => ({
  handleSubmit: jest.fn(),
}));

describe('SignUpForm', () => {
  const mockPush = jest.fn();
  const mockHandleSubmit = handleSubmit as jest.Mock;
  const mockUseAuth = useAuth as jest.Mock;

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    mockUseAuth.mockReturnValue({ user: null });
    jest.clearAllMocks();
  });

  it('should render the sign-up form', () => {
    render(<SignUpForm />);
    expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('should call handleSubmit with correct values', async () => {
    render(<SignUpForm />);

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password123!' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalledWith(
        { email: 'test@example.com', password: 'Password123!' },
        expect.anything(),
        expect.anything(),
        true
      );
    });
  });

  it('should redirect to home if user is authenticated', () => {
    mockUseAuth.mockReturnValue({ user: { uid: '123', email: 'test@example.com' } });
    render(<SignUpForm />);
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
