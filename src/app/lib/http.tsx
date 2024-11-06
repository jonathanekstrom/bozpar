/* eslint-disable @typescript-eslint/no-explicit-any */
export const sendEmail = async (data: any) => {
  try {
    const response = await fetch("http://185.189.49.123:3000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    });
    const result = await response.json();
    if (!result.error) {
      alert("Email sent successfully");
    }
    return result;
  } catch {
    alert("Error sending email");
    return { error: "Error sending email" };
  }
};
