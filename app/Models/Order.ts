import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import OrderFilter from './Filters/OrderFilter'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'

export default class Order extends compose(BaseModel, Filterable) {
  public static table = 'orders'
  public static selfAssignPrimaryKey = true
  public static $filter = () => OrderFilter

  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static assignUuid(order: Order) {
    order.id = uuidv4()
  }

  @column({ isPrimary: true })
  public customer: string

  @column({ isPrimary: true })
  public amount: number

  @column({ isPrimary: true })
  public address: string

  @column({ isPrimary: true })
  public isDelivered: boolean

  @column({ isPrimary: true })
  public isPaid: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
