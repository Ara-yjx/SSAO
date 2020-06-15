#include <string>
#ifndef SHADER_H
#define SHADER_H

// consistent with screen.frag
#define KERNEL_SAMPLE 32
#define RANDOM_FLOATS 64

class ShaderArg {
public:
    float sliderValue;
    float arrowXstate;
    float arrowYstate;
    float bracketState;
    std::string argEnv;
    std::string argObj;

    ShaderArg() {};
    ShaderArg(std::string argEnv, std::string argObj)
    : argEnv(argEnv), argObj(argObj) {};
    ShaderArg(float sliderValue, float arrowXstate, float arrowYstate, float bracketState) 
    : sliderValue(sliderValue), arrowXstate(arrowXstate), arrowYstate(arrowYstate), bracketState(bracketState) {};
};



class Shader {
public:
    virtual void initShader(ShaderArg* arg);
    virtual void updateShader(ShaderArg* arg);

private: 
    unsigned int loadShader(std::string vert, std::string frag);

    unsigned int geomShader;
    unsigned int screenShader;
    unsigned int VAO, VBO, EBO, FBO, RBO;
    unsigned int quadVAO, quadVBO;
    unsigned int gPosition, gNormal;

    std::vector<float> vertices;
    std::vector<unsigned int> indices;

    std::vector<float> kernel;
    std::vector<float> randomFloats;

    int success;
    char infoLog[512];
};

#endif

