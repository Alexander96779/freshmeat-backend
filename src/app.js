import express from 'express';

const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is up and running on port ${port}`))

app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Fresh Meat app is here!!'
    });
});

export default app;