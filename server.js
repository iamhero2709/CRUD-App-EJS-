const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const userModel = require('./modals/user'); // Ensure the path is correct


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/user', async (req, res) => {
    let users = await userModel.find();
    res.render("user", { users });
});

app.post('/create', async (req, res) => {
    try {
        let { name, email, image } = req.body;
        await userModel.create({ name, email, image });
        res.redirect('/user');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/delete/:id', async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.redirect('/user');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/edit/:id', async (req, res) => {
    try {
        let user = await userModel.findById(req.params.id);
        res.render('edit', { user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/edit/:id', async (req, res) => {
    try {
        let { name, email, image } = req.body;
        await userModel.findByIdAndUpdate(req.params.id, { name, email, image });
        res.redirect('/user');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
