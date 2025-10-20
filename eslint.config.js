import config from "eslint-config-prettier";

export default [
  ...[].concat(config),
  {
    rules: {
      indent: ["error", 2],
    },
    overrides: [
      {
        files: ["*.js"],
        rules: {
          indent: {
            SwitchCase: 2,
          },
        },
      },
    ],
  },
];
