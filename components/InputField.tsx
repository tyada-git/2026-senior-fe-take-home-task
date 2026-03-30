import styles from "@/styles/TravellerForm.module.css";

interface InputFieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
  min?: number;
}

const InputField = ({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  error,
  autoComplete,
  required,
  className,
  min,
}: InputFieldProps) => {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={onChange}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={className}
        min={min}
      />
      {error && (
        <p id={errorId} className={styles.errorMessage} role="alert">
          <span>&#9888;</span>
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
