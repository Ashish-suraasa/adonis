import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import {
  BaseModel,
  column,
  beforeCreate,
  beforeSave,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Product from './Product'
import CartItem from './CartItem'
import Order from './Order'

export default class User extends BaseModel {
  @hasMany(() => Product, {
    foreignKey: 'creator',
  })
  public products: HasMany<typeof Product>

  @hasMany(() => CartItem, {
    foreignKey: 'customer',
  })
  public cartitems: HasMany<typeof CartItem>

  @hasMany(() => Order, {
    foreignKey: 'customer',
  })
  public orders: HasMany<typeof Order>

  public static table = 'users'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = uuidv4()
  }

  @column()
  public email: string

  @column()
  public password: string

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public address: string

  @column()
  public isAdmin: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
