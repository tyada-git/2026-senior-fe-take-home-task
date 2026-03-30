import { GetServerSideProps, NextPage } from "next";
import TravellerForm from "@/components/TravellerForm";

interface BookingPageProps {
  serverFormMessage: string;
  numberOfTraveller: number;
}

const BookingPage: NextPage<BookingPageProps> = ({
  serverFormMessage,
  numberOfTraveller,
}) => {
  return (
    <main>
      {/* <p>{serverFormMessage}</p> */}
      <TravellerForm
        serverFormMessage={serverFormMessage}
        numberOfTraveller={numberOfTraveller}
      />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<
  BookingPageProps
> = async () => {
  return {
    props: {
      serverFormMessage:
        "Please fill in your traveller details below to continue with your booking.",
      numberOfTraveller: 2,
    },
  };
};
export default BookingPage;
