#version 410 core
out vec4 FragColor;
in vec2 TexCoords;

// uniform sampler2D gPosition;
uniform sampler2D gColor;



// gl_FragCoord: 0, 0, 0.5 (???)
// TexCoords: ok
void main()
{
    vec3 color = texture(gColor, TexCoords).rgb;
    // color = vec3(TexCoords.x, TexCoords.y, 0);
    FragColor = vec4(color, 1.0f);
    // FragColor = vec4(0.1f, 0.1f, 0.1f, 1.0f);
    // FragColor = vec4(1,1,1, 1.0);
}