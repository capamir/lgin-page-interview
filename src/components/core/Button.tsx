import { forwardRef, ButtonHTMLAttributes } from "react";
import styles from "@/app/auth/auth.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ disabled = false, isLoading = false, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${styles.button} ${isLoading ? styles.loading : ""}`}
        {...rest}
      >
        {isLoading ? (
          <span className={styles.loader}>Loading...</span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;