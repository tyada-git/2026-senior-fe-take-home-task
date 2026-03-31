import { GetServerSideProps, NextPage } from "next";
import TravellerForm from "@/components/TravellerForm";
import StepIndicator from "@/components/StepIndicator";
import styles from "@/styles/BookingPage.module.css";
import { useState } from "react";
import StepNavigation from "@/components/StepNavigation";
import StepThreeComponent from "@/components/StepThreeComponent";

interface TripDetails {
  tripName: string;
  destination: string;
}

interface BookingPageProps {
  serverFormMessage: string;
  numberOfTraveller: number;
  tripDetails: TripDetails;
}
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  numTravellers: string;
  phone: string;
  specialRequests: string;
}
const BookingPage: NextPage<BookingPageProps> = ({
  serverFormMessage,
  numberOfTraveller,
  tripDetails,
}) => {
  const [currentStep, setCurrentStep] = useState(2);
  const [formData, setFormData] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    numTravellers: String(numberOfTraveller),
    phone: "",
    specialRequests: "",
  });
  const handleStepBack = () => {
    if (currentStep != 1) setCurrentStep((prev) => prev - 1);
  };
  const handleStepNext = () => {
    if (currentStep <= 2) setCurrentStep((prev) => prev + 1);
  };
  return (
    <main className={styles.pageWrapper}>
      <StepIndicator currentStep={currentStep} />
      <div className={styles.formContainer}></div>
      {currentStep == 1 && (
        <div className={styles.comingSoonBox}>
          <div className={styles.content}>
            <h3>Step 1</h3>
            <p>Coming soon !</p>
          </div>
          <StepNavigation onNext={handleStepNext} />
        </div>
      )}
      {currentStep == 2 && (
        <TravellerForm
          serverFormMessage={serverFormMessage}
          handleStepBack={handleStepBack}
          handleStepNext={handleStepNext}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentStep == 3 && (
        <div className={styles.comingSoonBox}>
          <div className={styles.content}>
            <StepThreeComponent
              tripName={tripDetails.tripName}
              tripDestination={tripDetails.destination}
            />
          </div>
          <StepNavigation onBack={handleStepBack} />
        </div>
      )}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<
  BookingPageProps
> = async () => {
  return {
    props: {
      tripDetails: {
        tripName: "Tuscany Discovery Tour",
        destination: "Florence, Italy",
      },
      serverFormMessage:
        "Please fill in your traveller details below to continue with your booking.",
      numberOfTraveller: 2,
    },
  };
};
export default BookingPage;
