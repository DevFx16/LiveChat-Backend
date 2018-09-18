import express from 'express';
import cors from 'cors';

const app = express();

//Puerto
app.set('port', process.env.PORT || 3000);

//Uses
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(app.get('port'), () => {
    console.log('Start');
});