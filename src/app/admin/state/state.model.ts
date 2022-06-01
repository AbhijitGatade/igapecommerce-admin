export class State {
    id: number;
    name: string;
  
    constructor(state) {
        this.id = state.id || 0;
        this.name = state.name || "";
    }
  }
  