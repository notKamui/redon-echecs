import type { Schema, Struct } from '@strapi/strapi';

export interface SharedImage extends Struct.ComponentSchema {
  collectionName: 'components_shared_images';
  info: {
    displayName: 'image';
  };
  attributes: {
    media: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SharedTableau extends Struct.ComponentSchema {
  collectionName: 'components_shared_tableaus';
  info: {
    displayName: 'tableau';
  };
  attributes: {
    table: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<
        'global::table',
        {
          minRows: 1;
          showHeader: true;
        }
      >;
  };
}

export interface SharedTexte extends Struct.ComponentSchema {
  collectionName: 'components_shared_textes';
  info: {
    displayName: 'texte';
  };
  attributes: {
    contenu: Schema.Attribute.Blocks;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.image': SharedImage;
      'shared.tableau': SharedTableau;
      'shared.texte': SharedTexte;
    }
  }
}
