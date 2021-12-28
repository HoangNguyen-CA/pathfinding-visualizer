enum State {
  placeWall,
  placeStart,
  placeEnd,
}

class UserMode {
  private mode: State;
  mouseHeld: boolean;
  running: boolean;
  constructor() {
    this.mode = State.placeWall;
    this.mouseHeld = false;
    this.running = false;
  }
  get placeWall() {
    return this.mode === State.placeWall;
  }

  get placeStart() {
    return this.mode === State.placeStart;
  }

  get placeEnd() {
    return this.mode === State.placeEnd;
  }

  get isRunning() {
    return this.running;
  }

  setPlaceWall() {
    this.mode = State.placeWall;
  }

  setPlaceStart() {
    this.mode = State.placeStart;
  }

  setPlaceEnd() {
    this.mode = State.placeEnd;
  }

  setIsRunning(bool: boolean) {
    this.running = bool;
  }
}

export default UserMode;
