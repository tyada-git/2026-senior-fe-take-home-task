import { NextPage } from "next";
import InputField from "./InputField";
import { useState } from "react";
import styles from "@/styles/TravellerForm.module.css";
import StepNavigation from "./StepNavigation";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  numTravellers: string;
  phone: string;
  specialRequests: string;
}
interface TravellerFormProps {
  serverFormMessage: string;
  handleStepNext: () => void;
  handleStepBack: () => void;
  formData: FormValues;
  setFormData: React.Dispatch<React.SetStateAction<FormValues>>;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  numTravellers?: string;
  phone?: string;
}
const TravellerForm: NextPage<TravellerFormProps> = ({
  serverFormMessage,
  handleStepNext,
  handleStepBack,
  formData,
  setFormData,
}) => {
  const [errors, setErrors] = useState<FormErrors>({});
  type FormFields = keyof FormErrors;

  const isValidEmail = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const isValidPhone = (value: string): boolean => {
    return /^\+?[\d\s\-().]{7,25}$/.test(value);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name as FormFields;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: FormErrors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required.";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required.";
    }
    if (!formData.email.trim()) {
      errors.email = "Email Address is required.";
    } else if (!isValidEmail(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    const num = Number(formData.numTravellers);
    if (!formData.numTravellers.trim()) {
      errors.numTravellers = "Number of travellers is required.";
    } else if (isNaN(num) || num < 1) {
      errors.numTravellers =
        "Please enter a valid number of travellers (minimum 1).";
    }

    if (formData.phone.trim() && !isValidPhone(formData.phone.trim())) {
      errors.phone = "Please enter a valid international phone number.";
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log("Submitted Succesfully");
      handleStepNext();
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Traveller details"
      className={styles.detailsForm}
    >
      <h2>Traveller details Form</h2>
      <>
        <p className={styles.displayMessage}>{serverFormMessage}</p>
        <div className={styles.formWrapper}>
          <InputField
            id="firstName"
            name="firstName"
            label="First Name"
            type="text"
            autoComplete="given-name"
            required
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            className={styles.input}
          />
          <InputField
            id="lastName"
            name="lastName"
            label="Last Name"
            type="text"
            autoComplete="family-name"
            required
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            className={styles.input}
          />
          <InputField
            id="email"
            name="email"
            type="email"
            label="Email Address"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            className={styles.input}
          />
          <InputField
            id="numTravellers"
            name="numTravellers"
            type="number"
            label="Number of travellers"
            required
            value={formData.numTravellers}
            onChange={handleChange}
            error={errors.numTravellers}
            min={1}
            className={styles.input}
          />
          <InputField
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            label="Phone number (optional)"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            className={styles.input}
          />
          <label htmlFor="specialRequests">Special requests (optional)</label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            rows={4}
            value={formData.specialRequests}
            onChange={handleChange}
            className={styles.textarea}
          />
        </div>
        <StepNavigation
          onBack={handleStepBack}
          onNext={handleStepNext}
          nextLabel="Continue →"
          nextType="submit"
        />
      </>
    </form>
  );
};

export default TravellerForm;
