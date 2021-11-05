import express from 'express';
import fileUpload from 'express-fileupload'; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));
app.use(fileUpload());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is up and running on port ${port}`))

app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Fresh Meat app is here!!'
    });
});


require('./index.js')(app);

export default app;