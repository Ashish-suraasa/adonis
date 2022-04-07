import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import OrderCartItemMapping from './OrderCartMapping'

export default class Order extends BaseModel {
  public static table = 'orders'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static assignUuid(order: Order) {
    order.id = uuidv4()
  }

  @column({})
  public customer: string

  @column({})
  public amount: number

  @column({})
  public address: string

  @column({})
  public isDelivered: boolean

  @column({})
  public isPaid: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
