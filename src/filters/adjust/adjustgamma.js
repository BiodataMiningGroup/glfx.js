/**
 * @filter           Gamma Adjustment
 * @description      Gamma correction using a given gamma
 * @param gamma      Gamma exponent between 0 and 5
 */
function adjustGamma(gamma) {
    gl.adjustGamma = gl.adjustGamma || new Shader(null, '\
        uniform sampler2D texture;\
        uniform float gamma;\
        varying vec2 texCoord;\
        void main() {\
            vec4 color = texture2D(texture, texCoord);\
            color.rgb = pow(color.rgb, vec3(gamma));\
            gl_FragColor = color;\
        }\
    ');

    simpleShader.call(this, gl.adjustGamma, {
        gamma: clamp(0.0, gamma, 5.0)
    });

    return this;
}
