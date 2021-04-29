const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull
  } = require('graphql');

const songData = require ('./song-data.json');


const songType = new GraphQLObjectType({
    name: 'Song',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString }
    })
});


function getSong(songID) {
    console.log(songData);
    console.log(songID);
    return songData[songID] ? songData[songID]: null;

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
                    return getSong(id)
                }

        }
    })

});


const schema = new GraphQLSchema({query: queryType});

module.exports = {schema}