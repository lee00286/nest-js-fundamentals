import { Coffee } from "src/coffees/entities/coffee.entity";
import { Flavor } from "src/coffees/entities/flavor.entity";
import { CoffeeRefactor1687200494580 } from "src/migrations/1687200494580-CoffeeRefactor";
import { SchemaSync1687200969194 } from "src/migrations/1687200969194-SchemaSync";
import { DataSource } from "typeorm";

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [Coffee, Flavor],
  migrations: [CoffeeRefactor1687200494580, SchemaSync1687200969194],
});
