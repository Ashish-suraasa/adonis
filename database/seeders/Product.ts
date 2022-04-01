import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product'

export default class ProductSeeder extends BaseSeeder {
  public async run() {
    await Product.createMany([
      {
        productName: 'Acura',
        stock: 29,
        price: 6995,
      },
      {
        productName: 'Toyota',
        stock: 29,
        price: 8339,
      },
      {
        productName: 'Mitsubishi',
        stock: 23,
        price: 4913,
      },
      {
        productName: 'Nissan',
        stock: 17,
        price: 8491,
      },
      {
        productName: 'Chevrolet',
        stock: 72,
        price: 3264,
      },
      {
        productName: 'Chevrolet',
        stock: 67,
        price: 4935,
      },
      {
        productName: 'GMC',
        stock: 6,
        price: 6073,
      },
      {
        productName: 'Pontiac',
        stock: 54,
        price: 7543,
      },
      {
        productName: 'Honda',
        stock: 29,
        price: 2269,
      },
      {
        productName: 'Pontiac',
        stock: 5,
        price: 8408,
      },
      {
        productName: 'Mercury',
        stock: 70,
        price: 4307,
      },
      {
        productName: 'Lexus',
        stock: 14,
        price: 3273,
      },
      {
        productName: 'Volvo',
        stock: 97,
        price: 5659,
      },
      {
        productName: 'Pontiac',
        stock: 9,
        price: 9901,
      },
      {
        productName: 'Ford',
        stock: 32,
        price: 4647,
      },
      {
        productName: 'Maserati',
        stock: 2,
        price: 7284,
      },
      {
        productName: 'Ford',
        stock: 89,
        price: 5980,
      },
      {
        productName: 'Ford',
        stock: 22,
        price: 8225,
      },
      {
        productName: 'Mitsubishi',
        stock: 85,
        price: 9497,
      },
      {
        productName: 'Dodge',
        stock: 88,
        price: 5670,
      },
      {
        productName: 'Mercury',
        stock: 26,
        price: 5479,
      },
      {
        productName: 'Pontiac',
        stock: 46,
        price: 5405,
      },
      {
        productName: 'Volkswagen',
        stock: 42,
        price: 4478,
      },
      {
        productName: 'Jeep',
        stock: 49,
        price: 6374,
      },
      {
        productName: 'Lamborghini',
        stock: 78,
        price: 6173,
      },
    ])
  }
}
