import doc, { mergeCreatedDocList } from '../doc';
/*eslint "no-undefined": 0,*/

describe('test doc reducer', () => {
  it('期望初始化正确', () => {
    const defaultState = {
      createdDocs: [],
      docDetailMap: {}
    };
    expect(doc(undefined, {})).toEqual(defaultState);
  });

  it('期望 merge 函数正确', () => {
    const mapIdToDoc = (id: number): DocSerializer => {
      return {
        id,
        user_id: 0,
        book_id: 0,
        slug: 'testSlug',
        title: 'testTitle',
        description: '',
        format: 'markdown',
        public: 0,
        created_at: '1994-01-01T01:01:01.000Z',
        word_count: 0,
        book: {
          id: 0,
          name: 'test-name',
          user: {
            name: 'DiamondYuan',
            avatar_url: ''
          }
        }
      };
    };

    const mapIdListToDocList = (id: number[]) => {
      return id.map(id => {
        return mapIdToDoc(id);
      });
    };

    const list1: DocSerializer[] = mapIdListToDocList([3, 2, 1]);
    const list2: DocSerializer[] = mapIdListToDocList([6, 5, 4]);

    expect(mergeCreatedDocList(list1, list2)).toEqual(
      mapIdListToDocList([6, 5, 4, 3, 2, 1])
    );

    expect(mergeCreatedDocList(list2, list1)).toEqual(
      mapIdListToDocList([6, 5, 4, 3, 2, 1])
    );

    expect(mergeCreatedDocList(list1, list1)).toEqual(
      mapIdListToDocList([3, 2, 1])
    );

    const list3: DocSerializer[] = mapIdListToDocList([9, 8, 7, 4, 3]);
    const list4: DocSerializer[] = mapIdListToDocList([10, 9, 8, 2, 1]);

    expect(mergeCreatedDocList(list3, list4)).toEqual(
      mapIdListToDocList([10, 9, 8, 7, 4, 3, 2, 1])
    );
  });
});
