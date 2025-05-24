import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { aliases, convertUnit } from './public/js/UnitCalclator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
  res.render('index.html');
})

app.get('/length', (req,res)=>{
  res.redirect('/index.html');
})

app.get('/temperature', (req, res)=>{
  res.redirect('/pages/temperature.html')
})

app.get('/weight', (req, res)=>{
  res.redirect('/pages/weight.html');
})

app.post('/temperature', (req, res)=>{
  res.render('display');
})



app.post('/weight', (req, res)=>{
  res.render('display');
})

app.post('/length', (req, res)=>{

  const {unit_to_convert_from, unit_to_convert_to, length} = req.body;
  if(!length || !unit_to_convert_from || !unit_to_convert_to){
    return res.render('error');
  }

  const unit_from = aliases[unit_to_convert_from];
  const unit_to = aliases[unit_to_convert_to];

  if(unit_from && unit_to){
    const conversion = convertUnit(true, length, unit_to, unit_from);
    conversion.prevLength = length;
    return res.render('display',{conversion:conversion});
  }

  return res.render('error');
})

app.listen(5000, ()=>{
  console.log('Server running on port 5000')
})