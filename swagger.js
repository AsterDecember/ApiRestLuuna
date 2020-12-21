const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/auth.js','./routes/users.js','./routes/products.js',]

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./app')           // Your project's root file
})