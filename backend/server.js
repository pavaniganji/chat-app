const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try {
    const response = await axios.put(
      'https://api.chatengine.io/users/',
      {
        username: username,
        secret: username,
        first_name: username
      },
      {
        headers: { "private-key": 'd72cd3b6-1ebe-4451-a699-5254636f3c78' }
      }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    // Handle Axios errors
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      // Handle other errors (e.g., network issues)
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
