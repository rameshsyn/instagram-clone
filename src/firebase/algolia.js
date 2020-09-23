import algoliasearch from 'algoliasearch';

const ALGOLIA_APP_ID = 'KBOMAE9HXU';

// Warning!!!!!!!!!!!!
// TODO: Hide secret keys.
const ALGOLIA_ADMIN_KEY = '8dcd32056f8b33e41d6e28a5c95903ea';
const ALGOLIA_INDEX_NAME = 'INSTA_USERS';
const ALGOLIA_SEARCH_KEY = 'ba4cda5b0f492eae9e69bb42d7459c51';

const admin = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
const adminIndex = admin.initIndex(ALGOLIA_INDEX_NAME);

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);
const clientIndex = client.initIndex(ALGOLIA_INDEX_NAME);

export const saveToAlgolia = (data, objectIDKey) => {
  return adminIndex.saveObject({
    ...data,
    objectID: data[objectIDKey],
  });
};

export const searchAlgolia = (searchQuery) => {
  return clientIndex.search(searchQuery);
};
