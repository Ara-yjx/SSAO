# Compilation

1. Compile the assimp library

    `$ cd assimp`

    `$ cmake . -DASSIMP_BUILD_ASSIMP_TOOLS=OFF`

    `$ make`
    
2. Compile the source code

    In the project root directory,

    `$ mkdir build`

    `$ cd build`

    `$ cmake ..`

3. Run

    In the project `/build` directory,

    `$ ./main`
