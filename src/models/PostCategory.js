const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', 
  {
    postId: {
      type: DataTypes.INTEGER,
      field: 'post_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'blog_posts',
        key: 'id',
      },
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: 'category_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'categories',
        key: 'id',
      },
      primaryKey: true,
    }
  },
  {
    timestamps: false,
    tableName: 'posts_categories',
    underscored: true,
  });
  
  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blog_posts',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategory;
};

module.exports = PostCategory;