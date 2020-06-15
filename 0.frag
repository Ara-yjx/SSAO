#version 330 core
uniform float colorParam;
out vec4 FragColor;

void main()
{

    vec3 color = vec3(0.5f, 0.5f, 0.5f);
    float rho = colorParam;
    FragColor = vec4(color * rho, 0.5f);

    // float rho = 1;
    // FragColor = vec4(1.0f,1.0f,1.0f,1.0f);
}
