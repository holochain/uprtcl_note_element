export const resolvers = {
  Query: {
    listNotes: async (_1, _2, {container}) => {
        return await container.get(HolochainConnectionModule.bindings.HolochainConnection).call('notes', 'notes', 'list_notes', {})
    }
  },

  Mutation: {
    createNote: async (_, { noteInput }) => {
        return  null
    },

    updateNote: async (_, { id, noteInput }) =>{
        return  null
    },
    removeNote: async (_, { id }) => {
        return  null
    }
  }
}

export default resolvers
