var NoSQL = require('nosql');
var db = NoSQL.load('/db/database.nosql');
var nosql = NOSQL('users');

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


nosql.find().make(function (builder) {
    builder.between('age', 20, 30);
    builder.callback(function (err, response) {
        console.log('users between 20 and 30 years:', response);
    });
});

nosql.insert({ id: 3499, age: 55, name: 'Peter' }).callback(function (err) {
    console.log('The user has been created.');
});

nosql.update({ id: 3403, age: 60, name: 'Lucia' }).make(function (builder) {
    // builder.first(); --> updates only the one document
    builder.where('id', 3403);
    builder.callback(function (err, count) {
        console.log('updated documents:', count);
    });
});

nosql.modify({ age: 58 }).make(function (builder) {
    // builder.first(); --> modifies only the one document
    builder.where('id', 3403);
    builder.callback(function (err, count) {
        console.log('modified documents:', count);
    });
});

nosql.remove().make(function (builder) {
    // builder.first(); --> removes only the one document
    builder.where('age', '<', 15);
    builder.callback(function (err, count) {
        console.log('removed documents:', count);
    });
});