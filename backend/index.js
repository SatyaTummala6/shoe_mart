const express = require("express");
const dbConnect = require("./config/dbconnect");
const app = express();
const clientRouter = require("./routes/clientsRoutes");
const adminRouter = require("./routes/adminRoutes");
const retailerRouter = require("./routes/retailerRoutes");
const employeeRouter = require("./routes/employeeRoutes");
const supplierRouter = require("./routes/supplierRoutes");
const cors = require("cors");

const dotenv = require('dotenv')
dotenv.config();
const PORT = process.env.PORT || 4000;

dbConnect();
app.use(express.json());
app.use(cors());

app.use("/api/user", clientRouter);
app.use("/api/admin",adminRouter);
app.use("/api/retailer",retailerRouter);
app.use("/api/employee",employeeRouter);
app.use("/api/supplier",supplierRouter);

app.listen(PORT, () => {
    console.log(`Server is Running on PORT No.  ${PORT}.`)
})