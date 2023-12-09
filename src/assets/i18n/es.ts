export default {
  lang: 'es',
  app: {
    components: {
      navbar: {
        characters: 'Personajes',
        locations: 'Lugares',
        episodes: 'Episodios',
      },
      headerTemplate: {
        title: 'Rick and Morty',
        description:
          'Colección de información sobre los fascinantes personajes, episodios y tramas de ' +
          '<span class="external-higlight">Rick and Morty.</span>' +
          ' ¡Explora el universo lleno de locura y ciencia ficción de esta increíble serie!',
      },
    },
    pages: {
      characters: {
        header: {
          searchFilter: {
            label: 'Busca tus personajes favoritos',
            placeholder: 'eg. Worlender',
          },
        },
        details: {
          specie: 'Especie',
          gender: 'Género',
          origin: 'Origen',
          location: 'Ubicación',
        },
      },
    },
    buttons: {
      cleanFilter: 'Limpiar',
    },
  },
};
