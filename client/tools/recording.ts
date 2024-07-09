/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { post } from "./post";
import { UploadState } from "./constants";

export const useRecording = (
  setVideoFile: (file: File) => void,
  setState: (state: UploadState) => void,
  setUploadResult: (result: any) => void,
  checkProcessing: (result: any) => void,
  SetIsLoading: (loading: boolean) => void
) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    try {
      streamRef.current = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: { ideal: 854 },
          height: { ideal: 480 },
        },
        audio: true,
      });

      const options = {
        mimeType: "video/webm; codecs=vp8",
        videoBitsPerSecond: 1500000, // bitrate = 1.5 Mbps
      };

      mediaRecorderRef.current = new MediaRecorder(streamRef.current, options);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const file = new File([blob], "recording.webm", { type: "video/webm" });
        setVideoFile(file);
        await uploadVideo(file);
      };

      mediaRecorderRef.current.start();
      setState(UploadState.Recording);
    } catch (err) {
      console.error("Error starting screen recording", err);
      setState(UploadState.Failure);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setState(UploadState.Uploading);
    }
    SetIsLoading(true);

    // Stop all tracks of the stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null; // Clear the ref
    }
  };

  const uploadVideo = async (file: File) => {
    try {
      const formData = new FormData();
      formData.set("video", file);
      const resp = await post("/api/upload", formData);
      console.log("uploadResult:", resp.data);
      setUploadResult(resp.data);
      setState(UploadState.Processing);
      checkProcessing(resp.data);
    } catch (err) {
      console.error("Error Uploading Video", err);
      setState(UploadState.Failure);
    }
  };

  return { startRecording, stopRecording };
};
