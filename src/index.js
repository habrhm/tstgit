const jsbeautify = require("js-beautify");

const schema = [
  {
    type: "useQuery",
    name: "getData",
    query: `query Table {
      categories  {
        id,name,products{id,createdAt,updatedAt,name,isActive,stock,rating,price,},createdBy{id,firstName,lastName,email,phoneNumber,verify,role,createdAt,updatedAt,address,},updatedBy{id,firstName,lastName,email,phoneNumber,verify,role,createdAt,updatedAt,address,},createdAt,updatedAt,
      }
    }`
  },
  {
    type: "useMutation",
    name: "updateData",
    query: `mutation Table {
      categories  {
        id,name,products{id,createdAt,updatedAt,name,isActive,stock,rating,price,},createdBy{id,firstName,lastName,email,phoneNumber,verify,role,createdAt,updatedAt,address,},updatedBy{id,firstName,lastName,email,phoneNumber,verify,role,createdAt,updatedAt,address,},createdAt,updatedAt,
      }
    }`
  }
];

function generateSchema(schema) {
  return schema.map((item) => {
    const { type, name, query } = item;
    let result = `import * as React from 'react' \n`;

    result += `import {parse} from 'graphql' \n`;
    result += `import { ${type} } from '@apollo/react-hooks \n \n`;

    result += `function ${name}(options){\n`;

    result += `const query =  ${type}(parse(\`${query}\`), options)\n`;

    result += `return query \n`;

    result += `}\n`;
    result += `export default ${name}\n`;

    return jsbeautify(result);
  });
}

console.log(generateSchema(schema));
