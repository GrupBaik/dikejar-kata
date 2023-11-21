function errorHandlers(error, req, res, next) {
  switch (error.name) {
    case "unauthorized":
      return res.status(401).json({ message: error.message });
    case "forbidden":
      return res.status(403).json({ message: error.message });
    case "notFound":
      return res.status(404).json({ message: error.message });
    default:
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { errorHandlers };
