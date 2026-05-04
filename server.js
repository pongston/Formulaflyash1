const path = require('path');
const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const PORT = 3000;

function serveFile(res, path, type) {
    fs.readFile(path, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("Not Found");
        } else {
            res.writeHead(200, { 'Content-Type': type });
            res.end(data);
        }
    });
}

function readData() {
    if (!fs.existsSync('data.json')) return [];
    return JSON.parse(fs.readFileSync('data.json'));
}

function saveData(data) {
    fs.writeFileSync('data.json', JSON.stringify(data));
}

http.createServer((req, res) => {

    if (req.method === 'GET' && req.url === '/') {
        return serveFile(res, 'login.html', 'text/html');
    }

    if (req.method === 'GET' && req.url === '/index') {
        return serveFile(res, 'index.html', 'text/html');
    }

    if (req.method === 'GET' && req.url === '/data') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify(readData()));
    }

    if (req.method === 'POST' && req.url === '/login') {
        let body='';
        req.on('data', chunk => body+=chunk);
        req.on('end', ()=>{
            const data = querystring.parse(body);
            if(data.username==='admin' && data.password==='1234'){
                res.writeHead(302,{Location:'/index'});
                res.end();
            }else{
                res.end("Login Failed");
            }
        });
        return;
    }

    if (req.method === 'POST' && req.url === '/add') {
        let body='';
        req.on('data', chunk => body+=chunk);
        req.on('end', ()=>{
            const newItem = querystring.parse(body);
            let list = readData();
            list.push(newItem);
            saveData(list);
            res.writeHead(302,{Location:'/index'});
            res.end();
        });
        return;
    }

    if (req.method === 'POST' && req.url.startsWith('/edit')) {
        let body='';
        req.on('data', chunk => body+=chunk);
        req.on('end', ()=>{
            const {index, customer, site_code, unit_name} = querystring.parse(body);
            let list = readData();
            list[index] = {customer, site_code, unit_name};
            saveData(list);
            res.writeHead(302,{Location:'/index'});
            res.end();
        });
        return;
    }

    if (req.method === 'GET' && req.url.startsWith('/delete')) {
        const index = req.url.split('/')[2];
        let list = readData();
        list.splice(index,1);
        saveData(list);
        res.writeHead(302,{Location:'/index'});
        res.end();
        return;
    }

}).listen(PORT,'0.0.0.0',()=>{
    console.log("Server running http://127.0.0.1:3000");
});