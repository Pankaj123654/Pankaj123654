const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/attendanceDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const attendanceSchema = new mongoose.Schema({
    name:"string",
    date:":string",
    status:"string"
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

app.post('/checkin',async(req,res)=>{ 
    const {name}=req.body;
    const date= new Date().toISOString()[0];
    try{
    const attendance=new Attendance({
        name,
        date,
        status:"present"
    })
    res.status(400).json({msaage:"a check in suyccesfuly"});

}catch(error){
    res.send({message:"errro in checking"},error);
}
})

app.post('/checkout', async (req, res) => {
    const { name } = req.body;
    const date = new Date().toISOString().split('T')[0];

    try {
        const attendance = await Attendance.findOneAndUpdate(
            { name, date },
            { status: "absent" },
            { new: true }
        );
        res.status(200).json({ message: "Checkout successful", attendance });
    } catch (error) {
        res.status(500).send("Error in checkout");
    }
});
ap.post()

app.get('/attendance', async (req, res) => {
    try {
        const records = await Attendance.find({});
        res.status(200).json(records);
    } catch (error) {
        res.status(500).send("Error in fetching the attendance");
    }
});

app.listen(6000, () => {
    console.log("App is listening at port 6000");
});
