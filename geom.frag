#version 410 core

layout (location = 0) out vec4 gPosition;
layout (location = 1) out vec4 gNormal;
// out vec4 FragColor;

layout (location = 0) in vec3 Position;
layout (location = 1) in vec3 Normal;
// layout (location = 2) in vec3 Normal;
// in vec3 Position;
// in vec3 Color;



void main()
{ 
    // gPosition = Position;
    gPosition = vec4(Position, 1.0);
    gNormal = vec4(Normal, 1.0);
    // gColor = vec3(1.0f, 1.0f, 1.0f);
}