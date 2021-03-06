# SSAO

by Jiaxi Ye

CS291A Project 4


# Usage

## Compilation

In the project root directory,

`$ mkdir build`

`$ cd build`

`$ cmake ..`

`$ make main`


## Run

In the project `/build` directory,

`$ ./main [path_to_obj_file(optional)]`

e.g.

`$ ./main ../model/Guitar.obj`


## Controls

- Left / Right arrow keys: rotate

- Up / Down arrow keys: scale


## Models

- Several simple model files are provided in `/model`.



<br/>



# Project Introduction

This program performs Screen Space Ambient Occlusion, with kernel rotation and filtering.


## Rendering Process

1. Geometric Shader: 

    Transform objects. Rasterize the scene.   
    Generate positions (depths) and normals.

2. Screen Shader: 
    
    Perform SSAO to compute the occlusion factors of each pixel. 
    The kernel has 64 sampling points, randomly distributed within a hemisphere of radius 0.02 (in screen space). It is randomly rotated at each pixel.

3. Filter Shader: 

    Apply bilateral filter to occlusion factors.  
    Do the shading of diffuse and ambient light, and then blend with the occlusion factor.


## Artifacts observed

- Halo. 

    Slight halo is observed along object edges of two areas with highly different depth value.  
    Also, it's observed that the halo becomes less obvious when the size of SSAO sample kernel gets smaller.

- Dark stripes (fixed).

    Dark stripes problem has been fixed by offsetting the sample kernel by a tiny constant distance (0.01) along the normal direction.  
    Thank you, Pf. Yan!


## Results

![Alt text](/result/off.png "SSAO off")
SSAO off

![Alt text](/result/ssao_filtered.png "SSAO with filter")
SSAO with filter

![Alt text](/result/ssao_unfiltered.png "SSAO without filter")
SSAO without filter
