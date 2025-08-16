const Category = require('../models/Category');

// Get All Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.success(200, 'Categories fetched successfully', categories);
  } catch (error) {
    res.error(500, 'Internal Server Error', error.message);
  }
};

// Get Category By Id
exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id).populate('totalPosts');
    if (!category) {
      return res.error(404, 'Category not found');
    }
    res.success(200, 'Category fetched successfully', category);
  } catch (error) {
    res.error(500, 'Internal Server Error', error.message);
  }
};

// Create Category
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.success(201, 'Category created successfully', category);
  } catch (error) {
    res.error(500, 'Internal Server Error', error.message);
  }
};

// Update Category
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.error(404, 'Category not found');
    }
    category.name = req.body.name;
    await category.save();
    res.success(200, 'Category updated successfully', category);
  } catch (error) {
    res.error(500, 'Internal Server Error', error.message);
  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id).populate('totalPosts');
    if (!category) {
      return res.error(404, 'Category not found');
    }
    if (category.totalPosts > 0) {
      return res.error(400, 'Category has posts, cannot delete');
    }
    await Category.findByIdAndDelete(id);
    res.success(200, 'Category deleted successfully', category);
  } catch (error) {
    res.error(500, 'Internal Server Error', error.message);
  }
};
