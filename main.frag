#version 330 core
in vec3 color;
out vec4 FragColor;
uniform float colorParam;

void main()
{

    // FragColor = vec4(1.0f, 0.5f, 0.2f, 0.5f);
    float rho = colorParam;

    FragColor = vec4(color * rho, 1.0f);

}
