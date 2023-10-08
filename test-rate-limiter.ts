import axios from 'axios';

const apiUrl = 'http://localhost:3000/api/v1/user/signin'; 
const payload = { email: 'admin@mail.com', password: 'admin123' }; 
const requestsCount = 110; // Number of requests to send
const delayMilliseconds = 2000; // Delay between requests in milliseconds

async function sendRequest() {
  try {
    const response = await axios.post(apiUrl, payload);
    console.log(response.status, response.data);
  } catch (error) {
    console.error('Error:', error.response.status, error.response.data);
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
