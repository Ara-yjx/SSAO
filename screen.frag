#version 410 core
out vec4 FragColor;
in vec2 TexCoords;

// uniform sampler2D gPosition;
uniform sampler2D gPosition;
uniform sampler2D gNormal;
uniform vec3 kernel[32];
uniform float randomFloats[64];


vec3 rotatedKernelSample(vec3 samp, vec3 normal, mat2 kernelRotation) {

    vec3 sampleR = samp;
    //  sampleR = vec3(0,0,1);
    sampleR.xy = kernelRotation * sampleR.xy;

    // R * (0,0,1) -> normal(x,y,z)
    // R * (1,0,0) -> (1,0,0)
    // R * (0,1,0) -> normal x (1,0,0)
    // thus rotate around (0,0,1)x(x,y,z)

    vec3 axis = cross(vec3(0.0,0.0,1.0), normal);
    float theta = acos(normal.z);
    vec3 rotatedSample = sampleR * normal.z + cross(axis, sampleR) * sin(theta) + dot(axis, sampleR) * axis * (1 - normal.z);

    // vec3 rotatedSample = vec3(sampleR.x, 0, 0) + sampleR.y * cross(normal, vec3(1,0,0)) + sampleR.z * normal;

    return rotatedSample;
    // return vec3(0,0,1) * normal.z + cross(axis, vec3(0,0,1)) * sin(theta) + dot(axis, vec3(0,0,1)) * axis * (1 - normal.z);
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
    } else {

        float notOccluded = 0.0;

        float kernelRotationAngle = randomFloats[int(mod(TexCoords.x * TexCoords.y * 100000, 63))]; // random
        mat2 kernelRotation = mat2(
            cos(kernelRotationAngle), -sin(kernelRotationAngle),
            sin(kernelRotationAngle), cos(kernelRotationAngle)
        );
        for(int i = 0; i < KERNEL_SAMPLE; i += 1) {
            vec3 samplePosition = rotatedKernelSample(kernel[i], normal, kernelRotation) * KERNEL_SIZE + position;
            vec2 sampleTexCoord = vec2((samplePosition.x + 1) / 2, (samplePosition.y + 1) / 2);
            if(samplePosition.z < texture(gPosition, sampleTexCoord.xy).z) { // sample depth < actual depth: visible 
                notOccluded += 1;
            }
            // brightness = (samplePosition.z + 15)  / 10;
            // brightness = (texture(gPosition, samplePosition.xy).z + 15)  / 10;
            // brightness = (texture(gPosition, samplePosition.xy).z + 10);
            // brightness = samplePosition.x;
            // brightness = sampleTexCoord.x;
        } 
        brightness = notOccluded / KERNEL_SAMPLE;
        // if(brightness < 1) brightness = 0.2;

    }

    // brightness = brightness * brightness * brightness;

    vec3 color = vec3(brightness);

    // color = (position.zzz + 10);
    // color = (texture(gPosition, TexCoords).zzz + 1) / 2 ;
    FragColor = vec4(color, 1.0f);
}