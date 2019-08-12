const defaultPrefix = resourceName => `app/resource/${resourceName}`;
const operations = ['FETCH', 'FETCH_MANY', 'UPDATE', 'CREATE'];
const postfixes = ['', '_REQUEST', '_SUCCESS', '_FAILURE'];

const actionTypesFactory = ({ resourceName }) => {
  const prefix = defaultPrefix(resourceName);

  return operations.reduce(
    (acc, action) => ({
      ...acc,
      ...postfixes.reduce(
        (acc_, postfix) => ({
          ...acc_,
          [`${action}${postfix}`]: `${prefix}/${action}${postfix}`,
        }),
        {},
      ),
    }),
    {},
  );
};

export default actionTypesFactory;
