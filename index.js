import express from 'express';
import { errors } from 'celebrate';
import User from './Routes/User.Routing';
import Files from 'express-fileupload';
import cors from 'cors';

const app = express();

//Puerto
app.set('port', process.env.PORT || 3000);

//Uses
app.use(Files({
    limits: { fileSize: 5 * 1024 * 1024 },
}));
app.use(errors());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
User(app);

app.listen(app.get('port'), () => {
    console.log('Start');
});