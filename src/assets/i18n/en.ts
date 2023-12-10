export default {
  lang: 'en',
  app: {
    components: {
      navbar: {
        characters: 'Characters',
        locations: 'Locations',
        episodes: 'Episodes',
      },
      headerTemplate: {
        title: 'Rick and Morty',
        description:
          'Collection of information about the fascinating characters, episodes,' +
          ' and plots of <span class="external-higlight">Rick and Morty.</span> Explore ' +
          'the universe filled with madness and science fiction' +
          ' in this incredible series!',
      },
    },
    pages: {
      characters: {
        header: {
          searchFilter: {
            label: 'Search for your favorite characters',
            placeholder: 'eg. Worlender',
          },
        },
        details: {
          specie: 'Specie',
          gender: 'Gender',
          origin: 'Origin',
          location: 'Location',
        },
      },
      locations: {
        header: {
          searchFilter: {
            label: 'Search by location',
            placeholder: 'eg. Citadel of Ricks',
          },
        },
        infoLabels: {
          name: 'Name',
          type: 'Type',
          dimension: 'Dimension',
        },
      },
      episodes: {
        header: {
          searchFilter: {
            label: 'Search by episode',
            placeholder: 'eg. The Ricklantis Mixup',
          },
        },
        infoLabels: {
          name: 'Name',
          episode: 'Episode',
          air_date: 'Air date',
        },
      },
    },
    buttons: {
      cleanFilter: 'Clear',
    },
  },
};
