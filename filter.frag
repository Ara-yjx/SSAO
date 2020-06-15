#version 410 core
in vec2 TexCoords;

out vec4 FragColor;

// uniform sampler2D gPosition;
uniform sampler2D gFilterOcclusion;
uniform sampler2D gFilterNormal;

void main() 
{
    FragColor = texture(gFilterNormal, TexCoords);
}