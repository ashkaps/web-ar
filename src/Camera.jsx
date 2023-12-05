import { useEffect } from "react";

const Camera = () => {
  useEffect(() => {
    function resizeCanvas() {
      var paintCanvas = document.getElementById("paintCanvas");
      paintCanvas.width = window.innerWidth;
      paintCanvas.height = window.innerHeight;
    }
    resizeCanvas();
  }, []);

  const handleCapture = async () => {
    const video = document.querySelector("video");
    const paintCanvas = document.getElementById("paintCanvas");
    const image = document.getElementsByTagName("img");
    paintCanvas
      .getContext("2d")
      .drawImage(video, 0, 0, window.innerWidth, window.innerHeight);
      paintCanvas
      .getContext("2d")
      .drawImage(image[0], window.innerWidth/2,  window.innerHeight/2, 100, 100);
    let image_data_url = paintCanvas.toDataURL("image/jpeg");

    try {
      const response = await fetch(image_data_url);
      const blobData = await response.blob();
      const blobUrl = URL.createObjectURL(blobData);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "ar_capture.jpg"; // Set the filename here
      link.click();
    } catch (error) {}
  };

  return (
    <a-scene
      vr-mode-ui="enabled: false"
      arjs="sourceType: webcam; videoTexture: false; debugUIEnabled: false"
      renderer="antialias: true; alpha: true;"
    >
      <a-camera gps-new-camera="gpsMinDistance: 5"></a-camera>
      <div style={{ position: "relative", height: "90vh", width: "90vw" }}>
        <canvas style={{ display: "none" }} id="paintCanvas"></canvas>

        <button
          style={{
            cursor: "pointer",
            backgroundColor: "#fff",
            color: "#000",
            padding: "15px",
            borderRadius: "10px",
            position: "absolute",
            // bottom: "0",
            zIndex: "1000",
            // marginLeft: "50%",
            top: "80%",
            left: "50%",
            transform: "translate(200%, -50%)",
          }}
          onClick={() => handleCapture()}
        >
          Capture Image
        </button>
      </div>
      {/* <a-entity
      // gltf-model="url(/models/donut.glb)"  
        gltf-model="url(https://cdn.glitch.com/90a30469-f038-4054-be9c-fd1ec94a810d/kitchentest.glb)"
        position="0 1 -2"
        scale="300 300 300"
        gps-new-entity-place="latitude: 23.79923783; longitude: 90.46175523"
      ></a-entity> */}
      <a-image
        position="0 1 -2"
        scale="50 50 50"
        gps-new-entity-place="latitude: 13.0938773; longitude: 77.6421572"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUqn60q2BrKtlW-NQq10Pz6aba7mKE2hBGw1z2eSgoOA&s"
      ></a-image>

      <img style={{ display: "none"}} crossOrigin="anonymous" width={20} height={20} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUqn60q2BrKtlW-NQq10Pz6aba7mKE2hBGw1z2eSgoOA&s" />
    </a-scene>
  );
};

export default Camera;
