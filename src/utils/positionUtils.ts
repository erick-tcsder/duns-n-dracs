export enum Direction {
  Left = "L",
  Right = "R",
  Top = "T",
  Down = "D",
}

export const move = (
  position: number,
  x: number,
  y: number,
  direction: Direction
) => {
  switch (direction) {
    case Direction.Left:
      return position - x > 0 ? position - x : -1;
    case Direction.Right:
      return position + x < x * y ? position + x : -1;
    case Direction.Down:
      return position - 1 > 0 && position % x > 0 ? position - 1 : -1;
    case Direction.Top:
      return position + 1 < x * y && position % x < x - 1 ? position + 1 : -1;
  }
};

export type MoveOptionType = {
  pos: number;
  direction: Direction;
};

export const getMoveOptions = (position: number, x: number, y: number) => {
  const options: MoveOptionType[] = [];
  if (move(position, x, y, Direction.Down) !== -1)
    options.push({
      pos: move(position, x, y, Direction.Down),
      direction: Direction.Down,
    });
  if (move(position, x, y, Direction.Top) !== -1) 
    options.push({
      pos: move(position, x, y, Direction.Top),
      direction: Direction.Top,
    });
  if (move(position, x, y, Direction.Left) !== -1) 
    options.push({
      pos: move(position, x, y, Direction.Left),
      direction: Direction.Left,
    });
  if (move(position, x, y, Direction.Right) !== -1)
    options.push({
      pos: move(position, x, y, Direction.Right),
      direction: Direction.Right,
    });
  return options;
};
