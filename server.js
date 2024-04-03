import app from "./app.js";

const PORT = process.env.PORT || 5005;

app.listen(PORT, async () => {
  try {
    console.log(`Listening to port ${PORT}`);
  } catch (err) {
    console.error(err);
  }
});
