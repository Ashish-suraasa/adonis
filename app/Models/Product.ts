import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'

export default class Product extends BaseModel {
  public static table = 'products'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static assignUuid(product: Product) {
    product.id = uuidv4()
  }

  @column()
  public productName: string

  @column()
  public stock: number

  @column()
  public price: number

  @column()
  public creator: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
