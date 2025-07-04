import { forwardRef, useMemo } from 'react'
import { Uniform } from 'three'
import { Effect } from 'postprocessing'

const fragmentShader = `
uniform float time;
uniform float intensity;
uniform float threshold;

float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 toCenter = vec2(0.5) - uv;
    
    vec4 original = texture2D(inputBuffer, uv);
    vec4 color = vec4(0.0);
    float total = 0.0;
    
    // Sample only bright areas
    for(float i = 0.; i < 20.; i++) {
        float lerp = (i + rand(vec2(gl_FragCoord.x, gl_FragCoord.y))) / 20.;
        float weight = exp(-lerp * lerp * 4.0); 
        vec2 sampleUV = uv + toCenter * lerp * 0.15; 
        vec4 mysample = texture2D(inputBuffer, sampleUV);
        
        // Apply threshold - only sample bright pixels
        float brightness = dot(mysample.rgb, vec3(0.299, 0.587, 0.114));
        if(brightness > threshold) {
            mysample.rgb *= mysample.a;
            color += mysample * weight;
            total += weight;
        }
    }
    
    if(total > 0.0) {
        color.a = 1.0;
        color.rgb /= total;
        
        // Mix based on intensity
        vec4 godrayColor = 1. - (1. - color) * (1. - original);
        outputColor = mix(original, godrayColor, intensity);
    } else {
        outputColor = original;
    }
}
`

class GodrayEffectImpl extends Effect {
  constructor() {
    super('GodrayEffect', fragmentShader, {
      uniforms: new Map([
        ['time', new Uniform(0)],
        ['intensity', new Uniform(0.5)],
        ['threshold', new Uniform(0.0)]
      ])
    })
  }

  update(renderer, inputBuffer, deltaTime) {
    this.uniforms.get('time').value += deltaTime
  }
}

export const GodrayEffect = forwardRef((props, ref) => {
  const effect = useMemo(() => new GodrayEffectImpl(), [])
  return <primitive ref={ref} object={effect} dispose={null} />
})

export default GodrayEffect