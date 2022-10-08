// Use for resize on high pixel density devices
function resizeCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    const {width, height} = canvas.getBoundingClientRect();
    if (canvas.width !== width || canvas.height !== height) {
        const {devicePixelRatio: ratio = 1} = window;
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        ctx.scale(ratio, ratio);
        return true;
    }
    return false;
}

export {resizeCanvas};