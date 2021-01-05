import { EntityMetadataMap } from '@ngrx/data';

export const entityMetadata: EntityMetadataMap = {
  Token: {},
  PageLoadData: {
    entityDispatcherOptions: {
      optimisticUpdate: true
    }
  },
};

const entity = {
  Token: 'Token',
};
const pluralNames = entity;
const singularNames = entity;

export const entityConfig = {
  entityMetadata,
  pluralNames,
  singularNames,
};
