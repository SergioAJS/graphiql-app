import { useState } from 'react';
import {
  GraphQLSchema,
  GraphQLType,
  GraphQLField,
  GraphQLInputField,
  GraphQLObjectType,
} from 'graphql';

interface DocExplorerProps {
  schema: GraphQLSchema;
}

export const DocExplorer = ({ schema }: DocExplorerProps) => {
  const types = Object.values(schema.getTypeMap());

  const handleTypeClick = (type: GraphQLObjectType) => {
    const fields = Object.values(type.getFields());
  };

  return (
    <div>
      {types.map((type) => (
        <div key={type.name}>{type.name}</div>
      ))}
    </div>
  );
};

const RenderFields = (type: GraphQLObjectType) => {
  const values = Object.values(type.getFields());
  const [fields, setFields] = useState(
    values.map((field) => ({
      name: field.name,
      type: field.type.toString(),
    }))
  );

  return (
    <>
      {fields.map((field) => (
        <div key={field.name}>
          <div>{field.name}</div>
          <div>{field.type}</div>
        </div>
      ))}
    </>
  );
};
