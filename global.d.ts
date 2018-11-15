declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

/* eslint-disable */
declare namespace JSX {
  interface IntrinsicElements {
    block: any;
  }
}
type Optional<T> = { [P in keyof T]?: T[P] };

interface GlobalStateInterface {
  user: UserStateInterface;
  doc: DocStateInterface;
  page: PageStateInterface;
}

interface PageStateInterface {
  createdDocumentPageInitStatus: {
    startInit: boolean;
    loading: boolean;
    error: null | Error | string;
  };
  createdDocumentLoadingMore: {
    end: boolean;
    loading: boolean;
    error: null | Error;
  };
  documentDetailInit: {
    loading: boolean;
    error: null | Error;
  };
}

interface DocStateInterface {
  docDetailMap: {
    [key: string]: {
      title: string;
      body: string;
    };
  };
  createdDocs: DocSerializer[];
}
interface UserStateInterface {
  userInfo?: UserDetailSerializer;
}

/**
 * 知识库列表字段
 * https://www.yuque.com/yuque/developer/docserializer
 * public 是否公开 [1 - 公开, 0 - 私密]
 * book 知识库
 */
interface DocSerializer {
  id: number;
  slug: string;
  title: string;
  description: string;
  user_id: number;
  book_id: number;
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

interface UserDetailSerializer {
  id: string;
  books_count: string;
  description: string;
  account_id: string;
  login: string;
  name: string;
  avatar_url: string;
}
