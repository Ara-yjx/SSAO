#version 330 core
layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 c; // deprecated
layout (location = 2) in int index; // range(verticesNum)

uniform samplerBuffer sp;

uniform float sceneRotation;
uniform int coefCount; 
uniform vec3 envSH[<ENVSHSIZE>]; // COEF_COUNT

out vec3 color;


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


    vec3 cc = vec3(0.0,0.0,0.0);

    for(int i = 0; i < coefCount; i++) {
        vec4 texel = texelFetch(sp, (index * coefCount + i) * 4);
        float coef = texel.x;
        cc += coef * envSH[i];
    }

    cc /= coefCount;

    color = cc;    
}