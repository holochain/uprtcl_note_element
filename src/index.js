import { MicroOrchestrator } from '@uprtcl/micro-orchestrator';
import { ApolloClientModule, GraphQlSchemaModule } from '@uprtcl/graphql';
import { HolochainConnectionModule, HolochainConnection } from '@uprtcl/holochain-provider';
import { NoteEditor } from './element/note-editor';
import schema from './element/note-editor/schema'
import resolvers from './element/note-editor/resolvers'
 
const hcConnection = new HolochainConnection({
  host: 'ws://localhost:33000'
});
 
const hcModule = new HolochainConnectionModule(hcConnection);

(async function() {
 
  const modules = [
    new ApolloClientModule(),
    new GraphQlSchemaModule(schema, resolvers),
    hcModule
  ];

  const orchestrator = new MicroOrchestrator();
  await orchestrator.loadModules(modules);
  console.log(orchestrator);
  customElements.define('note-editor', NoteEditor);
})();
