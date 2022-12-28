import { Router } from 'express'

const router = Router()

//Products
router
 .get('/product', async (req, res) => {
   const { secret } = req
    res.json({ message: secret })
 })
 .get('/product/:id', async (req, res) => {})
 .put('/product/:id', async (req, res) => {})
 .delete('/product/:id', async (req, res) => {})
 .post('/product', async (req, res) => {})

 //Updates
router
.get('/update', async (req, res) => {})
.get('/update/:id', async (req, res) => {})
.put('/update/:id', async (req, res) => {})
.delete('/update/:id', async (req, res) => {})
.post('/update', async (req, res) => {})

//UpdatePoints
router
 .get('/udpatepoint', async (req, res) => {})
 .get('/udpatepoint/:id', async (req, res) => {})
 .put('/udpatepoint/:id', async (req, res) => {})
 .delete('/udpatepoint/:id', async (req, res) => {})
 .post('/udpatepoint', async (req, res) => {})


export default router