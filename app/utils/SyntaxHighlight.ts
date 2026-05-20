export function syntaxHighlight(json: string): string {
    let safe = json
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    return safe.replace(
        /(\{|\}|\[|\]|:)|("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        (match: string): string => {
            // Dấu { } [ ] :
            if (/^\{|\}|\[|\]|:$/.test(match)) {
                return `<span class=" font-bold text-[17px]">${match}</span>`;
            }

            let cls = "";

            if (/^"/.test(match)) {
                cls = /:$/.test(match)
                    ? "text-[#A31515]  text-[16px]"  // key
                    : "text-[#0451A5]  text-[16px]";              // string
            } else if (/true|false/.test(match)) {
                cls = "text-purple-500 font-bold text-[14px]";  // boolean
            } else if (/null/.test(match)) {
                cls = "text-gray-500 italic text-[14px]";       // null
            } else {
                cls = "text-orange-500 text-[14px]";           // number
            }

            return `<span class="${cls}">${match}</span>`;
        }
    );

}
