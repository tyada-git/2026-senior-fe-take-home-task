import { NextPage } from "next";

interface StepThreeProps {
  tripName: string;
  tripDestination: string;
}

const StepThreeComponent: NextPage<StepThreeProps> = ({
  tripDestination,
  tripName,
}) => {
  return (
    <div role="status" aria-live="polite">
      <h2>You a re all set!</h2>
      <p>
        Thank you for submitting your traveller details for{" "}
        <strong aria-label={`Trip name: ${tripName}`}>{tripName}</strong> to{" "}
        {tripDestination}
      </p>
      <p>We will be in touch shortly to confirm your booking.</p>
    </div>
  );
};

export default StepThreeComponent;
