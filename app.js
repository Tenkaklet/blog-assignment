const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const blogRoute = require('./blogRoutes');



const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

// we're going to add some items to ShoppingList
app.use(express.static('public'));

app.use('/blog-posts', blogRoute);




// when the root of this router is called with GET, return
// all current ShoppingList items

app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
