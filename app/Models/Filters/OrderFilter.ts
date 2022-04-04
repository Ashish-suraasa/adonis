import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Order from 'App/Models/Order'

export default class OrderFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Order, Order>
  public static blacklist: string[] = []
  customer(id: string) {
    this.$query.where('customer', id)
  }

  product(product: string) {
    this.$query.where('product', product)
  }

  maxamount(amount: number) {
    this.$query.where('amount', '>', amount)
  }

  minamount(amount: number) {
    this.$query.where('amount', '<', amount)
  }
}
