import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct styles for primary variant', () => {
    const { getByText } = render(<Button variant="primary">Primary</Button>);
    const button = getByText('Primary');
    expect(button).toHaveClass('bg-blue-500');
  });

  it('applies correct styles for secondary variant', () => {
    const { getByText } = render(<Button variant="secondary">Secondary</Button>);
    const button = getByText('Secondary');
    expect(button).toHaveClass('bg-gray-200');
  });
});

