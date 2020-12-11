/**
 * @filter           Brightness / Contrast
 * @description      Provides additive brightness and multiplicative contrast control.
 * @param brightness -1 to 1 (-1 is solid black, 0 is no change, and 1 is solid white)
 * @param contrast   -1 to 1 (-1 is solid gray, 0 is no change, and 1 is maximum contrast)
 */
function adjustGamma(gamma) {
    gl.adjustGamma = gl.adjustGamma || new Shader(null, '\
        uniform sampler2D texture;\
        uniform float gamma;\
        varying vec2 texCoord;\
        void main() {\
            vec4 color = texture2D(texture, texCoord);\
            color.rgb = (color.rgb + 1.0) / 2.0;\
            color.rgb = Math.pow(color.rgb, gamma);\
            color.rgb = color.rgb * 2.0 - 1.0;\
            gl_FragColor = color;\
        }\
    ');

    simpleShader.call(this, gl.brightnessContrast, {
        gamma: clamp(0.0, brightness, 5.0)
    });

    return this;
}
