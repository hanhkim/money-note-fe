import BaseHttpService from "./base.service";

const path = "categories";

class CategoryService extends BaseHttpService {
  constructor() {
    super();
  }

  getCategories = async () => {
    const result = await this.get(`${path}`);

    return result;
  };
}

const categoryService = new CategoryService();

export default categoryService;
