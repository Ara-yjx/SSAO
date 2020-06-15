#include "util.h"
#include <iostream>
#include <fstream>
#include <sstream>

std::string fileToString(std::string filename) {
    std::ifstream f(filename);
    std::string str;
    if(f) {
        std::ostringstream ss;
        ss << f.rdbuf(); 
        str = ss.str();
    } else {
        std::cout<<"ERROR Opening file: "<<filename<<std::endl;
    }
    return str;
}