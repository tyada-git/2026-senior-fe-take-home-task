import { NextPage } from "next";
import InputField from "./InputField";
import { useState } from "react";
import styles from "@/styles/TravellerForm.module.css";

interface TravellerFormProps {
  numberOfTraveller: number;
  serverFormMessage: string;
}
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  numTravellers: string;
  phone: string;
  specialRequests: string;
}
interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  numTravellers?: string;
  phone?: string;
}
const TravellerForm: NextPage<TravellerFormProps> = ({
  numberOfTraveller,
  serverFormMessage,
}) => {
  const [values, setValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    numTravellers: String(numberOfTraveller),
    phone: "",
    specialRequests: "",
  });
  const [successForm, setSuccessForm] = useState(false);
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
    // const { name, value } = e.target;
    const name = e.target.name as FormFields;
    const value = e.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    // console.log(e.target);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: FormErrors = {};

    if (!values.firstName.trim()) {
      errors.firstName = "First name is required.";
    }
    if (!values.lastName.trim()) {
      errors.lastName = "Last name is required.";
    }
    if (!values.email.trim()) {
      errors.email = "Email Address is required.";
    } else if (!isValidEmail(values.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    const num = Number(values.numTravellers);
    if (!values.numTravellers.trim()) {
      errors.numTravellers = "Number of travellers is required.";
    } else if (isNaN(num) || num < 1) {
      errors.numTravellers =
        "Please enter a valid number of travellers (minimum 1).";
    }

    if (values.phone.trim() && !isValidPhone(values.phone.trim())) {
      errors.phone = "Please enter a valid international phone number.";
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log("Submitted Succesfully");
      setSuccessForm(true);
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

      {successForm ? (
        <p className={styles.successMessage}>Details Submitted</p>
      ) : (
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
              value={values.firstName}
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
              value={values.lastName}
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
              value={values.email}
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
              value={values.numTravellers}
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
              value={values.phone}
              onChange={handleChange}
              error={errors.phone}
              className={styles.input}
            />
            <label htmlFor="specialRequests">Special requests (optional)</label>
            <textarea
              id="specialRequests"
              name="specialRequests"
              rows={4}
              value={values.specialRequests}
              onChange={handleChange}
              className={styles.textarea}
            />
          </div>
          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </>
      )}
    </form>
  );
};

export default TravellerForm;
