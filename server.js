// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const contactRoutes = require("./routes/contact");
// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use("/api/contact", contactRoutes);
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
// console.log("CONTACT_RECEIVER is:", process.env.CONTACT_RECEIVER);

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const contactRoutes = require("./routes/contact");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
