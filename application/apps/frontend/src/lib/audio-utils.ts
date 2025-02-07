export async function convertWebmToWav(webmBlob: Blob): Promise<Blob> {
    // Convert WebM to WAV format using browser APIs
    const audioContext = new AudioContext();
    const arrayBuffer = await webmBlob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    const wavBuffer = await audioBufferToWav(audioBuffer);
    return new Blob([wavBuffer], { type: 'audio/wav' });
  }
  
  function audioBufferToWav(buffer: AudioBuffer): ArrayBuffer {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
  
    const bytesPerSample = bitDepth / 8;
    const blockAlign = numChannels * bytesPerSample;
    
    const wavHeader = new DataView(new ArrayBuffer(44));
    
    // RIFF header
    writeString(wavHeader, 0, 'RIFF');
    wavHeader.setUint32(4, 36 + buffer.length * blockAlign, true);
    writeString(wavHeader, 8, 'WAVE');
    
    // fmt subchunk
    writeString(wavHeader, 12, 'fmt ');
    wavHeader.setUint32(16, 16, true); // chunk size
    wavHeader.setUint16(20, format, true);
    wavHeader.setUint16(22, numChannels, true);
    wavHeader.setUint32(24, sampleRate, true);
    wavHeader.setUint32(28, sampleRate * blockAlign, true);
    wavHeader.setUint16(32, blockAlign, true);
    wavHeader.setUint16(34, bitDepth, true);
    
    // data subchunk
    writeString(wavHeader, 36, 'data');
    wavHeader.setUint32(40, buffer.length * blockAlign, true);
  
    // Merge header and PCM data
    const pcmData = new Float32Array(buffer.length * numChannels);
    for (let ch = 0; ch < numChannels; ch++) {
      pcmData.set(buffer.getChannelData(ch), ch * buffer.length);
    }
    
    const wavBuffer = new Uint8Array(wavHeader.byteLength + pcmData.byteLength);
    wavBuffer.set(new Uint8Array(wavHeader.buffer), 0);
    wavBuffer.set(new Uint8Array(pcmData.buffer), wavHeader.byteLength);
    
    return wavBuffer.buffer;
  }
  
  function writeString(view: DataView, offset: number, str: string) {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  }