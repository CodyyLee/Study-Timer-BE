require('dotenv').config();
const server = require('./api/server');

server.listen(process.env.PORT || 5000, () => {
    console.log(`SERVER IS ACTIVE ON PORT 5000`);
});