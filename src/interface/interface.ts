/**
 * 知识库列表字段
 * https://www.yuque.com/yuque/developer/docserializer
 * public 是否公开 [1 - 公开, 0 - 私密]
 * book 知识库
 */
export interface DocSerializer {
  id: number;
  slug: string;
  title: string;
  description: string;
  user_id: string;
  book_id: string;
  format: string;
  public: 0 | 1;
  created_at: string;
  word_count: number;
  book: {
    id: number;
    name: string;
    user: {
      name: string;
      avatar_url: string;
    };
  };
}

/**
 * 用户/团队详细信息
 */
export interface UserDetailSerializer {
  id: string;
  books_count: string;
  account_id: string;
  login: string;
  name: string;
  avatar_url: string;
}
