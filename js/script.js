document.addEventListener("DOMContentLoaded", startGame, false);

function startGame() {

         // checks if babylon is supported
         if(BABYLON.Engine.isSupported()) {
         var canvas = document.getElementById("canvas");
         var engine = new BABYLON.Engine(canvas, true);
         var scene = new BABYLON.Scene(engine);
         scene.enablePhysics(new BABYLON.Vector3(0,-10,0), new BABYLON.OimoJSPlugin());
         
         //define camera
         /*var camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI/6, 13, new BABYLON.Vector3(5,5,0), scene);
         camera.attachControl(canvas, false);*/

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
         /*var shader2 = new BABYLON.ShaderMaterial("gradient", scene, "gradient", {});
         shader2.setFloat("offset", 0);
         shader2.setFloat("exponent", 0.6);
         shader2.setColor3("topColor", BABYLON.Color3.FromInts(0,119,255));
         shader2.setColor3("bottomColor", BABYLON.Color3.FromInts(0,119, 255));
         shader2.backFaceCulling = false;*/

             //Creation of a repeated textured material
//             var materialClouds = new BABYLON.StandardMaterial("textureClouds", scene);
//             materialClouds.diffuseTexture = new BABYLON.Texture("img/ciel_4.jpg", scene);
//             materialClouds.diffuseTexture.uScale = 1.0;//Repeat 5 times on the Vertical Axes
//             materialClouds.diffuseTexture.vScale = 1.0;//Repeat 5 times on the Horizontal Axes
//             materialClouds.backFaceCulling = false;//Always show the front and the back of an element
//             materialClouds.alpha = 1.0;
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


         //define knot object + material
         /*var knot = BABYLON.Mesh.CreateTorusKnot("mesh", 2, 0.5, 128, 64, 2, 50, scene);
         meshes.push(knot);
         knot.position.y = 10;
         var material = new BABYLON.StandardMaterial("mat", scene);
         knot.material = material;
         material.diffuseColor = new BABYLON.Color3(1.5, 0, 0);

         var alpha = 0;
         knot.scaling.y = 1.5;
         scene.beforeRender = function() {
         knot.rotation.y = alpha;
         alpha += 0.03;
         };

         knot.setPhysicsState({impostor:BABYLON.PhysicsEngine.SphereImpostor, move:true, mass:1, friction:0.5, restitution:1.0});*/
         //d.setPhysicsState({impostor:BABYLON.PhysicsEngine.BoxImpostor, move:true, mass:1, friction:0.5, restitution:0.1});

         //define ground
         /*var precision = {
         "w" : 2,
         "h" : 2
         };
         var subdivisions = {
         'h' : 8,
         'w' : 8
         };
         var tiledGround = BABYLON.Mesh.CreateTiledGround("Tiled Ground", -12, -12, 12, 12, subdivisions, precision, scene, false);
         meshes.push(tiledGround);
         tiledGround.position.y = -5;

         var ground_material = new BABYLON.StandardMaterial("ground", scene);
         var t = new BABYLON.Texture("img/ground.jpg", scene);
         t.uScale = t.vScale = 1;
         ground_material.diffuseTexture = t;
         ground_material.specularColor = BABYLON.Color3.Black();
         tiledGround.material = ground_material;

         tiledGround.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, move:false});*/



         //render loop (display)
         var renderLoop = function () {scene.render();};
         engine.runRenderLoop(renderLoop);

 
         }
};
