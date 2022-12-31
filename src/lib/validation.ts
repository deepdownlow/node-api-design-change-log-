import ExpressValidator, { body } from "express-validator";

interface ValidationMap {
  [key: string]: {
    [key: string]: ExpressValidator.ValidationChain[];
  };
}

class Validation {
  private validationMap: ValidationMap;
  constructor() {
    this.validationMap = {
      user: {
        post: [
          body("username").exists().isString(),
          body("password").exists().isString(),
        ],
      },
      product: {
        post: [body("name").isString()],
      },
      update: {
        post: [
          body("title").exists().isString(),
          body("body").exists().isString(),
          body("productId").exists().isString(),
        ],
        put: [
          body("title").optional(),
          body("body").optional(),
          body("status")
            .isIn(["IN_PROGRESS", "SHIPPED", "CANCELLED"])
            .optional(),
          body("version").optional(),
        ],
      },
    };
  }

  validate(validate: string, category: string) {
    return this.validationMap[validate][category];
  }
}

const validator = new Validation();

export default validator;
