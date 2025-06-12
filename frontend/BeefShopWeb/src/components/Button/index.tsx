import './index.css';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'danger';
} & React.ComponentProps<'button'>;

export function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button className={`button button--${variant}`} {...props}>
      {children}
    </button>
  );
}