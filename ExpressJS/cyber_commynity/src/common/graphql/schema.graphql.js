import { buildSchema } from "graphql";

/**
 * Các kiểu type trong GraphQL
 * Int: số nguyên
 * Float: Số thực
 * String: chuỗi
 * Boolean: true, false
 * ID: định danh duy nhât
 */

const schema = buildSchema(`
    type Article {
      id: ID
      title: String
      content: String
      imageUrl: String
      views: Int
      userId: Int
      deletedBy: Int
      isDeleted: Int
      deletedAt: String
      createdAt: String
      updatedAt: String
    }

    type Pagination {
      page: Int
      pageSize: Int
      totalItem: Int
      totalPage: Int
      items: [Article]
    }

   type Query {
     hello: String
     getListArticle(page: Int, pageSize: Int): Pagination
   }

   type Mutation {
     createArticle(title: String, content: String, imageUrl: String) : Article
   }
 `);

export default schema;
