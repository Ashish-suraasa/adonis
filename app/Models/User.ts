import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, column, beforeCreate, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
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
