import { Schema } from '@nestjs/mongoose';

@Schema()
export class Coffee {
  id: number;
  name: string;
  brand: string;
  flavors: string[];
}
