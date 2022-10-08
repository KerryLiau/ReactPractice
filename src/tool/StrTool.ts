class StrTool {
    public static format(fmt: string, ...args: any[]): string {
        let str = fmt;
        for (let i = 0; i < args.length; i++) {
            str = str.replace(`{${i}}`, args[i]);
        }
        return str;
    }
}

export default StrTool;