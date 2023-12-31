const vertexShader = () => {
  return `
      varying float x;
      varying float y;
      varying float z;
      varying vec3 vUv;

      uniform float u_time;
      uniform float u_amplitude;
      uniform float[64] u_data_arr;

      void main() {
        vUv = position;

        x = abs(position.x);
	      y = abs(position.y);

        float floor_x = round(x);
	      float floor_y = round(y);

        // float x_multiplier = (152.0 - x) / 18.0;
        // float y_multiplier = (152.0 - y) / 18.0;

        // z = position.z;
        // z = abs(position.x) + abs(position.y);
        // z = sin(abs(position.x) + abs(position.y));
        // z = sin(abs(position.x) + abs(position.y) + u_time * .005);
        z = sin(u_data_arr[int(floor_x)] / 40.0 + u_data_arr[int(floor_y)] / 60.0) * u_amplitude;
        // z = (u_data_arr[int(floor_x)] / 50.0 + u_data_arr[int(floor_y)] / 50.0) * 2.0;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, z, 1.0);
      }
    `;
};

const fragmentShader = () => {
  return `
    varying float x;
    varying float y;
    varying float z;
    varying vec3 vUv;

    uniform float u_time;
    // uniform vec3 u_black;
    // uniform vec3 u_white;

    void main() {
      // old
      // gl_FragColor = vec4(mix(u_black, u_white, vUv.x), 1.0);

      // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      // if (vUv.x < 0.0) {
      //   gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
      // } else {
      //   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      // }
     // gl_FragColor = vec4(.50, 1.00, 1.68, 1.0);
     gl_FragColor = vec4((21.0 - abs(x)) / 20.0, (22.0 - abs(y)) / 29.0, (abs(x + y) / 2.0) / 28.0, 1.0);
    }
  `;
};

export { vertexShader, fragmentShader };
