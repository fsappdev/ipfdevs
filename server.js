const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

//test
app.get('/test', (req, res) => res.send('BE R-E activa') )

app.listen(PORT , () => {
   console.log(`servidor iniciado en el puerto: ${PORT}`)
})