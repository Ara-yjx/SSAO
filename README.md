# Usage

## Compilation

In the project root directory,

`$ mkdir build`

`$ cd build`

`$ cmake ..`

`$ make main`


## Run

In the project `/build` directory,

`$ ./main [path_to_obj_file]`

e.g.

`$ ./main ../model/Guitar.obj`


## Controls

- Left / Right arrow keys: rotate

- Up / Down arrow keys: scale


<br/>


# About this project

## Rendering Process

1. Geometric Shader : generate positions (depths) and normals

2. Screen Shader: do SSAO, compute the occlusion factors

3. Filter Shader: apply bilateral filter to occlusion factors; blend diffuse and ambient shading


## Artifacts observed

- Halo. 

    Slight halo is observed.

    Also, it's observed that the halo becomes less obvious when the size of SSAO sample kernel gets smaller.

- Dark stripes.

    I suppose this problem is because of my implementation, but I cannot figure out how to fix this completely.

    Dark stripes can be reduced by filtering.



