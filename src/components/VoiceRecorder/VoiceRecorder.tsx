import { useVoiceRecorder } from "./hooks/useVoiceRecorder";
import "./VoiceRecorder.css";

interface VoiceRecorderProps {
  onAudioRecorded: (audioBlob: Blob) => void;
}

const VoiceRecorder = ({ onAudioRecorded }: VoiceRecorderProps) => {
  const { isRecording, startRecording, stopRecording } = useVoiceRecorder({
    onAudioRecorded,
  });

  return (
    <button
      className={`voice-recorder-button ${isRecording ? "recording" : ""}`}
      onClick={isRecording ? stopRecording : startRecording}
    >
      {isRecording ? "⏹️" : "🎤"}
    </button>
  );
};

export default VoiceRecorder;
