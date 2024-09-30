import anime from "animejs/lib/anime.es";
import type { AnimeInstance } from "animejs";
import * as THREE from "three";
import type {
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  Clock,
  DirectionalLight,
  Loader,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { type GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import crow from "@/assets/crow.glb";

/**
 * A class for the 3D scene with the crow.
 * @field clock The clock of the scene.
 * @field scene The instance of the scene.
 * @field camera The camera of the scene.
 * @field renderer The renderer of the scene.
 * @field container The container to display the scene in.
 * @field model The model of the crow.
 * @field mixer The mixer for the crow's animations.
 * @field clips The clips of the crow.
 * @field idleAction The idle action of the crow.
 * @field flyAction The fly action of the crow.
 * @field lookAction The look action of the crow.
 * @field appearAnime The animation for the appearance of the crow.
 * @field landedAnime The animation for the landing of the crow.
 */
export class CrowScene {
  private clock: Clock;
  private readonly scene: Scene;
  private camera: PerspectiveCamera | undefined;
  private renderer: WebGLRenderer | undefined;
  private container: HTMLElement | undefined;
  private model: Object3D | undefined;
  private mixer: AnimationMixer | undefined;
  private clips: AnimationClip[];
  private idleAction: AnimationAction | undefined;
  private flyAction: AnimationAction | undefined;
  private lookAction: AnimationAction | undefined;
  private appearAnime: AnimeInstance | undefined;
  private landedAnime: AnimeInstance | undefined;

  /**
   * Instantiates an instance of the class.
   */
  public constructor() {
    this.clock = this.createClock();
    this.scene = this.createScene();
    this.clips = [];
    this.addDirectionalLight(3, 3, 3);
    this.addDirectionalLight(-3, 3, 3);
  }

  /**
   * Sets the container of the scene.
   * @param container The container to use for the scene.
   */
  public setContainer(container: HTMLElement) {
    this.container = container;
    this.camera = this.createCamera();
    this.renderer = this.createRenderer();
    if (this.renderer) {
      container.appendChild(this.renderer.domElement);
    }
  }

  /**
   * Loads the model of the crow to the scene with its actions and animations.
   * @returns The model of the crow.
   */
  public async loadModel(): Promise<Object3D> {
    const loader: Loader = new GLTFLoader();
    const gltf: GLTF = (await loader.loadAsync(crow)) as GLTF;
    this.model = gltf.scene;
    this.mixer = new THREE.AnimationMixer(this.model);
    this.clips = gltf.animations;
    this.scene.add(this.model);
    this.idleAction = this.findIdleAction();
    this.flyAction = this.findFlyAction();
    this.lookAction = this.findLookAction();
    this.appearAnime = this.findAppearAnime();
    this.landedAnime = this.findLandedAnime();
    return this.model;
  }

  /**
   * Makes the crow appear.
   */
  public appear() {
    this.appearAnime?.play();
  }

  /**
   * Resizes the camera of the scene.
   */
  public resizeRenderer() {
    if (this.container && this.camera) {
      this.renderer?.setSize(
        this.container.clientWidth,
        this.container.clientHeight,
      );
      this.camera.aspect =
        this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
    }
  }

  /**
   * Renders the scene and handles the animation mixer.
   */
  private animate() {
    if (this.camera) {
      const delta: number = this.clock.getDelta();
      if (this.mixer) {
        this.mixer.update(delta);
      }
      this.renderer?.render(this.scene, this.camera);
    }
  }

  /**
   * Creates the clock the render loop of the scene.
   * @returns The clock for the render loop.
   */
  private createClock(): Clock {
    return new THREE.Clock();
  }

  /**
   * Creates the scene used to display the crow.
   * @returns The scene used to display the crow.
   */
  private createScene(): Scene {
    return new THREE.Scene();
  }

  /**
   * Creates the camera of the scene.
   * @returns The camera of the scene.
   */
  private createCamera(): PerspectiveCamera | undefined {
    if (this.container) {
      const pixelRatio: number =
        this.container.clientWidth / this.container.clientHeight;
      const camera: PerspectiveCamera = new THREE.PerspectiveCamera(
        75,
        pixelRatio,
        0.1,
        1000,
      );
      camera.position.set(0, 0, 0);
      return camera;
    }
  }

  /**
   * Creates the renderer for the scene.
   * @returns The renderer for the scene.
   */
  private createRenderer(): WebGLRenderer | undefined {
    if (this.container) {
      const renderer: WebGLRenderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(this.container.clientWidth, this.container.clientHeight);
      renderer.setAnimationLoop(() => this.animate());
      return renderer;
    }
  }

  /**
   * Adds a directional light to the scene looking at the origin.
   * @param x The x coordinate for the light.
   * @param y The y coordinate for the light.
   * @param z The z coordinate for the light.
   * @returns The directional light added to the scene.
   */
  private addDirectionalLight(
    x: number,
    y: number,
    z: number,
  ): DirectionalLight {
    const light: DirectionalLight = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(x, y, z);
    light.lookAt(0, 0, 0);
    this.scene.add(light);
    return light;
  }

  /**
   * Finds an action in the clips of the crow model.
   * @param name The name of the action to find.
   * @returns The action found in the clips of the crow model.
   */
  private findAction(name: string): AnimationAction | undefined {
    const clip: AnimationClip | undefined = this.clips.find(
      (clip: AnimationClip): boolean => clip.name === name,
    );
    let action: AnimationAction | undefined = undefined;
    if (clip) {
      action = this.mixer?.clipAction(clip);
    }
    return action;
  }

  /**
   * Finds the idle action of the crow with its parameter.
   * @returns The idle action of the crow.
   */
  private findIdleAction(): AnimationAction | undefined {
    const action: AnimationAction | undefined = this.findAction("Idle");
    if (action) {
      action.loop = THREE.LoopRepeat;
      action?.setEffectiveWeight(0.5);
      return action;
    }
  }

  /**
   * Finds the fly action of the crow with its parameter.
   * @returns The fly action of the crow.
   */
  private findFlyAction(): AnimationAction | undefined {
    const action: AnimationAction | undefined = this.findAction("Fly");
    if (action) {
      action?.setEffectiveTimeScale(5);
      return action;
    }
  }

  /**
   * Finds the look action of the crow with its parameter.
   * @returns The look action of the crow.
   */
  private findLookAction(): AnimationAction | undefined {
    const action: AnimationAction | undefined = this.findAction("Look");
    if (action) {
      action.loop = THREE.LoopOnce;
      action.crossFadeFrom(action, 1, true);
      action.crossFadeTo(action, 1, true);
      return action;
    }
  }

  /**
   * Finds the animation for when the crow has landed.
   * @returns The animation for when the crow has landed.
   */
  private findLandedAnime(): AnimeInstance {
    return anime({
      duration: 15000,
      delay: 5,
      loop: true,
      autoplay: false,
      loopBegin: (): void => {
        if (this.lookAction) {
          this.lookAction.reset().play();
        }
      },
    });
  }

  /**
   * Finds the animation for the appearance of the crow.
   * @returns The animation for the appearance of the crow.
   */
  private findAppearAnime(): AnimeInstance | undefined {
    if (this.model) {
      return anime({
        targets: this.model.position,
        delay: 1500,
        duration: 1500,
        easing: "easeOutExpo",
        autoplay: false,
        y: [2.2, -0.55],
        begin: (): void => {
          if (this.flyAction) {
            this.flyAction.reset().play();
          }
        },
        complete: (): void => {
          if (this.idleAction) {
            this.flyAction?.crossFadeTo(this.idleAction, 0.5, true);
            this.idleAction.play();
          }
          this.landedAnime?.play();
        },
      });
    }
  }
}
