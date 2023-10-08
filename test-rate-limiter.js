import axios from "axios";

const apiUrl = "http://localhost:3001/api/v1/user/signin";
const payload = { email: "admin@mail.com", password: "admin123" };
const requestsCount = 110; // Number of requests to send
const delayMilliseconds = 2000; // Delay between requests in milliseconds

async function sendRequest() {
  try {
    const response = await axios.post(apiUrl, payload);
    console.log(response.status, response.data);
  } catch (error) {
    if (error.response) {
      // Response received, but it has an error status
      console.error("Error:", error.response.status, error.response.data);
    } else {
      // No response received, handle other error scenarios
      console.error("Error:", error.message);
    }

    if (error.response && error.response.status === 429) {
      // Rate limit exceeded, indicate it here
      console.log("Rate limit exceeded. Request limited.");
    }
  }
}

async function sendRequestsSequentially() {
  for (let i = 0; i < requestsCount; i++) {
    await sendRequest();
    if (i < requestsCount - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMilliseconds));
    }
  }
}

sendRequestsSequentially();
