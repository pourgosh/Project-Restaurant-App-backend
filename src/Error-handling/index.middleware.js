export const errorHandler = (app) => {
  app.use((req, res) => {
    res.json("this route does not exist");
  });
  app.use((err, req, res) => {
    console.error(`Error ${req.method}, ${req.path} ${err}, `);

    if (!res.headersSent) {
      res.json({
        message: "Internal server error. Check the server console",
      });
    }
  });
};
