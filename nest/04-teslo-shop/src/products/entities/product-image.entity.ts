import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn() // autoincremental
  id: number;

  @Column('text')
  url: string;
  // varias imagenes pueden pertenecer a un producto
  @ManyToOne(
    () => Product,
    (product) => product.images,
    { onDelete: 'CASCADE'}
    
  )
  product: Product;
}