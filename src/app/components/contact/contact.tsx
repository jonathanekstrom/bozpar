"use client";

import PreCustomerLayout from "../pre-customer/layout";

const ContactComponent = () => {
  return (
    <PreCustomerLayout title={"Kontakt"}>
      <p>
        Har du frågor eller funderingar? Kontakta oss gärna på{" "}
        <a
          href="mailto:
        info@bozpar.se"
        >
          info@bozpar.se
        </a>
        .
      </p>
    </PreCustomerLayout>
  );
};

export default ContactComponent;
