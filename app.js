// app.js

// Import PrismaClient from '@prisma/client'
const { PrismaClient } = require('@prisma/client')

// Instantiate PrismaClient
const prisma = new PrismaClient()

// Example usage: Querying data from the database
async function getUsers() {
  const users = await prisma.user.findMany()
  console.log(users)
}

// Call the function to execute the query
getUsers()
  .catch(error => {
    console.error('Error fetching users:', error)
  })
  .finally(async () => {
    // Close PrismaClient connection
    await prisma.$disconnect()
  })
