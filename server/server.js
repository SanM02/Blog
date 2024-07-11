const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const path = require("path");

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "http://localhost:4001"],  // Ajusta esto según tus necesidades
      connectSrc: ["'self'", "http://localhost:4001"],
      fontSrc: ["'self'", "https://cdn.jsdelivr.net", "https://fonts.gstatic.com"],  // Ajusta esto según tus necesidades
      // Agrega más directivas según tus necesidades
    },
  },
}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configurar para servir archivos estáticos (React build)
app.use(express.static(path.join(__dirname, "../client/build")));

require("./config/mongoose.config");
require("./routes/User.routes")(app);
require("./routes/Post.routes")(app);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(4001, () => console.log("Conectado al servidor"));
