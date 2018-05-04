# Nunjucks Scaffold Generator

> Node tool to generate scaffolds using the Nunjucks template engine.

```
npm i -S nunjucks-scaffold-generator
```

## Sample usage

```js
const {scaffold} = require('nunjucks-scaffold-generator');

const templateParams = {
  yourCustomVar: 'something',
  yourCustomFunction: camelCase
};

scaffold({
  src: 'my/custom/templates',
  dest: 'destiny/path',
  replacement: ['my-template', 'new-name'],
  params: templateParams
});
```

The files in the folder specified in the `src` param will be copied into the location specified in `dest` param rendered by Nunjucks.
File names that dont't match the replacement pattern are preserved.


## `scaffold()` params

| Param  | Type | Description |
| :-- | :-- | :-- |
| `src` | String | Path to the source templates. |
| `dest` | String | Destiny for the generated scaffold. |
| `replacement` | Array | `['pattern', 'replacement']` Optional replacement for the filenames of the source templates. |
| `params` | Object | Params used by the Nunjucks templates. |

