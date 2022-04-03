import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CartItems extends BaseSchema {
  protected tableName = 'cart_items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id')
      table.string('customer').references('id').inTable('users').onDelete('CASCADE')
      table.string('product').references('id').inTable('products').onDelete('CASCADE')
      table.bigint('quantity')
      table.boolean('is_bought')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
