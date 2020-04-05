import { MicroModule } from "@uprtcl/micro-orchestrator";
import { HolochainConnectionModule } from "@uprtcl/holochain-provider";
import { NoteEditor } from "./element/note-editor";
import { GraphQlSchemaModule } from "@uprtcl/graphql";
import schema from "./element/note-editor/schema";
import resolvers from "./element/note-editor/resolvers";

export class NotesModule extends MicroModule {
  constructor() {
    super();
    this.submodules = [new GraphQlSchemaModule(schema, resolvers)];
    this.dependencies = [HolochainConnectionModule.id];
  }
  onLoad() {
    customElements.define("note-editor", NoteEditor);
  }
}
