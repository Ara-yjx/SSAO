#include <nanogui/nanogui.h>
#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <math.h>
#include <algorithm>
#include "shader.h"
#include "util.h"

#ifndef NATIVESHADER_H
#define NATIVESHADER_H

// using namespace nanogui;
using std::string;
using std::cout;
using std::endl;
using std::min;
using std::max;
using std::vector;

using Eigen::Vector3f;
using Eigen::Vector3d;

const string VERTEX_SHADER_FILE = "../0.vert";
const string FRAGMENT_SHADER_FILE = "../0.frag";
const string DEFAULT_MODEL = "../model/round_star.obj";
const float PI = 3.14159265358979f;



void Shader::loadShader() {

    // Vertex Shader
    std::string vsSrc = fileToString(VERTEX_SHADER_FILE);
    const char* vertexShaderSource = vsSrc.c_str(); // convert to GLchar
    unsigned int vertexShader;
    vertexShader = glCreateShader(GL_VERTEX_SHADER); // create shader
    glShaderSource(vertexShader, 1, &vertexShaderSource, NULL); // set shader code
    glCompileShader(vertexShader); // compile shader code
    // Check compilation success
    glGetShaderiv(vertexShader, GL_COMPILE_STATUS, &success);
    if(!success) {
        glGetShaderInfoLog(vertexShader, 512, NULL, infoLog);
        std::cout << "ERROR::SHADER::VERTEX::COMPILATION_FAILED\n" << infoLog << std::endl;
    }

    // Fragment Shader
    std::string fragmentShaderSourceString = fileToString(FRAGMENT_SHADER_FILE);
    const char* fragmentShaderSource = fragmentShaderSourceString.c_str();
    unsigned int fragmentShader;
    fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);
    glShaderSource(fragmentShader, 1, &fragmentShaderSource, NULL);
    glCompileShader(fragmentShader);
    // Check compilation success
    glGetShaderiv(fragmentShader, GL_COMPILE_STATUS, &success);
    if(!success) {
        glGetShaderInfoLog(fragmentShader, 512, NULL, infoLog);
        std::cout << "ERROR::SHADER::VERTEX::COMPILATION_FAILED\n" << infoLog << std::endl;
    }
    
    // Compile shaders
    unsigned int shaderProgram;
    shaderProgram = glCreateProgram();
    glAttachShader(shaderProgram, vertexShader); // attach shaders to a program
    glAttachShader(shaderProgram, fragmentShader);
    glLinkProgram(shaderProgram); // link shaders to a single program
    // check
    glGetProgramiv(shaderProgram, GL_LINK_STATUS, &success);
    if(!success) {
        glGetProgramInfoLog(shaderProgram, 512, NULL, infoLog);
        std::cout << "ERROR WITH SHADER PROGRAM \n" << infoLog << std::endl;
    }

    // Clean
    glDeleteShader(vertexShader);
    glDeleteShader(fragmentShader);

    this->shaderProgram = shaderProgram;
}



void Shader::initShader(ShaderArg* arg = nullptr) {

    glEnable(GL_DEPTH_TEST);
    glDepthFunc(GL_LESS);
    // glDisable(GL_CULL_FACE);


    // Load
    float vertices[] = {
         0.4,  0.4,  0.0,
         0.4, -0.4,  0.0,
        -0.4,  0.4,  0.0,
        -0.4, -0.4,  0.0,
         0.0,  0.0, -0.4,
    };
    unsigned int indices[] = {
        0,1,2,
        1,2,3,
        0,1,4,
        1,3,4,
        2,3,4,
        0,2,4,
    };
    
    size_t stride = sizeof(float) * 3;
    // cout<<"stride "<<stride<<endl;
    // VBO
    glGenBuffers(1, &(this->VBO)); // create a buffer object with ID
    glBindBuffer(GL_ARRAY_BUFFER, this->VBO); // let the buffer be a VBO buffer 
    glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), (void*)vertices, GL_STATIC_DRAW); // copy vertices to this buffer
    // glBindBuffer(GL_ARRAY_BUFFER, 0); // unbind

    // VAO
    unsigned int VAO;
    glGenVertexArrays(1, &VAO);
    glBindVertexArray(VAO);
    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, stride, (void*)0); // position
    glEnableVertexAttribArray(0);


    // EBO
    unsigned int EBO;
    glGenBuffers(1, &EBO);
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, EBO);
    glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(indices), indices, GL_STATIC_DRAW);
    

    loadShader();


    this->VAO = VAO;
    this->EBO = EBO;

}


void Shader::updateShader(ShaderArg* arg = nullptr) {

    // Compute params
    const float rotationRate = 0.3;
    float brightness = arg->sliderValue;
    float sceneRotation = - arg->arrowXstate * rotationRate;

    if(arg) delete arg;

    // glEnable(GL_DEPTH_TEST);
    // glDepthFunc(GL_LESS);

    glClearColor(0.1f, 0.1f, 0.1f, 1.0f);
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    /////////

    glUseProgram(this->shaderProgram);

    // Set Uniform Params
    int colorParamLocation = glGetUniformLocation(shaderProgram, "colorParam");
    glUniform1f(colorParamLocation, brightness);
    int sceneRotationLocation = glGetUniformLocation(shaderProgram, "sceneRotation");
    glUniform1f(sceneRotationLocation, sceneRotation);
    
    // Draw
    glBindBuffer(GL_ARRAY_BUFFER, this->VBO); // let the buffer be a VBO buffer 
    glBindVertexArray(this->VAO);
    // glDrawArrays(GL_TRIANGLES, 0, 6); // draw triangles without EBO
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, this->EBO);
    glDrawElements(GL_TRIANGLES, 18, GL_UNSIGNED_INT, 0);

}


#endif
