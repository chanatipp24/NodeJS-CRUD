const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/product')
mongoose.connect('mongodb://localhost:27017/node-api-101', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('error', err => {
  console.error('MongoDB error', err)
})

app.use(express.json())
// mock data
const products = [{}]
app.post('/products', async (req, res) => {
  const payload = req.body
  const product = new Product(payload)
  await product.save()
  res.status(201).end()
})

app.get('/products', async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

app.put('/products/:id', async (req, res) => {
  const payload = req.body
  const { id } = req.params
  const product = await Product.findByIdAndUpdate(id, { $set: payload })
  res.json(product)
})

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params
  await Product.findByIdAndDelete(id)
  res.status(204).end()
})


app.listen(9000, () => {
  console.log("localhost: 9000")
})