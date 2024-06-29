export const LANGUAGE_VERSIONS = {
    cpp: "10.2.0",
    javascript: "18.15.0",
    typescript: "5.0.3",
    python: "3.10.0",
    java: "15.0.2",
    csharp: "6.12.0",
    php: "8.2.3",
    c: "10.2.0",
};

export const CODE_SNIPPETS = {
    cpp: "#include <bits/stdc++.h\>\nusing namespace std\;\n\nint main(\)\n\{\n    cout << \"YOYO world\" << endl\;\n	return 0\;\n}",
    javascript: `\nfunction greet(name) {\n\tconsole.log("YO, " + name + "!");\n}\n\ngreet("demon");\n`,
    typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("YO, " + data.name + "!");\n}\n\ngreet({ name: "demon" });\n`,
    python: `\ndef greet(name):\n\tprint("YO, " + name + "!")\n\ngreet("demon")\n`,
    java: `\npublic class YOYOWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("YOYO World");\n\t}\n}\n`,
    csharp:
        'using System;\n\nnamespace YOYOWorld\n{\n\tclass YO { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("YOYO World in C#");\n\t\t}\n\t}\n}\n',
    php: "<?php\n\n$name = 'demon';\necho $name;\n",
    c: "#include <stdio.h>\nint main() {\n printf(\"YOYO, World!\\n\"); \nreturn 0; \n}",
};