#version 330 core
layout (location = 0) in vec3 aPos;
uniform float sceneRotation;

void main()
{
    vec4 homoPos = vec4(aPos, 1.0);
    
    float thetaY = sceneRotation;
    mat2 rotationMatrixY = mat2(
        cos(thetaY), -sin(thetaY),
        sin(thetaY), cos(thetaY)
    );
    homoPos.xz = rotationMatrixY * homoPos.xz;

    gl_Position = homoPos;
}