import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { RecommenderService } from '../recommender/recommender.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;

  const mockCreateProduct: Prisma.ProductCreateInput = {
    name: "Mock Product",
    price: 100,
    description: "This is a mock product",
    image: ["https://example.com/image.jpg"],
    view: 500,
    sold: 50,
    isActive: true,
    slug: "mock-product",
  };

  const mockProductService = {
    createProduct: jest.fn(dto => {
      return { id: Math.floor(Math.random() * 100), ...dto }
    }),
    products: jest.fn(() => [mockCreateProduct]),
  };
  const mockRecommenderService = {
    trainingRecommender: jest.fn(() => ({})),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService, RecommenderService],
    }).overrideProvider(ProductService).useValue(mockProductService).overrideProvider(RecommenderService).useValue(mockRecommenderService).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it("shoule be defined", () => {
    expect(controller).toBeDefined();
  });
  
  describe('create', () => {
    it('should create a new product', async () => {
      const createDto = mockCreateProduct;
      expect(await controller.create(createDto)).toEqual({ id: expect.any(Number), ...createDto});
      expect(mockProductService.products).toHaveBeenCalled();
      expect(mockProductService.createProduct).toHaveBeenCalledWith(createDto);
      expect(mockRecommenderService.trainingRecommender).toBeCalled();
    });
  });

  // Write similar test cases for other controller methods (e.g., increaseView, searchProductByName, etc.)

  afterEach(() => {
    jest.clearAllMocks();
  });
});
