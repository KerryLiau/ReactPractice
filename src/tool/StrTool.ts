class StrTool {
    /**
     * format string.
     * ex:
     * let fmt = "{0} {1}";
     * let result = StrTool.format(fmt, "Hello", "World");
     * console.log(result); // Hello World
     * @param fmt format
     * @param args arguments
     */
    public static format(fmt: string, ...args: any[]): string {
        let str = fmt;
        for (let i = 0; i < args.length; i++) {
            str = str.replace(`{${i}}`, args[i]);
        }
        return str;
    }
}

export default StrTool;