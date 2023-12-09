import type { Face, Keypoint } from '@tensorflow-models/face-landmarks-detection';
import { FaceLandmarker, DrawingUtils, type FaceLandmarkerResult } from '@mediapipe/tasks-vision';
import { ScatterGL } from 'scatter-gl';
//
import { TRIANGULATION } from "./Triangulation";

let scatterGL: ScatterGL;

function drawPath(
  ctx: CanvasRenderingContext2D,
  wf: number,
  hf: number,
  points: Keypoint[],
  closePath: boolean,
) {
  const region = new Path2D();
  region.moveTo(points[0].x * wf, points[0].y * hf);
  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    region.lineTo(point.x * wf, point.y * hf);
  }

  if (closePath) {
    region.closePath();
  }
  ctx.stroke(region);
}

export function drawFaceMeshOnCanvas(
  predictions: Face[],
  outputCanvas: HTMLCanvasElement | OffscreenCanvas,
  wf: number,
  hf: number,
  maxFaces = 2,
  triangulateMesh = true,
) {
  if (
    predictions.length > 0 &&
    outputCanvas &&
    outputCanvas instanceof HTMLCanvasElement
  ) {
    const state = {
      // backend: "wasm",
      maxFaces: maxFaces,
      triangulateMesh: triangulateMesh,
      renderPointcloud: undefined as boolean | undefined,
    };

    const ctx = outputCanvas.getContext("2d");
    if (ctx === null) return;

    let scatterGLHasInitialized = false;

    for (let index = 0; index < predictions.length; index++) {
      const prediction = predictions[index];
      const keypoints = prediction.keypoints;

      if (state.triangulateMesh) {
        for (let i = 0; i < TRIANGULATION.length / 3; i++) {
          const points = [
            TRIANGULATION[i * 3],
            TRIANGULATION[i * 3 + 1],
            TRIANGULATION[i * 3 + 2],
          ].map((index) => keypoints[index]);

          drawPath(ctx, wf, hf, points, true);
        }
      } else {
        for (let i = 0; i < keypoints.length; i++) {
          const x = keypoints[i].x;
          const y = keypoints[i].y;

          ctx.beginPath();
          ctx.arc(x, y, 1 /* radius */, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    }

    if (state.renderPointcloud && scatterGL != null) {
      const pointsData = predictions.map((prediction) => {
        const scaledMesh = prediction.keypoints;
        return scaledMesh.map(point => [-point.x, -point.y, -(point?.z || 0)]) as [number, number, number][];
      });

      let flattenedPointsData: [number, number, number][] = [];
      for (let i = 0; i < pointsData.length; i++) {
        flattenedPointsData = flattenedPointsData.concat(pointsData[i]);
      }
      const dataset = new ScatterGL.Dataset(flattenedPointsData);

      if (!scatterGLHasInitialized) {
        scatterGL.render(dataset);
      } else {
        scatterGL.updateDataset(dataset);
      }
      scatterGLHasInitialized = true;
    }
  }
}

export function drawPmFaceMeshOnCanvas(
  predictions: FaceLandmarkerResult,
  outputCanvas: HTMLCanvasElement | OffscreenCanvas,
  wf: number,
  hf: number,
) {
  const ctx = outputCanvas.getContext("2d");
  if (ctx === null) return;

  const drawingUtils = new DrawingUtils(ctx);
  for (const landmarks of predictions.faceLandmarks) {
    drawingUtils.drawConnectors(
      landmarks,
      FaceLandmarker.FACE_LANDMARKS_TESSELATION,
      { color: "#C0C0C070", lineWidth: 1 }
    );
    drawingUtils.drawConnectors(
      landmarks,
      FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
      { color: "#FF3030" }
    );
    drawingUtils.drawConnectors(
      landmarks,
      FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
      { color: "#FF3030" }
    );
    drawingUtils.drawConnectors(
      landmarks,
      FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
      { color: "#30FF30" }
    );
    drawingUtils.drawConnectors(
      landmarks,
      FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
      { color: "#30FF30" }
    );
    drawingUtils.drawConnectors(
      landmarks,
      FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
      { color: "#E0E0E0" }
    );
    drawingUtils.drawConnectors(
      landmarks,
      FaceLandmarker.FACE_LANDMARKS_LIPS,
      { color: "#E0E0E0" }
    );
    drawingUtils.drawConnectors(
      landmarks,
      FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS,
      { color: "#FF3030" }
    );
    drawingUtils.drawConnectors(
      landmarks,
      FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS,
      { color: "#30FF30" }
    );
  }
}
