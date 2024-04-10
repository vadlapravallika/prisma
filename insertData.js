// Import PrismaClient from '@prisma/client'
const { PrismaClient } = require('@prisma/client')

// Instantiate PrismaClient
const prisma = new PrismaClient()

// Define a function to insert users
async function createUsers() {
  for (let i = 1; i <= 3; i++) {
    await prisma.user.create({
      data: {
        username: `user_${i}`,
        email: `user_${i}@example.com`
      }
    })
  }
  console.log('Users inserted successfully')
}

// Define a function to insert products
async function createProducts() {
  for (let i = 1; i <= 3; i++) {
    await prisma.product.create({
      data: {
        name: `product_${i}`,
        description: `Description for product ${i}`,
        price: i * 10.0
      }
    })
  }
  console.log('Products inserted successfully')
}

// Define a function to insert orders
async function createOrders() {
  for (let i = 1; i <= 3; i++) {
    await prisma.order.create({
      data: {
        userId: i,
        productId: i,
        quantity: i
      }
    })
  }
  console.log('Orders inserted successfully')
}

// Call the functions to insert data into each table
async function main() {
  await createUsers()
  await createProducts()
  await createOrders()
}

// Execute the main function
main()
  .catch(error => {
    console.error('Error inserting data:', error)
  })
  .finally(async () => {
    // PrismaClient connection Close 
    await prisma.$disconnect()
  })
