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
      locations: {
        header: {
          searchFilter: {
            label: 'Buscar por ubicación',
            placeholder: 'eg. Citadel of Ricks',
          },
        },
        infoLabels: {
          name: 'Nombre',
          type: 'Tipo',
          dimension: 'Dimension',
        },
      },
      episodes: {
        header: {
          searchFilter: {
            label: 'Buscar por episodio',
            placeholder: 'eg. The Ricklantis Mixup',
          },
        },
        infoLabels: {
          name: 'Nombre',
          episode: 'Episodio',
          air_date: 'Fecha de emisión',
        },
      },
    },
    buttons: {
      cleanFilter: 'Limpiar',
    },
  },
};
