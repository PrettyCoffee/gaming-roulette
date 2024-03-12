const tailwindConfig = ["error", { callees: ["classnames", "cn", "cva"] }]

module.exports = {
  extends: [
    "@pretty-cozy/eslint-config/base-ts",
    "@pretty-cozy/eslint-config/react",
  ],
  plugins: ["tailwindcss"],
  rules: {
    "react/prop-types": "off",
    "tailwindcss/classnames-order": tailwindConfig,
    "tailwindcss/no-contradicting-classname": tailwindConfig,
    "tailwindcss/no-unnecessary-arbitrary-value": tailwindConfig,
    "tailwindcss/enforces-shorthand": tailwindConfig,
  },
}
