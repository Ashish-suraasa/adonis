import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product'

export default class ProductSeeder extends BaseSeeder {
  public async run() {
    await Product.createMany([
      {
        productName: 'Acura',
        stock: 29,
        price: 6995,
        creator: '424b8999-a7da-49a5-9abc-80ec67700b75',
      },
      {
        productName: 'Toyota',
        stock: 29,
        price: 8339,

        creator: '424b8999-a7da-49a5-9abc-80ec67700b75',
      },
      {
        productName: 'Mitsubishi',
        stock: 23,
        price: 4913,
        creator: '424b8999-a7da-49a5-9abc-80ec67700b75',
      },

      {
        productName: 'Nissan',
        stock: 17,
        price: 8491,

        creator: '424b8999-a7da-49a5-9abc-80ec67700b75',
      },
      {
        productName: 'Chevrolet',
        stock: 72,
        price: 3264,
        creator: '424b8999-a7da-49a5-9abc-80ec67700b75',
      },
      {
        productName: 'Chevrolet',
        stock: 67,
        price: 4935,
        creator: '424b8999-a7da-49a5-9abc-80ec67700b75',
      },
      {
        productName: 'GMC',
        stock: 6,
        price: 6073,
        creator: '424b8999-a7da-49a5-9abc-80ec67700b75',
      },
      {
        productName: 'Pontiac',
        stock: 54,
        price: 7543,

        creator: '424b8999-a7da-49a5-9abc-80ec67700b75',
      },
      {
        creator: '424b8999-a7da-49a5-9abc-80ec67700b75',
        productName: 'Honda',
        stock: 29,
        price: 2269,
      },
      {
        creator: '424b8999-a7da-49a5-9abc-80ec67700b75',
        productName: 'Pontiac',
        stock: 5,
        price: 8408,
      },
      {
        creator: '424b8999-a7da-49a5-9abc-80ec67700b75',
        productName: 'Mercury',
        stock: 70,
        price: 4307,
      },
      {
        creator: '424b8999-a7da-49a5-9abc-80ec67700b75',
        productName: 'Lexus',
        stock: 14,
        price: 3273,
      },
      {
        creator: '424b8999-a7da-49a5-9abc-80ec67700b75',
        productName: 'Volvo',
        stock: 97,
        price: 5659,
      },
      {
        creator: '424b8999-a7da-49a5-9abc-80ec67700b75',
        productName: 'Pontiac',
        stock: 9,
        price: 9901,
      },
      {
        creator: '424b8999-a7da-49a5-9abc-80ec67700b75',
        productName: 'Ford',
        stock: 32,
        price: 4647,
      },
      {
        creator: '424b8999-a7da-49a5-9abc-80ec67700b75',
        productName: 'Maserati',
        stock: 2,
        price: 7284,
      },
      {
        creator: '424b8999-a7da-49a5-9abc-80ec67700b75',
        productName: 'Ford',
        stock: 89,
        price: 5980,
      },
      {
        creator: '424b8999-a7da-49a5-9abc-80ec67700b75',
        productName: 'Ford',
        stock: 22,
        price: 8225,
      },
      {
        creator: '424b8999-a7da-49a5-9abc-80ec67700b75',
        productName: 'Mitsubishi',
        stock: 85,
        price: 9497,
      },
      {
        creator: '424b8999-a7da-49a5-9abc-80ec67700b75',
        productName: 'Dodge',
        stock: 88,
        price: 5670,
      },
      {
        creator: '424b8999-a7da-49a5-9abc-80ec67700b75',
        productName: 'Mercury',
        stock: 26,
        price: 5479,
      },
      {
        creator: '424b8999-a7da-49a5-9abc-80ec67700b75',
        productName: 'Pontiac',
        stock: 46,
        price: 5405,
      },
      {
        creator: '424b8999-a7da-49a5-9abc-80ec67700b75',
        productName: 'Volkswagen',
        stock: 42,
        price: 4478,
      },
      {
        creator: '424b8999-a7da-49a5-9abc-80ec67700b75',
        productName: 'Jeep',
        stock: 49,
        price: 6374,
      },
      {
        creator: '424b8999-a7da-49a5-9abc-80ec67700b75',
        productName: 'Lamborghini',
        stock: 78,
        price: 6173,
      },
    ])
  }
}
