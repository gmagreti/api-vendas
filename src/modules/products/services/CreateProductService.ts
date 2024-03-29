import RedisCache from 'shared/cache/RedisCache'
import { AppError } from 'shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import { Product } from '../typeorm/entities/Product'
import { ProductRepository } from '../typeorm/repositories/ProductsRepository'

interface IRequest {
  name: string
  price: number
  quantity: number
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository)
    const productExists = await productsRepository.findByName(name)
    const redisCache = new RedisCache()

    if (productExists) {
      throw new AppError(`Product ${name} already exists`)
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    })

    await redisCache.invalidate('api-vendas-PRODUCT_LIST')

    await productsRepository.save(product)

    return product
  }
}

export { CreateProductService }
