document.addEventListener("DOMContentLoaded", startGame, false);

function startGame() {

         // checks if babylon is supported
         if(BABYLON.Engine.isSupported()) {
         var canvas = document.getElementById("canvas");
         var engine = new BABYLON.Engine(canvas, true);
         var scene = new BABYLON.Scene(engine);
         scene.enablePhysics(new BABYLON.Vector3(0,-10,0), new BABYLON.OimoJSPlugin());
         
         //define camera
         var camera = new BABYLON.ArcRotateCamera("Camera", 0.86, 1.37, 250, BABYLON.Vector3.Zero(), scene);
         camera.attachControl(canvas, false);
         camera.maxZ = 5000;
         camera.lowerRadiusLimit = 120;
         camera.upperRadiusLimit = 430;
         camera.lowerBetaLimit =0.75;
         camera.upperBetaLimit =1.58 ;
         camera.setPosition(new BABYLON.Vector3(-25, 15, -35));

         var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

         BABYLON.Engine.ShadersRepository = "shaders/";

         var meshes = [];

         /** SKYBOX **/
         var skybox = BABYLON.Mesh.CreateSphere("skyBox", 10, 1250, scene);
         meshes.push(skybox);
             //Creation of a repeated textured material
         var materialSpace = new BABYLON.StandardMaterial("textureSpace", scene);
         materialSpace.diffuseTexture = new BABYLON.Texture("img/space.jpg", scene);
         materialSpace.diffuseTexture.uScale = 5.0;//Repeat 5 times on the Vertical Axes
         materialSpace.diffuseTexture.vScale = 5.0;//Repeat 5 times on the Horizontal Axes
         materialSpace.backFaceCulling = false;//Hide the back of an element
         materialSpace.alpha = 1;
         var shader = new BABYLON.ShaderMaterial("gradient", scene, "gradient", {});
         shader.setFloat("offset", 0);
         shader.setFloat("exponent", 0.6);
         shader.setColor3("topColor", BABYLON.Color3.FromInts(0,119,255));
         shader.setColor3("bottomColor", BABYLON.Color3.FromInts(240,240, 255));
         shader.backFaceCulling = false;
         skybox.material = materialSpace;//shader;

         /** SKYBOX 2 **/

         var skybox2 = BABYLON.Mesh.CreateSphere("skyBox2", 10, 300, scene);
         meshes.push(skybox2);
         skybox2.material = shader;


         /** GROUND FROM HEIGHT MAP **/
         var mountain_ground = BABYLON.Mesh.CreateGroundFromHeightMap("mountain_ground", "img/heightMap.png", 300, 300, 100, 0, 50, scene, false);
         mountain_ground.position.y = -2;
         meshes.push(mountain_ground);
         var materialMountain = new BABYLON.StandardMaterial("textureMountain", scene);
         materialMountain.diffuseTexture = new BABYLON.Texture("img/mountain.jpg", scene);
         materialMountain.diffuseTexture.uScale = 1.0;//Repeat 5 times on the Vertical Axes
         materialMountain.diffuseTexture.vScale = 1.0;//Repeat 5 times on the Horizontal Axes
         materialMountain.backFaceCulling = true;//Hide the back of an element
         materialMountain.alpha = 1;
         mountain_ground.material = materialMountain;

         //render loop (display)
         var renderLoop = function () {scene.render();};
         engine.runRenderLoop(renderLoop);

 
         }
};
