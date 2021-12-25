/**
 * Computes current header level by counting '#' characters.
 * 
 * @author dbarenholz
 * @version 0.1.0
 * 
 * @param line string on which we want to find its header level
 * @returns the header level of the line
 */
export function getHeaderLevel(line: string): number {
  const HEADER_CHAR = "#";
  let count = 0;

  for (let char of line) {
    if (char == HEADER_CHAR) {
      count += 1;
    } else {
      break;
    }
  }

  return count;
}
