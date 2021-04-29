const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
  } = require('graphql');

const songData = require ('./song-data.json');
const artistData = require ('./artist-data.json');

const songType = new GraphQLObjectType({
    name: 'Song',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        artist: { type: GraphQLString }
    })
});

function getSong(songID) {
    return songData[songID] ? songData[songID]: null;
};

const artistType = new GraphQLObjectType({
    name: 'Artist',
    fields: () => ({
        name: { type: GraphQLString },
        monthlyListeners: { type: GraphQLInt }
    })
});

function getArtist(artistName) {
    return artistData[artistName] ? artistData[artistName]: null;

};

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () =>  ({

        // query song by id
        song: {
            type: songType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID), description: "A Song" }
                },

                resolve: (_, {id}) => {
                    return getSong(id);
                }

        },
        artist: {
            type: artistType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString), description: "An Artist" }
                },

                resolve: (_, {name}) => {
                    return getArtist(name);
                }

        }
    })

});


const schema = new GraphQLSchema({query: queryType});

module.exports = {schema}