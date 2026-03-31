import React from "react";
import styles from "@/styles/StepIndicator.module.css";

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { description: "Step 1" },
    { description: "Step 2" },
    { description: "Step 3" },
  ];

  return (
    <ol className={styles.stepIndicator} aria-label="Progress">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <li
            key={stepNumber}
            className={styles.stepItem}
            aria-current={isActive ? "step" : undefined}
          >
            <div
              className={`${styles.stepCircle} ${
                isActive ? styles.active : isCompleted ? styles.completed : ""
              }`}
              aria-hidden="true"
            >
              {stepNumber}
            </div>

            <span className={styles.stepDesc}>
              {step.description}
              {isActive && (
                <span className={styles.srOnly}> (current step)</span>
              )}
              {isCompleted && (
                <span className={styles.srOnly}> (completed)</span>
              )}
            </span>
            {index < steps.length - 1 && (
              <div className={styles.stepLine} aria-hidden="true"></div>
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default StepIndicator;
