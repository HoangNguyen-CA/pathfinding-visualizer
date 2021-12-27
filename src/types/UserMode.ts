enum State {
  placeWall,
  placeStart,
  placeEnd,
  disabled,
}

class UserMode {
  private mode: State;
  mouseHeld: boolean;
  constructor() {
    this.mode = State.placeWall;
    this.mouseHeld = false;
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

  get disabled() {
    return this.mode === State.disabled;
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

  setDisabled() {
    this.mode = State.disabled;
  }
}

export default UserMode;
