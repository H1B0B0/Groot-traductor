import morse from "@ozdemirburak/morse-code-translator";

export function decodeGroot(input: string) {
  const dot = "je s'appelle groot!";
  const minus = "JE S'APPELLE GROOT!";

  const morseCode = input.replaceAll(dot, ".").replaceAll(minus, "-");

  const decoded = morse.decode(morseCode);

  return decoded.toLowerCase();
}

export function encodeGroot(input: string) {
  const morseCode = morse.encode(input);

  const dot = "je s'appelle groot!";
  const minus = "JE S'APPELLE GROOT!";

  return morseCode.replaceAll(".", dot).replaceAll("-", minus);
}
