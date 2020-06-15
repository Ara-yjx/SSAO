#version 410 core
out vec4 FragColor;
in vec2 TexCoords;

// uniform sampler2D gPosition;
uniform sampler2D gPosition;
uniform sampler2D gNormal;
uniform vec3 kernel[32];


vec3 rotatedKernelSample(vec3 samp, vec3 normal) {
    // R * (0,0,1) = normal(x,y,z)
    // thus rotate around (0,0,1)x(x,y,z)
    vec3 axis = cross(vec3(0,0,1), normal); 
    float theta = acos(normal.z);
    vec3 rotatedSample = samp * normal.z + cross(axis, samp) * sin(theta) + dot(axis, samp) * axis * (1 - normal.z);
    return rotatedSample;
    // return vec3(0,0,1) * normal.z + cross(axis, vec3(0,0,1)) * sin(theta) + dot(axis, vec3(0,0,1)) * axis * (1 - normal.z);
}


void main()
{
    float KERNEL_SIZE = 0.01;
    float brightness;

    vec3 normal = texture(gNormal, TexCoords).xyz;
    vec3 position = texture(gPosition, TexCoords).xyz;

    float notOccluded = 0.0;
    for(int i = 0; i < 32; i += 1) {
        vec3 samplePosition = rotatedKernelSample(kernel[i], normal) * KERNEL_SIZE + position;
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
    brightness = notOccluded / 32.0;

    // brightness = brightness * brightness * brightness;

    vec3 color = vec3(brightness);

    // color = (position.zzz + 10);
    // color = TexCoords.xxx;
    // color = (texture(gPosition, TexCoords).zzz + 1) / 2 ;
    FragColor = vec4(color, 1.0f);
    // FragColor = vec4(0.1f, 0.1f, 0.1f, 1.0f);
    // FragColor = vec4(1,1,1, 1.0);
}