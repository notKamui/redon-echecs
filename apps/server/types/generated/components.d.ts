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
      'shared.texte': SharedTexte;
    }
  }
}
