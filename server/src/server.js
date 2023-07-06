const http = require('http');

const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model')

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
//"watch":"npm-run-all --parallel server client"
//C:\Program Files\nodejs\node_modules\npm\bin
async function startServer () {
    await loadPlanetsData();

    server.listen(PORT, ()=>{
        console.log(`listening on port ${PORT}....`)
    })
}

startServer()