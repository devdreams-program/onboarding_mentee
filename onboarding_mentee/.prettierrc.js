module.exports = {
    printWidth: 120,
    tabWidth: 2,
    tabs: false,
    semi: true,
    singleQuote: true,
    trailingComma: 'es5',
    overrides: [
      { files: '*.gql', options: { printWidth: 160 } },
      { files: '*.yml', options: { singleQuote: false } },
    ],
  };
  