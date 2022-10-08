class StrTool {
    public static format(fmt: String, ...args: String[]): String {
        let str = fmt;
        for (let i = 0; i < args.length; i++) {
            str = str.replace(`{${i}}`, args[i] as any);
        }
        return str;
    }
}

export default StrTool;