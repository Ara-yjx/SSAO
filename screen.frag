#version 410 core
in vec2 TexCoords;

layout (location = 0) out vec3 filterOcclusion;
layout (location = 1) out vec3 filterNormal;

// uniform sampler2D gPosition;
uniform sampler2D gPosition;
uniform sampler2D gNormal;
uniform vec3 kernel[64];
uniform float randomFloats[320];


vec3 rotatedKernelSample(vec3 samp, vec3 normal, mat2 kernelRotation) {

    vec3 sampleR = samp;
    sampleR.xy = kernelRotation * sampleR.xy;

    // R * (0,0,1) -> normal(x,y,z)
    // R * (1,0,0) -> (1,0,0)
    // R * (0,1,0) -> normal x (1,0,0)
    // thus rotate around (0,0,1)x(x,y,z)

    // vec3 axis = cross(vec3(0.0,0.0,1.0), normal);
    // float theta = acos(normal.z);
    // vec3 rotatedSample = sampleR * normal.z + cross(axis, sampleR) * sin(theta) + dot(axis, sampleR) * axis * (1 - normal.z);

    vec3 rotatedSample = vec3(sampleR.x, 0, 0) + sampleR.y * cross(normal, vec3(1,0,0)) + sampleR.z * normal;

    return rotatedSample;
}


void main()
{
    float KERNEL_SIZE = 0.02;
    float KERNEL_SAMPLE = 32;
    float brightness;

    vec3 normal = texture(gNormal, TexCoords).xyz;
    vec3 position = texture(gPosition, TexCoords).xyz;

    if(position.z > -1) { // background
        brightness = 0;
        normal = vec3(0,0,0); // tell filter shader that this point is background
    } else {

        float notOccluded = 0.0;

        float kernelRotationAngle = randomFloats[int(mod(TexCoords.x * TexCoords.y * 100000, 319))]; // random
        mat2 kernelRotation = mat2(
            cos(kernelRotationAngle), -sin(kernelRotationAngle),
            sin(kernelRotationAngle), cos(kernelRotationAngle)
        );
        for(int i = 0; i < KERNEL_SAMPLE; i += 1) {
            vec3 samp = kernel[i];
            // 64 = 4*4*4
            // int sampx = i / 8;
            // int sampy = (i - 8 * sampx) / 2;
            // int sampz = i - 8 * sampx - 2 * sampy;
            // vec3 samp = vec3((sampx - 1.5) / 2, (sampy - 1.5) / 2, sampz / 4.0);
            // samp = vec3(0,0,1);

            vec3 samplePosition = rotatedKernelSample(samp, normal, kernelRotation) * KERNEL_SIZE + position;
            vec2 sampleTexCoord = vec2((samplePosition.x + 1.0) / 2.0, (samplePosition.y + 1.0) / 2.0);
            if(samplePosition.z < texture(gPosition, sampleTexCoord.xy).z) { // sample depth < actual depth: visible 
                notOccluded += 1;
            }

        } 
        brightness = notOccluded / KERNEL_SAMPLE;

    }


    vec3 color = vec3(brightness);

    // color = (position.zzz + 10);
    // color = (texture(gPosition, TexCoords).zzz + 1) / 2 ;
    // FragColor = vec4(color, 1.0f);
    filterOcclusion = color;
    filterNormal = normal;
}