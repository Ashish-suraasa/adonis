import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'

export default class CartItem extends BaseModel {
  public static table = 'cart_items'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static assignUuid(cartItem: CartItem) {
    cartItem.id = uuidv4()
  }

  @column()
  public product: string

  @column()
  public quantity: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
