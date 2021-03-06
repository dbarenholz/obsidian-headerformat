import { Hotkey, Modifier } from "obsidian";

/**
 * The hotkey for formatting a particular header.
 * 
 * @version 0.1.0
 * @author dbarenholz
 */
export class FormattingHotkey implements Hotkey {
  key: string;
  modifiers: Modifier[];

  constructor(headerLevel: number) {
    this.modifiers = ["Mod"];
    this.key = `${headerLevel}`;
  }
}
