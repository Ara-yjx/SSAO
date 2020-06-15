#version 410 core

// layout (location = 0) out vec3 gPosition;
// layout (location = 1) out vec3 gColor;
layout (location = 0) out vec4 gColor;
// out vec4 FragColor;

layout (location = 0) in vec3 Position;
layout (location = 1) in vec3 Color;
// in vec3 Position;
// in vec3 Color;



void main()
{ 
    // gPosition = Position;
    // gColor = vec4(Color, 1.0);
    // gColor = vec3(1.0f, 1.0f, 1.0f);
    gColor = vec4(0.5, 0.5, 0.5, 1.0);
}