#version 410 core
in vec2 TexCoords;

out vec4 FragColor;

// uniform sampler2D gPosition;
uniform int ssaoSwitch;
uniform sampler2D gFilterOcclusion;
uniform sampler2D gFilterNormal;

void main() 
{
    vec3 normal = texture(gFilterNormal, TexCoords).xyz;
    vec3 occlusion = texture(gFilterOcclusion, TexCoords).xyz;

    if(length(normal) < 0.5) {
        FragColor = vec4(0.16,0.16,0.16,1.0);
    } else {
        float ambient = 0.1;
        float diffuse = (1 + dot(normal, vec3(0,0.6, 0.8))) / 2;

        if(ssaoSwitch == 1) {
            diffuse = diffuse * occlusion.x;
        }

        FragColor = vec4(vec3(ambient + diffuse), 1);
    }

    // FragColor = vec4(occlusion,1);
    // FragColor = vec4(normal,1);

    // FragColor = vec4(vec3(length(texture(gFilterNormal, TexCoords))),1);
}