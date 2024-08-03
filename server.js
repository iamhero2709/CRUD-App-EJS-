
const express = require('express')
const app = express()
const port = 3000
const path=require('path')
app.set("view engine",'ejs')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))
const userModel=require('./usermodel');


app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})