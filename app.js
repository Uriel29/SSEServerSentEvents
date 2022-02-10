const express = require('express');
const app = express();


app.set('view engine', 'ejs')

app.use(express.json());

app.use(express.static('public'));
app.use(express.urlencoded({
  extended: true
}));






//https://masteringjs.io/tutorials/express/server-sent-events
//https://stackoverflow.com/questions/34657222/how-to-use-server-sent-events-in-express-js


app.get('/', (req, res) => {
  res.render('login')
})


///apenas um exemplo de envio de dados do servidor para o cliente
function countdown(res, count) {

  res.write("data: " + count + "\n\n")
  //parte importante
  //res.flushHeaders()
  
  if (count)
    setTimeout(() => countdown(res, count-1), 1000)
  else
    res.end()
}

app.get('/eventos', async (req, res) => {

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    
  });
  


res.write('retry: 10000\n\n');
/// vai mandar de novo aa cada 10 segundos

   countdown(res, 10)

})





  app.listen(process.env.PORT || 3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });





