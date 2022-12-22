const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write("<html>");
        res.write("<head><title>MY NODE PAGE</title></head>");
        res.write("<body><form action='/message' method='POST'><input type='text' name='message' /><button type='submit'>Submit</button></form></body>");
        res.write("</html>");
        return res.end();
    }

    if (url === "/message" && method === "POST") {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const mesage = parseBody.split('=')[1]
            fs.writeFile('message.txt', mesage, err => {
                res.statusCode = 302;
                res.setHeader('Location', "/");
                return res.end()
            });
        })
    }

    res.setHeader('Content-Type', 'text/html');
    res.write("<html>");
    res.write("<head><title>MY NODE PAGE</title></head>");
    res.write("<body><h1>Hello From my NODE Server</h1></body>");
    res.write("</html>");
    res.end();
}

// module.exports = requestHandler;

// module.exports = {
//     handler : requestHandler,
//     someText: 'Some Hard Coded Text'
// }

// module.exports.handler = requestHandler;
// module.exports.someText = "Some Hard Coded Text";

exports.handler = requestHandler;
exports.someText = "Some Hard Coded Text";