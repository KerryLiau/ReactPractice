class MathTool {
    public static ranInt(min: number, max: number): number {
        return  Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export default MathTool;