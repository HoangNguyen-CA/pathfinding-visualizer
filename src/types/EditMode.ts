enum Mode {
  wall,
  start,
  end,
  disabled,
}

class EditMode {
  private mode: Mode;
  mouseHeld: boolean;
  constructor() {
    this.mode = Mode.wall;
    this.mouseHeld = false;
  }
  get isWall() {
    return this.mode === Mode.wall;
  }

  get isStart() {
    return this.mode === Mode.start;
  }

  get isEnd() {
    return this.mode === Mode.end;
  }

  get isDisabled() {
    return this.mode === Mode.disabled;
  }

  set isWall(bool) {
    if (bool) this.mode = Mode.wall;
    else this.mode = Mode.disabled;
  }

  set isStart(bool) {
    if (bool) this.mode = Mode.start;
    else this.mode = Mode.wall;
  }

  set isEnd(bool) {
    if (bool) this.mode = Mode.end;
    else this.mode = Mode.wall;
  }

  set isDisabled(bool) {
    if (bool) this.mode = Mode.disabled;
    else this.mode = Mode.wall;
  }
}

export default EditMode;
