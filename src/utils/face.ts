import * as faceapi from 'face-api.js';
export const compareFaceDescriptors = async (descriptor1: number[], descriptor2: number[], threshold = 0.6) => {
    // Calculate the distance between two descriptors
    const distance = faceapi.euclideanDistance(descriptor1, descriptor2);
    return distance <= threshold; // Return true if they are the same person
};