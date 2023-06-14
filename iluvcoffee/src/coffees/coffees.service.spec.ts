import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { Coffee, CoffeeSchema } from './entities/coffee.entity';
import { Document, Model, Query, Schema } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { createMock } from '@golevelup/ts-jest';

// type MockModel<T = any> = Partial<Record<keyof Model<T>, jest.Mock>>;
// const createMockModel = <T = any>(): MockModel<T> => ({
//   findOne: jest.fn(),
//   create: jest.fn(),
// })

// const mockCoffee = (
//   name = 'Coffee1',
//   brand = 'Brand1',
//   flavors = ['Flavor1', 'Flavor2'],
// ): typeof CoffeeSchema => ({
//   name,
//   brand,
//   flavors,
// })

const mockCoffeeDoc = (mock?: Partial<Coffee>): Partial<Coffee> => ({
  _id: mock?._id || '1',
  name: mock?.name || 'Coffee1',
  brand: mock?.brand || 'Brand1',
  flavors: mock?.flavors || ['Flavor1', 'Flavor2'],
});

const mockCoffeeDocArray: Partial<Coffee>[] = [
  mockCoffeeDoc(),
  mockCoffeeDoc({ _id: '2', name: 'Coffee2', brand: 'Brand2' }),
  mockCoffeeDoc({ _id: '3', name: 'Coffee3', brand: 'Brand3' }),
];

class MockCoffeeModel {
  constructor(public data?: any) {}

  exec() {
    return this.data;
  }

  static findOne({ _id }) {
    jest.fn().mockReturnThis();
  }
}

describe('CoffeesService', () => {
  let service: CoffeesService;
  // let coffeeModel: MockModel;
  let coffeeModel: Model<Coffee>;
  // let coffeeModel: MockCoffeeModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        {
          provide: getModelToken('Coffee'),
          // useValue: {},
          // useValue: mockCoffeeModel,
          // useValue: mockModel,
          // useValue: createMockModel(),
          useValue: {
            // constructor: jest.fn().mockResolvedValue(mockCoffee()),
            findOne: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    // coffeeModel = module.get<MockCoffeeModel>(getModelToken('Coffee'));
    // coffeeModel = module.get<MockModel>(getModelToken('Coffee'));
    coffeeModel = module.get<Model<Coffee>>(getModelToken('Coffee'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        jest.spyOn(coffeeModel, 'findOne').mockRejectedValueOnce(
          createMock<Query<Coffee, Coffee>>({
            exec: jest.fn()
              .mockResolvedValueOnce(mockCoffeeDoc({ _id: '1', name: 'Coffee1', brand: 'Brand1', flavors: ['Flavor1', 'Flavor2'] })),
          }),
        );

        // const findMockCoffee = mockCoffee('1', 'Coffee1', 'Brand1', ['Flavor1', 'Flavor2']);
        const foundCoffee = await service.findOne('1');
        console.log(foundCoffee);
        // expect(foundCoffee).toEqual(findMockCoffee);

        // const coffeeId = '1';
        // const expectedCoffee = {};
        
        // // coffeeModel.findOne.mockReturnValue(expectedCoffee);
        // // coffeeModel.findOne.mockResolvedValue(expectedCoffee);
        // const coffee = await service.findOne(coffeeId);
        // expect(coffee).toEqual(expectedCoffee);
      });
    });
    describe('otherwise', () => {
      it('it should throw the "NotFoundException"', async () => {

      });
    });
  })
});
