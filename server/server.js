require("dotenv").config();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());
const pool = require("./config/db");
const subjectRoutes = require("./routes/subjectRoutes");
const quizRoutes = require("./routes/quizRoutes");
const userRoutes = require("./routes/userRoutes");
const resultRoutes = require("./routes/resultRoutes");
const questionRoutes = require("./routes/questionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

pool.connect()
    .then(() => console.log("PostgreSQL Connected"))
    .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/subjects",subjectRoutes);
app.use("/api/quizzes",quizRoutes);
app.use("/api/users",userRoutes);
app.use("/api/results",resultRoutes);
app.use("/api/questions",questionRoutes);
app.use("/api/dashboard",dashboardRoutes);

app.get("/", (req, res) => {
    res.send("Quiz Management Backend Running");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});