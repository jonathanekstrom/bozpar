"use client";

import PreCustomerLayout from "../pre-customer/layout";

const Contact = () => {
  return (
    <PreCustomerLayout title={"Kontakt"}>
      <h1>Kontakt</h1>
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

export default Contact;
