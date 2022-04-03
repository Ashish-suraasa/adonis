import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'

export default class OrderCartMapping extends BaseModel {
  public static table = 'order_cart_mapping'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static assignUuid(order_cart_mapping: OrderCartMapping) {
    order_cart_mapping.id = uuidv4()
  }

  @column({ isPrimary: true })
  public orderid: string

  @column({ isPrimary: true })
  public cart_item: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
