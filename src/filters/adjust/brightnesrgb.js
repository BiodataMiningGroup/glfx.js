/**
 * @filter           Brightness RGB
 * @description      Provides additive brightness for each channel of RGB
 * @param r -1 to 1 (-1 is solid black, 0 is no change, and 1 is solid red)
 * @param g -1 to 1 (-1 is solid black, 0 is no change, and 1 is solid green)
 * @param b -1 to 1 (-1 is solid black, 0 is no change, and 1 is solid blue)
 */
function brightnessRGB(r, g, b) {
    gl.brightnessRGB = gl.brightnessRGB || new Shader(null, '\
        uniform sampler2D texture;\
        uniform float r;\
        uniform float g;\
        uniform float b;\
        varying vec2 texCoord;\
        void main() {\
            vec4 color = texture2D(texture, texCoord);\
            color.r += r;\
            color.g += g;\
            color.b += b;\
            gl_FragColor = color;\
        }\
    ');

    simpleShader.call(this, gl.brightnessRGB, {
        r: clamp(-1, r, 1),
        g: clamp(-1, g, 1),
        b: clamp(-1, b, 1),
    });

    return this;
}
