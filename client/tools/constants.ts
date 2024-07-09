// constants.ts
export const DEFAULT_PROMPT = `ONLY return the notes and a 3-question multiple choice quiz based on the recording of the screen. `;

export const enum UploadState {
  Waiting = "",
  Recording = "Recording...",
  Uploading = "Uploading...",
  Processing = "Processing...",
  Processed = "Processed!",
  Failure = "Upload failed.",
}
