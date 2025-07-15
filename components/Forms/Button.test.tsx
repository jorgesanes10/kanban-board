import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders the button', () => {
    render(<Button />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });

  it('calls customOnClick with correct toggle state when toggleable', async () => {
    const user = userEvent.setup();

    render(<Button toggleable>Click me</Button>);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('toggleable');
    expect(button).not.toHaveClass('on');

    await user.click(button);
    expect(button).toHaveClass('on');

    await user.click(button);
    expect(button).not.toHaveClass('on');
  });

  it('handles the toggled state when receiving the isToggledOn prop', async () => {
    const user = userEvent.setup();

    render(
      <Button toggleable isToggledOn>
        click me
      </Button>,
    );

    const button = screen.getByRole('button');

    expect(button).toHaveClass('toggleable');
    expect(button).toHaveClass('on');

    await user.click(button);
    expect(button).not.toHaveClass('on');

    await user.click(button);
    expect(button).toHaveClass('on');
  });
});
