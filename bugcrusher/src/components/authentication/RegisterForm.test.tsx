import RegisterForm from './RegisterForm'
import { render, screen } from '@testing-library/react'

describe('RegisterForm', () => {
    it('renders', () => {
        render(<RegisterForm/>)
        expect(screen.getByText('Username')).toBeInTheDocument()
    })
});