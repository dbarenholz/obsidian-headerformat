import { getHeaderLevel } from "helpers";
import { FormattingHotkey } from "hotkeys";
import { Plugin } from "obsidian";

/**
 * The plugin class, extends Obsidian Plugin.
 *
 * @author dbarenholz
 * @version 0.0.1
 */
export default class HeaderformatPlugin extends Plugin {
  async onload() {
    console.log("Obsidian Header Format: loaded plugin.");

    // Add 6 commands for the 6 headers.
    for (let i = 1; i < 7; i++) {
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

          let replaceWithMe = null;
          let headerPrefix = "#".repeat(i);

          const level = getHeaderLevel(content);
          if (level == i) {
            // Current line is already current header level: toggle
            replaceWithMe = content.replace(new RegExp(`^${headerPrefix} `, `i`), "").trimStart();
          } else {
            // Current line is not yet current header level: apply
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
