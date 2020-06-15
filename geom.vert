#version 410 core

layout (location = 0) in vec3 in_Position;
layout (location = 1) in vec3 in_Normal;

layout (location = 0) out vec3 Position;
layout (location = 1) out vec3 Normal;
// layout (location = 2) out vec3 Normal;

uniform float sceneRotation;


void main()
{    
    vec4 homoPos = vec4(in_Position, 1.0);
    vec4 homoNormal = vec4(in_Normal, 0.0);



    float thetaY = sceneRotation;
    mat2 rotationMatrixY = mat2(
        cos(thetaY), -sin(thetaY),
        sin(thetaY), cos(thetaY)
    );
    homoPos.xz = rotationMatrixY * homoPos.xz;
    homoNormal.xz = rotationMatrixY * homoNormal.xz;


    // float n = 0.5;
    // float f = 10;
    // mat4 persp = mat4(
    //     n,0,0,0,
    //     0,n,0,0,
    //     0,0,n+f,-n*f,
    //     0,0,1,0
    // );
    // homoNormal = persp * homoNormal;
    // homoPos = persp * homoPos;
    // // 0.5~10, z=10-5/z=

    // // homoPos.z = (homoPos.z - 5) / 15;
    // homoPos = homoPos / 10;

    // homoNormal.z = (homoNormal.z - 1) / 2;

    Normal = homoNormal.xyz;
    Position = homoPos.xyz + vec3(0,0,-10); // 
    gl_Position = homoPos;
}  