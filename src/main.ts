import { getHeaderLevel } from "./helpers";
import { FormattingHotkey } from "./hotkeys";
import { Plugin } from "obsidian";

/**
 * HeaderFormat.
 * 
 * Allows you to use Typora-like shortcuts (CTRL+X) to format the current line as a header of said level.
 * If a line is already at level X, it toggles to normal text. 
 * If you use CTRL+0, it sets the line to normal text.
 *
 * @author dbarenholz
 * @version 0.0.2
 */
export default class HeaderformatPlugin extends Plugin {
  async onload() {
    console.log("Obsidian Header Format: loaded plugin.");

    // Add 7 commands for the 6 headers and normal text (CTRL+0).
    for (let i = 0; i < 7; i++) {
      this.addCommand({
        id: `format-h${i}`,
        name: `H${i}`,
        hotkeys: [new FormattingHotkey(i)],
        editorCallback: (editor, _) => {
          // Retrieve current line
          const { line } = editor.getCursor();

          const contents = editor.getDoc().getLine(line);
          const start = { line, ch: 0 };
          const end = { line, ch: contents.length };
          const content = editor.getRange(start, end);

          let replaceWithMe: string = null;
          let headerPrefix = "#".repeat(i);

          const level = getHeaderLevel(content);
          if (level == i) {
            // Current line is already current header level.
            if (i != 0) {
              // Toggle for headers
              replaceWithMe = content.replace(new RegExp(`^${headerPrefix} `, `i`), "").trimStart();
            } else {
              // Do nothing for normal text
              replaceWithMe = content
            }
          } else {
            // Current line is not yet current header level: apply (identical for headers or normal text)
            if (level == 0) {
              replaceWithMe = `${headerPrefix} ${content}`;
            } else {
              replaceWithMe = content.replace(new RegExp(`^#+`, `i`), `${headerPrefix}`);
            }
          }

          // Replace particular range
          editor.replaceRange(replaceWithMe, start, end);
        },
      });
    }
  }

  onunload() {
    console.log("Obsidian Plaintext: unloaded plugin.");
  }
}
