import styles from "@/app/auth/auth.module.scss";

interface ButtonProps {
  disabled: boolean;
  children: React.ReactNode;
}

export default function Button({ disabled, children }: ButtonProps) {
  return (
    <button disabled={disabled} className={styles.button}>
      {children}
    </button>
  );
}