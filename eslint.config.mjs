/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { FlatCompat } from "@eslint/eslintrc";
import baseConfig from "@graphpolaris/ts-configs/eslint";

const compat = new FlatCompat();

export default [
  ...baseConfig,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "import/no-anonymous-default-export": "off",
      "perfectionist/sort-interfaces": "off",
      "perfectionist/sort-objects": "off",
      "perfectionist/sort-object-types": "off",
      "unicorn/consistent-function-scoping": "off",
      "unicorn/no-abusive-eslint-disable": "off"
    }
  }
];
