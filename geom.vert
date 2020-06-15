#version 410 core
layout (location = 0) out vec3 Position;
layout (location = 1) out vec3 Color;
in vec3 Pos;

uniform float sceneRotation;


void main()
{    
    vec4 homoPos = vec4(Pos, 1.0);

    float thetaY = sceneRotation;
    mat2 rotationMatrixY = mat2(
        cos(thetaY), -sin(thetaY),
        sin(thetaY), cos(thetaY)
    );
    homoPos.xz = rotationMatrixY * homoPos.xz;

    // Position = homoPos.xyz;
    Color = vec3(abs(homoPos.x), abs(homoPos.y), abs(homoPos.z));
    Position = homoPos.xyz; // 
    gl_Position = homoPos;
}  