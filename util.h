#include <string>

#ifndef UTIL_H
#define UTIL_H

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

#endif