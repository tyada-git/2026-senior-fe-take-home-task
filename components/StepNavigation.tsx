import styles from "@/styles/StepNavigation.module.css";

interface StepNavigationProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  backLabel?: string;
  nextType?: "button" | "submit";
}

export default function StepNavigation({
  onBack,
  onNext,
  nextLabel = "Next →",
  backLabel = "← Back",
  nextType = "button",
}: Readonly<StepNavigationProps>) {
  return (
    <div className={styles.actions}>
      {onBack && (
        <button type="button" className={styles.backButton} onClick={onBack}>
          {backLabel}
        </button>
      )}
      {(onNext || nextType === "submit") && (
        <button
          type={nextType}
          className={styles.nextButton}
          onClick={nextType === "button" ? onNext : undefined}
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
}
