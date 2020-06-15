#include <nanogui/nanogui.h>
#include <iostream>
#include <string>
#include "shader.h"
// #include "shader.cpp"

using namespace nanogui;
using std::cout;
using std::endl;


class App : public Screen, public Shader {
public:
    double sliderValue = 0.5;
    float arrowXstate = 0;
    float arrowXStateSmooth = 0;
    float arrowYstate = 0;
    float bracketState = 0;
    float bracketStateSmooth = 0;
    // nanogui::GLShader mShader;
    unsigned int shaderProgram;
    unsigned int VAO;

    
    Shader* shader;

    App(std::string envArg, std::string objArg) : Screen(Eigen::Vector2i(768, 768), "PRT"), Shader() {

        Window* window = new Window(this, "Brightness");
        window->setPosition(Vector2i(15, 15));
        window->setLayout(new GroupLayout());
        Slider *slider = new Slider(window);
        slider->setFixedSize(Vector2i(100, 20));
        slider->setValue(this->sliderValue);

        // Widget callback
        slider->setCallback([&](float value) {
            this->sliderValue = value;
            // cout << sliderValue << endl;
        });
        slider->setFinalCallback([&](float value) {
            cout << "INFO slider value: " << value << endl;
        });

        initShader(new ShaderArg(envArg, objArg));
    }


    bool keyboardEvent(int key, int scancode, int action, int modifiers) {
        if (Screen::keyboardEvent(key, scancode, action, modifiers))
            return true;
        // esc
        if (key == GLFW_KEY_ESCAPE && action == GLFW_PRESS) {
            setVisible(false);
            return true;
        }
        // arrow
        if (key == GLFW_KEY_UP && action == GLFW_PRESS) {
        	this->arrowYstate += 1;
            return true;
        }
        if (key == GLFW_KEY_DOWN && action == GLFW_PRESS) {
        	this->arrowYstate -= 1;
            return true;
        }
        if (key == GLFW_KEY_LEFT && action == GLFW_PRESS) {
        	this->arrowXstate -= 1;
            return true;
        }
        if (key == GLFW_KEY_RIGHT && action == GLFW_PRESS) {
        	this->arrowXstate += 1;
            return true;
        }
        // < >
        if (key == GLFW_KEY_PERIOD && action == GLFW_PRESS) {
        	this->bracketState -= 1;
            return true;
        }
        if (key == GLFW_KEY_COMMA && action == GLFW_PRESS) {
        	this->bracketState += 1;
            return true;
        }
        return false;
    }



    virtual void drawContents() {
        arrowXStateSmooth = arrowXStateSmooth * 0.9 + arrowXstate * 0.1;
        bracketStateSmooth = bracketStateSmooth * 0.9 + bracketState * 0.1;
        updateShader(new ShaderArg(sliderValue, arrowXStateSmooth, arrowYstate, bracketStateSmooth));

    }

};


int main(int argc, char const *argv[]) {
    std::string envArg, objArg;
    try {    
        for(int i = 0; i < argc; i++) {
            std::string argType(argv[i]);
            if(argType == "-e") 
                envArg = std::string(argv[i+1]);
            if(argType == "-o") 
                objArg = std::string(argv[i+1]);
        }
    } catch(const std::exception& e) {
        std::cerr << "ERROR: invalid argument format. Should be $ ./main -e <envmap_file> -o <object_file>" << '\n';
    }


    nanogui::init();

    App* screen = new App(envArg, objArg);

    // Launch window
    screen->setVisible(true);
    screen->performLayout();
    // window->center();

    nanogui::mainloop();
    nanogui::shutdown();
    return 0;
}