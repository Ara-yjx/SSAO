#version 410 core
in vec2 TexCoords;

out vec4 FragColor;

// uniform sampler2D gPosition;
uniform int ssaoSwitch;
uniform int filterSwitch;
uniform sampler2D gFilterOcclusion;
uniform sampler2D gFilterNormal;

void main() 
{
    int FILTERSAMPLE = 4;
    float FILTERSIZE = 0.02;
    float E = 2.71828f;
    


    vec3 normal = texture(gFilterNormal, TexCoords).xyz;
    float occlusion = texture(gFilterOcclusion, TexCoords).x;


    // Bilateral filter
    if(filterSwitch == 1) {
        float totalWeight = 0.0;
        float totalValue = 0.0;
        for(int x = -FILTERSAMPLE; x <= FILTERSAMPLE; x++) {
            for(int y = -FILTERSAMPLE; y < FILTERSAMPLE; y++) {
                float dx = x / FILTERSAMPLE * FILTERSIZE;
                float dy = y / FILTERSAMPLE * FILTERSIZE;
                vec2 sampleCoords = TexCoords + vec2(dx, dy);
                float sampleColor = texture(gFilterOcclusion, sampleCoords).x;
                float spaceWeightExp = - (dx * dx + dy * dy);
                float colorWeightExp = - (occlusion - sampleColor) * (occlusion - sampleColor);
                float weight = pow(E, spaceWeightExp + colorWeightExp);
                totalWeight += weight;
                totalValue += weight * sampleColor;
            }
        }
        occlusion = totalValue / totalWeight;
    }


    if(length(normal) < 0.5) {
        FragColor = vec4(0.16,0.16,0.16,1.0);
    } else {
        float ambient = 0.1;
        float diffuse = (1 + dot(normal, vec3(0,0.6, 0.8))) / 2;

        if(ssaoSwitch == 1) {
            diffuse = diffuse * occlusion;
        }

        FragColor = vec4(vec3(ambient + diffuse), 1);
    }

    // FragColor = vec4(occlusion,1);
    // FragColor = vec4(normal,1);

    // FragColor = vec4(vec3(length(texture(gFilterNormal, TexCoords))),1);
}