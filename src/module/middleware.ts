import { validationResult } from 'express-validator'

export const handleInputErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty){
    res.status(400).json({ message: errors.array() })
    return
  }
  next()
}

export const errorHandler = (err, req, res, next) => {
  const { input } = err
  switch(input) {
    case 'invalid input length':
      res.status(400).json({ message: 'Invalid input length. Name must be under 255 character length' })
      return
    case 'input':
      res.status(400).json({ message: 'Invalid input' })
      return
    case 'duplicate':
      res.status(400).json({ message: 'Duplicate username found' })
      return
    case 'unauth':
      res.status(401).json({ message: 'Unathorized' })
      return 
    default:
      res.status(500).json({ message: 'Something went wrong. Please try again.' })
  }
}