import react from 'react';
import { render, screen } from '@testing-library/react';
import LoginPanel from './LoginPanel';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

describe('LoginPanel', () => {
    const mockLogin = jest.fn();
    const mockRegister = jest.fn();
    it('renders', () => {
        render(<LoginPanel/>)
        expect(screen.getByText('Login')).toBeInTheDocument()
    })
    it('renders login form', () => {
        render(<LoginPanel/>)
        expect(screen.getByText('Username')).toBeInTheDocument()
    });
    it('renders register form', () => {
        render(<LoginPanel/>)
        act(() => {
            userEvent.click(screen.getByText('Register'))
        })
        expect(screen.getByText('Email')).toBeInTheDocument()
    });
});