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

        // This field will refer to another type :OOO
        artist: { 
            type: artistType,
            resolve: (song) => {
                return getArtist(song.artistName);
            }
        }
    })
});

// Song Resolvers! //

function getSong(songID) {
    return songData[songID] ? songData[songID]: null;
};

function getAllSongs(){
    return Object.values(songData);
};

// A new type is approaching! It's an Artist Type :O

const artistType = new GraphQLObjectType({
    name: 'Artist',
    fields: () => ({
        name: { type: GraphQLString },
        monthlyListeners: { type: GraphQLInt },

        // this is a special field
        // it needs a resolver since this isn't
        // built into the JSON data
        songs: {
            type: GraphQLList(songType),
            resolve: (artist) => {
                return getSongByArtist(artist.name);
            }
        }

    })
});


// Artist Resolvers! //

function getArtist(artistName) {
    return artistData[artistName] ? artistData[artistName]: null;
};

function getAllArtists(){
    return Object.values(artistData);
}

// Helper functions

function getSongByArtist(artistName){
    let songs = []
    for (song of Object.values(songData)){
        if (song.artistName == artistName){
            songs.push(song)
        }
    }
    return songs;
}



const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () =>  ({

        // get all songs
        allSongs: {
            type: GraphQLList(songType),

            // specify our resolver
            resolve: () => {
                return getAllSongs();
            }
        },

        // query song by id
        song: {
            type: songType,

            // specify our arguments, which is just "id"
            args: {
                id: { type: GraphQLNonNull(GraphQLID), description: "A Song" }
            },

            // specify our resolver, which now takes an argument "id"
            resolve: (_, {id}) => {
                return getSong(id);
            }
        },

        // get all artists
        allArtists: {
            type: GraphQLList(artistType),

            // specify our resolver
            resolve: () => {
                return getAllArtists();
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